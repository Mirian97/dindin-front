import "./style.css";

function PopUp({ openPopUp, setOpenPopUp, handleDeleteTransaction }) {
    return (
        <>
            {openPopUp &&
                <div className="card-pop-up flex-column align-center justify-center">
                    <h6>Apagar item?</h6>
                    <div className="card-pop-up__buttons flex-row">
                        <button
                            className="btn-confirm"
                            onClick={handleDeleteTransaction}
                        >
                            Sim
                        </button>
                        <button
                            className="btn-not-confirm"
                            onClick={() => setOpenPopUp(false)}
                        >
                            Não
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default PopUp;