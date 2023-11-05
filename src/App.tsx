import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchPanel from './components/SearchPanel';
import PlanetList from './components/PlanetList';
import ErrorMessage from './components/ErrorMessage';
import Pagination from './components/Pagination';
import './index.css';

interface Planet {
  name: string;
  climate: string;
  population: string;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    const queryParams = new URLSearchParams(location.search);
    const pageParam = Number(queryParams.get('page')) || 1;

    setSearchTerm(savedSearchTerm || '');
    setCurrentPage(pageParam);
  }, [location.search]);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Обновите данные при изменении currentPage

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/planets/?search=${term}&page=${currentPage}`
      );
      const data = await response.json();
      setSearchResults(data.results);
      setTotalPages(Math.ceil(data.count / 10));
      setIsLoading(false);
      setErrorMessage('');
      localStorage.setItem('searchTerm', term);
    } catch (error) {
      setErrorMessage(`Error fetching data: ${error}`);
      setIsLoading(false);
    }
  };

  const fetchData = () => {
    handleSearch(searchTerm);
    navigate(`/?page=${currentPage}`, { replace: true });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="wrapper">
      <SearchPanel
        searchTerm={searchTerm}
        onSearchChange={(value) => setSearchTerm(value)}
        onSearchClick={() => {
          setCurrentPage(1);
          handleSearch(searchTerm);
        }}
      />
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <PlanetList searchResults={searchResults} />
        )}
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <button type="button" onClick={() => {}}>
        Throw Error
      </button>
    </div>
  );
};

export default App;
