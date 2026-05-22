import { useState, useEffect } from "react";
import { getFilteredPaintings } from "./utils/filters";
import { apiBackupData } from "./utils/backupData";

import Card from './components/cards/card';
import Header from './components/header/header';
import Button from './components/button-theme/button';
import FiltersWindow from './components/filtersWindow/filtersWindow';
import Pagination from './components/pagination/pagination';

import './App.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paintings, setPaintings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    artists: [],
    locations: [],
    yearRange: { from: "", to: "" }
  });

  // 🔥 ПАГИНАЦИЯ
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('/paintings.json')
      .then(res => res.json())
      .then(data => {
        setPaintings(data);
        setIsLoading(false);
      })
      .catch(() => {
        setPaintings(apiBackupData);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  // 🔍 фильтрация
  const filteredPaintings = getFilteredPaintings(
    paintings,
    searchQuery,
    filters
  );

  // 🔥 логика страниц
  const totalPages = Math.ceil(filteredPaintings.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentPaintings = filteredPaintings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <div className="Golova">
        <Button onClick={toggleTheme} theme={theme} />
      </div>

      <Header
        theme={theme}
        onSearch={setSearchQuery}
        onOpenFilters={() => setIsFiltersOpen(true)}
      />

      <FiltersWindow
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        filters={filters}
        setFilters={setFilters}
        paintings={paintings}
      />

      <div className="slider-wrapper">
        {isLoading && <div className="loading">Loading masterpieces...</div>}

        {!isLoading && currentPaintings.length > 0 && (
          <div className="slider-container">
            {currentPaintings.map((item) => (
              <Card
                key={item.title}
                title={item.title}
                year={item.year}
                url={item.imageUrl}
                artist={item.artist}
                location={item.location}
              />
            ))}
          </div>
        )}

        {!isLoading && currentPaintings.length === 0 && (
          <div className="no-matches">
            <h2>No matches for {searchQuery || "selected filters"}</h2>
            <p>Please try again with a different spelling or keywords.</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default App;