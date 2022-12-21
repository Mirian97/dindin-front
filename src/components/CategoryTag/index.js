import blackCloseIcon from "../../assets/black-close-icon.svg";
import whiteCloseIcon from "../../assets/white-close-icon.svg";
import "./style.css";

function CategoryTag({ category, active, handleChangeColorCategoryTag }) {
    return (
        <div
            className={`category ${active && "active"} flex-row align-center justify-between`}
            onClick={() => handleChangeColorCategoryTag(category.id)}
        >
            <span className="description-category">
                {category.descricao}
            </span>
            <img
                className={`select-category ${active && "deselect"}`}
                src={active ? whiteCloseIcon : blackCloseIcon}
                alt={active ? "Ícone de desselecionar" : "Ícone de selecionar"}
            />
        </div>
    )
}

export default CategoryTag;