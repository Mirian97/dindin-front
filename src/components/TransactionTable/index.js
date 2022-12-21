import { useState } from "react";
import arrowDown from "../../assets/arrow-down.svg";
import arrowUp from "../../assets/arrow-up.svg";
import editIcon from "../../assets/edit-icon.svg";
import trashIcon from "../../assets/trash-icon.svg";
import { getDate, getWeekDay, handleFormatPrice } from "../../utils/functions";
import PopUp from "../PopUp";
import "./style.css";

function TransactionTable({
    transactions,
    setOpenAddEditModal,
    currentTransaction,
    setCurrentTransaction,
    handleDeleteTransaction,
    setRecordForm,
    active,
    setActive,
    handleOrderTransactionsByDate,
    orderAsc
}) {
    const [openPopUp, setOpenPopUp] = useState(false);

    function handleDetailTransaction(transaction) {
        setCurrentTransaction(transaction);
        setOpenPopUp(true);
    }

    function handleOpenEditRecordModal(transaction) {
        setActive(transaction.tipo);
        setRecordForm({
            title: "Editar Registro",
            type: active,
            value: transaction.valor / 100,
            categoryId: transaction.categoria_id,
            date: transaction.data.slice(0, 10),
            description: transaction.descricao
        })
        setCurrentTransaction({ ...transaction })
        setOpenAddEditModal(true);
    }

    return (
        <table className="transaction-table font-lato">
            <thead>
                <tr className="transaction-table__header">
                    <th
                        className="transaction-table__date"
                        onClick={handleOrderTransactionsByDate}
                    >
                        Data
                        <img
                            src={orderAsc ? arrowUp : arrowDown}
                            alt="seta para cima"
                        />
                    </th>
                    <th>Dia da Semana</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction =>
                    <tr key={transaction.id} className="transaction-table__row">
                        <td className="transaction-table__date">{getDate(transaction.data)}</td>
                        <td>{getWeekDay(transaction.data)}</td>
                        <td>{transaction.descricao}</td>
                        <td>{transaction.categoria_nome}</td>
                        <td className={`${transaction.tipo === "entrada" ? "color-purple-secondary" : "color-orange"} transaction-table__value`}>
                            {handleFormatPrice(transaction.valor)}
                        </td>
                        <td className="transaction-table__add-edit flex-row align-center justify-center">
                            <img
                                src={editIcon}
                                alt="Ícone de edição"
                                onClick={() => handleOpenEditRecordModal(transaction)}
                            />
                            <img
                                src={trashIcon}
                                alt="Ícone de lixeira"
                                onClick={() => handleDetailTransaction(transaction)}
                            />
                            <PopUp
                                openPopUp={openPopUp && currentTransaction.id === transaction.id}
                                setOpenPopUp={setOpenPopUp}
                                handleDeleteTransaction={handleDeleteTransaction}
                            />
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default TransactionTable;