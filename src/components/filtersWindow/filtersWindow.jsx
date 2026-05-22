import { useState } from 'react';
import './filtersWindow.css';

function FiltersWindow({ isOpen, onClose, filters, setFilters, paintings = [] }) {
    const [openSection, setOpenSection] = useState(null);
    const [openSelect, setOpenSelect] = useState(null);

    if (!isOpen) return null;

    // Собираем уникальные значения прямо здесь, безопасно для сборщика
    const allArtists = [...new Set(paintings.map(p => p.artist))].filter(Boolean);
    const allLocations = [...new Set(paintings.map(p => p.location))].filter(Boolean);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
        setOpenSelect(null);
    };

    const handleCheckbox = (type, value) => {
        const current = [...filters[type]];
        const index = current.indexOf(value);
        if (index > -1) current.splice(index, 1);
        else current.push(value);
        setFilters({ ...filters, [type]: current });
    };

    const handleClear = () => {
        setFilters({ artists: [], locations: [], yearRange: { from: "", to: "" } });
        setOpenSection(null);
    };

    return (
        <div className="filters">
            <div className="filters-header">
                <button className="close" onClick={onClose}>✕</button>
            </div>

            <div className="filters-content">
                {/* ARTIST */}
                <div className="filter-group">
                    <div className="group-header" onClick={() => toggleSection('artist')}>
                        <span>ARTIST</span>
                        <span className="plus-minus">{openSection === 'artist' ? '−' : '+'}</span>
                    </div>
                    {openSection === 'artist' && (
                        <div className="custom-select" onClick={() => setOpenSelect(openSelect === 'artist' ? null : 'artist')}>
                            <div className="select-trigger">
                                {filters.artists.length > 0 ? filters.artists.join(', ') : "Select the artist"}
                                <span className="arrow-down">▼</span>
                            </div>
                            {openSelect === 'artist' && (
                                <div className="select-options" onClick={(e) => e.stopPropagation()}>
                                    {allArtists.map(name => (
                                        <label key={name} className="option">
                                            <input
                                                type="checkbox"
                                                checked={filters.artists.includes(name)}
                                                onChange={() => handleCheckbox('artists', name)}
                                            /> {name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* LOCATION */}
                <div className="filter-group">
                    <div className="group-header" onClick={() => toggleSection('location')}>
                        <span>LOCATION</span>
                        <span className="plus-minus">{openSection === 'location' ? '−' : '+'}</span>
                    </div>
                    {openSection === 'location' && (
                        <div className="custom-select" onClick={() => setOpenSelect(openSelect === 'location' ? null : 'location')}>
                            <div className="select-trigger">
                                {filters.locations.length > 0 ? filters.locations.join(', ') : "Select the location"}
                                <span className="arrow-down">▼</span>
                            </div>
                            {openSelect === 'location' && (
                                <div className="select-options" onClick={(e) => e.stopPropagation()}>
                                    {allLocations.map(name => (
                                        <label key={name} className="option">
                                            <input
                                                type="checkbox"
                                                checked={filters.locations.includes(name)}
                                                onChange={() => handleCheckbox('locations', name)}
                                            /> {name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* YEARS */}
                <div className="filter-group">
                    <div className="group-header" onClick={() => toggleSection('year')}>
                        <span>YEARS</span>
                        <span className="plus-minus">{openSection === 'year' ? '−' : '+'}</span>
                    </div>
                    {openSection === 'year' && (
                        <div className="year-row" onClick={(e) => e.stopPropagation()}>
                            <input
                                type="number"
                                placeholder="From"
                                value={filters.yearRange.from}
                                onChange={(e) => setFilters({ ...filters, yearRange: { ...filters.yearRange, from: e.target.value } })}
                            />
                            <span className="dash">—</span>
                            <input
                                type="number"
                                placeholder="To"
                                value={filters.yearRange.to}
                                onChange={(e) => setFilters({ ...filters, yearRange: { ...filters.yearRange, to: e.target.value } })}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="filter-footer">
                <button className="btn-show" onClick={onClose}>SHOW THE RESULTS</button>
                <button className="btn-clear" onClick={handleClear}>CLEAR</button>
            </div>
        </div>
    );
}

export default FiltersWindow;