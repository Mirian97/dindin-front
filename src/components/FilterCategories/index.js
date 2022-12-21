import { useEffect, useState } from "react";
import api from "../../services/api";
import { messageError } from "../../utils/messages";
import { getItem } from "../../utils/storage";
import CategoryTag from "../CategoryTag";
import "./style.css";

function FilterCategories({
    openFilterCategories,
    setOpenFilterCategories,
    categories,
    setCategories,
    setTransactions,
    loadTransactions,
    setBalance,
}) {
    let localCategories = [...categories];
    const [stateFilters, setStateFilters] = useState("")

    function handleChangeColorCategoryTag(categoryId) {
        const findCategory = localCategories.find(category => category.id === categoryId);
        findCategory.active = !findCategory.active;
        setCategories(localCategories);
    }

    function handleApllyFilters() {
        localCategories = localCategories.filter(category => category.active);
        if (!localCategories.length) {
            loadTransactions();
        }
        const localFilters = handleTransformQuerys([...localCategories]);
        setStateFilters(localFilters);
        setOpenFilterCategories(false);
    }

    function handleTransformQuerys(array) {
        return array.map(item => `filtro[]=${item.descricao}`).join("&");
    }

    function handleClearFilters() {
        localCategories.forEach(category => category.active = false);
        setCategories(localCategories);
        loadTransactions();
        setOpenFilterCategories(false);
    }

    async function loadTransactionsFiltered() {
        try {
            const { data } = await api.get(`/transacao?${stateFilters}`, {
                headers: {
                    authorization: `Bearer ${getItem('token')}`,
                },
            });
            setTransactions([...data]);
            let localBalance = {
                credit: 0,
                debit: 0
            }
            data.forEach(transaction => {
                if (transaction.tipo === "entrada") localBalance.credit += Number(transaction.valor);
                if (transaction.tipo === "saida") localBalance.debit += Number(transaction.valor);
            })
            setBalance(localBalance);
        } catch (error) {
            messageError(error.response.data.mensagem);
        }
    }

    useEffect(() => {
        loadTransactionsFiltered();
    }, [stateFilters])

    return (
        <>
            {openFilterCategories &&
                <div className="container-filter-categories">
                    <h3>Categoria</h3>
                    <div className="categories-list flex-row">
                        {categories.map(category =>
                            <CategoryTag
                                key={category.id}
                                category={category}
                                active={category.active}
                                handleChangeColorCategoryTag={handleChangeColorCategoryTag}
                            />
                        )}
                    </div>
                    <div className="filters flex-row align-center font-lato">
                        <button
                            onClick={handleClearFilters}
                            className="btn-filter btn-clear-filters">
                            Limpar Filtros
                        </button>
                        <button
                            onClick={() => handleApllyFilters()}
                            className="btn-filter btn-aplly-filters btn-hover">
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default FilterCategories;