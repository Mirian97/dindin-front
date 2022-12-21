import { useEffect, useState } from "react";
import AddEditRecordModal from "../../components/AddEditRecordModal";
import EditProfileModal from "../../components/EditProfileModal";
import FilterButton from "../../components/FilterButton";
import FilterCategories from "../../components/FilterCategories";
import Header from "../../components/Header";
import RecordResumeBox from "../../components/RecordResumeBox";
import TransactionTable from "../../components/TransactionTable";
import api from "../../services/api";
import { messageError, messageSucess } from "../../utils/messages";
import { getItem } from "../../utils/storage";
import "./style.css";

function Main() {
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
    const [openFilterCategories, setOpenFilterCategories] = useState(false);
    const [openAddEditModal, setOpenAddEditModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [currentTransaction, setCurrentTransaction] = useState({})
    const [active, setActive] = useState("entrada")
    const [orderAsc, setOrderAsc] = useState(false);
    const [profileForm, setProfileForm] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const [balance, setBalance] = useState({
        credit: 0,
        debit: 0
    })
    const [recordForm, setRecordForm] = useState({
        title: "",
        type: "",
        value: "",
        categoryId: "",
        date: "",
        description: ""
    })

    async function loadUserProfile() {
        try {
            const { data } = await api.get("/usuario", {
                headers: {
                    authorization: `Bearer ${getItem('token')}`,
                },
            });
            setProfileForm({
                ...profileForm,
                name: data.nome,
                email: data.email
            });
        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }

    async function loadCategories() {
        try {
            const { data } = await api.get("/categoria", {
                headers: {
                    authorization: `Bearer ${getItem('token')}`,
                },
            });
            const categoriesWithActive = data.map(category => {
                return {
                    ...category,
                    active: false
                }
            })
            setCategories([...categoriesWithActive]);
        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }

    async function loadTransactions() {
        try {
            const { data } = await api.get("/transacao", {
                headers: {
                    authorization: `Bearer ${getItem('token')}`,
                },
            });
            setTransactions([...data]);
            loadRecordResume();
        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }

    async function handleDeleteTransaction() {
        try {
            await api.delete(`/transacao/${currentTransaction.id}`, {
                headers: {
                    authorization: `Bearer ${getItem('token')}`,
                },
            });
            messageSucess("Registro excluído com sucesso");
            loadTransactions();
        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }

    async function handleAddTransaction() {
        try {
            await api.post("/transacao", {
                tipo: active,
                valor: recordForm.value * 100,
                categoria_id: recordForm.categoryId,
                data: recordForm.date,
                descricao: recordForm.description
            }, {
                headers: {
                    authorization: `Bearer ${getItem('token')}`,
                },
            });
            messageSucess("Registro adicionado com sucesso!");
            loadTransactions();
        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }

    async function handleEditTransaction(transactionId) {
        try {
            await api.put(`/transacao/${transactionId}`, {
                tipo: active,
                valor: recordForm.value * 100,
                categoria_id: recordForm.categoryId,
                data: recordForm.date,
                descricao: recordForm.description
            }, {
                headers: {
                    authorization: `Bearer ${getItem('token')}`,
                },
            });
            messageSucess("Registro editado com sucesso!");
            loadTransactions();
        } catch (error) {
            console.log(error)
            messageError(error.response.data.mensagem);
        }
    }

    function handleOrderTransactionsByDate() {
        const localTransactions = [...transactions];
        if (orderAsc) {
            localTransactions.sort((a, b) => new Date(a.data) - new Date(b.data));
            setOrderAsc(false);
        } else {
            localTransactions.sort((a, b) => new Date(b.data) - new Date(a.data));
            setOrderAsc(true);
        }
        setTransactions(localTransactions);
    }

    async function loadRecordResume() {
        try {
            const { data } = await api.get('/transacao/extrato', {
                headers: {
                    authorization: `Bearer ${getItem('token')}`,
                },
            });
            setBalance({
                credit: data.entrada,
                debit: data.saida
            })
        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }

    useEffect(() => {
        loadTransactions();
        loadUserProfile();
        loadCategories();
        loadRecordResume();
    }, [])

    return (
        <>
            <div className="container-main">
                <Header
                    logged
                    setOpenEditProfileModal={setOpenEditProfileModal}
                />
                <div className="content-main flex-row justify-center">
                    <div className="content-main__filters-registers flex-column">
                        <FilterButton
                            openFilterCategories={openFilterCategories}
                            setOpenFilterCategories={setOpenFilterCategories}
                        />
                        <FilterCategories
                            openFilterCategories={openFilterCategories}
                            setOpenFilterCategories={setOpenFilterCategories}
                            categories={categories}
                            setCategories={setCategories}
                            setTransactions={setTransactions}
                            loadTransactions={loadTransactions}
                            setBalance={setBalance}
                        />
                        <TransactionTable
                            transactions={transactions}
                            setOpenAddEditModal={setOpenAddEditModal}
                            currentTransaction={currentTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                            handleDeleteTransaction={handleDeleteTransaction}
                            setRecordForm={setRecordForm}
                            active={active}
                            setActive={setActive}
                            handleOrderTransactionsByDate={handleOrderTransactionsByDate}
                            orderAsc={orderAsc}
                        />
                    </div>
                    <RecordResumeBox
                        setOpenAddEditModal={setOpenAddEditModal}
                        setRecordForm={setRecordForm}
                        balance={balance}
                    />
                </div>
            </div>
            <EditProfileModal
                openEditProfileModal={openEditProfileModal}
                setOpenEditProfileModal={setOpenEditProfileModal}
                profileForm={profileForm}
                setProfileForm={setProfileForm}
            />
            <AddEditRecordModal
                openAddEditModal={openAddEditModal}
                setOpenAddEditModal={setOpenAddEditModal}
                categories={categories}
                recordForm={recordForm}
                setRecordForm={setRecordForm}
                active={active}
                setActive={setActive}
                handleAddTransaction={handleAddTransaction}
                handleEditTransaction={handleEditTransaction}
                currentTransaction={currentTransaction}
            />
        </>
    )
}

export default Main;