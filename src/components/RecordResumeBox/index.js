import { handleFormatPrice } from "../../utils/functions";
import "./style.css";

function RecordResumeBox({
    setOpenAddEditModal,
    setRecordForm,
    balance
}) {
    function handleOpenAddRecordModal() {
        setRecordForm({
            title: "Adicionar Registro",
            type: "",
            value: "",
            categoryId: "",
            date: "",
            description: ""
        })
        setOpenAddEditModal(true);
    }

    return (
        <aside className="flex-column">
            <div className="box-resume">
                <h3 className="box-resume__title">Resumo</h3>
                <div className="credit-debit flex-column">
                    <div className="flex-row align-center justify-between">
                        <p className="">Entradas</p>
                        <p className="color-purple-tertiary">
                            {handleFormatPrice(balance.credit)}
                        </p>
                    </div>
                    <div className="flex-row align-center justify-between">
                        <p className="">Saídas</p>
                        <p className="color-orange">
                            {handleFormatPrice(balance.debit)}
                        </p>
                    </div>
                </div>
                <div className="balance flex-row align-center justify-between">
                    <h3>Saldo</h3>
                    <p className="balance-value color-blue">
                        {handleFormatPrice(balance.credit - balance.debit)}
                    </p>
                </div>
            </div>
            <button
                className="btn-add-record btn-primary-purple btn-hover"
                onClick={() => handleOpenAddRecordModal()}
            >
                Adicionar Registro
            </button>
        </aside>
    )
}

export default RecordResumeBox;