import './search.css';

function Search({ onSearch }) {
    return (
        <div className="search">
            <input 
                className='searcH' 
                type='search' 
                placeholder='Painting title'
                onChange={(e) => onSearch(e.target.value)} 
            />
        </div>
    );
};

export default Search;