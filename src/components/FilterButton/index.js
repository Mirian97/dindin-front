import filterIcon from "../../assets/filter-icon.svg";

function FilterButton({
    openFilterCategories,
    setOpenFilterCategories
}) {
    return (
        <button
            className="btn-filter btn-filter__main flex-row align-center font-lato"
            onClick={() => setOpenFilterCategories(!openFilterCategories)}
        >
            <img src={filterIcon} alt="Ícone de filtro" />
            Filtrar
        </button>
    )
}

export default FilterButton;