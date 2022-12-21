import closeIcon from "../../assets/black-close-icon.svg";
import { messageError } from "../../utils/messages";
import Input from "../Input";
import "./style.css";

function AddEditRecordModal({
    openAddEditModal,
    setOpenAddEditModal,
    categories,
    setRecordForm,
    recordForm,
    active,
    setActive,
    handleAddTransaction,
    handleEditTransaction,
    currentTransaction
}) {
    function handleChangeSelect(e) {
        setRecordForm({ ...recordForm, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!recordForm.value || !recordForm.categoryId || !recordForm.date || !recordForm.description) {
            messageError("Todos os campos precisam estar preenchidos!");
            return;
        }
        if (recordForm.title === "Adicionar Registro") {
            handleAddTransaction();
        } else {
            handleEditTransaction(currentTransaction.id)
        }
        setOpenAddEditModal(false);
    }

    return (
        <>
            {openAddEditModal &&
                <div className="container-modal flex-row align-center justify-center">
                    <form
                        className="record-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex-row align-center justify-between">
                            <h2>{recordForm.title}</h2>
                            <img
                                className="close-icon"
                                src={closeIcon}
                                alt="Fechar Modal"
                                onClick={() => setOpenAddEditModal(false)}
                            />
                        </div>
                        <div className="record-form__buttons flex-row white">
                            <button
                                type="button"
                                className={`${active === "entrada" ? "active-credit" : "disabled"} record-form__btn-credit btn-hover`}
                                onClick={() => setActive("entrada")}
                            >
                                Entrada
                            </button>
                            <button
                                type="button"
                                className={`${active === "saida" ? "active-debit" : "disabled"} record-form__btn-debit btn-hover`}
                                onClick={() => setActive("saida")}
                            >
                                Saída
                            </button>
                        </div>
                        <div className="record-form__inputs inputs-modal flex-column">
                            <Input
                                textLabel="Valor"
                                name="value"
                                type="number"
                                value={recordForm.value}
                                form={recordForm}
                                setForm={setRecordForm}
                            />
                            <div className="select-label flex-column">
                                <label id="category">Categoria</label>
                                <select
                                    htmlFor="category"
                                    name="categoryId"
                                    value={recordForm.categoryId}
                                    onChange={handleChangeSelect}
                                >
                                    <option></option>
                                    {categories.map(category =>
                                        <option key={category.id} value={category.id}>
                                            {category.descricao}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <Input
                                textLabel="Data"
                                name="date"
                                type="date"
                                value={recordForm.date}
                                form={recordForm}
                                setForm={setRecordForm}
                            />
                            <Input
                                textLabel="Descrição"
                                name="description"
                                type="text"
                                value={recordForm.description}
                                form={recordForm}
                                setForm={setRecordForm}
                            />
                        </div>
                        <button className="btn-main-modal btn-primary-purple btn-hover">
                            Confirmar
                        </button>
                    </form>
                </div>
            }
        </>
    )
}

export default AddEditRecordModal;