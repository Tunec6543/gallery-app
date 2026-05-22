import FiltersButton from '../filtersButton/filtersButton';
import Search from '../search/search';
import './header.css';

function Header({ theme, onSearch, onOpenFilters }) {
    return (
        <div className="header">
            <Search onSearch={onSearch} /> 
            {/* Передаем тему и функцию клика сюда */}
            <FiltersButton theme={theme} onClick={onOpenFilters} />
        </div>
    );
}

export default Header;
