import './filtersButton.css';
import logoLight from "../../assets/objects/filter_icon1.svg"; // Темная иконка
import logoDark from "../../assets/objects/filter_icon.svg";   // Светлая иконка

function FiltersButton({ theme, onClick }) {
    return (
        <div className="filter" onClick={onClick}>
            <img src={theme === "dark" ? logoDark : logoLight} alt="filters" />
        </div>
    );
}

export default FiltersButton;
