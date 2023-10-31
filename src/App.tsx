import React, { useState, useEffect } from 'react';
import './index.css';
import SearchPanel from './components/SearchPanel';
import PlanetList from './components/PlanetList';
import ErrorMessage from './components/ErrorMessage';

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

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      handleSearch(savedSearchTerm);
    } else {
      fetchData();
    }
  }, []);

  const throwError = () => {
    throw new Error('This is a sample error');
  };

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/planets/?search=${term}`
      );
      const data = await response.json();
      setSearchResults(data.results);
      setIsLoading(false);
      setErrorMessage('');
      localStorage.setItem('searchTerm', term);
    } catch (error) {
      setErrorMessage(`Error fetching data: ${error}`);
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/planets/`);
      const data = await response.json();
      setSearchResults(data.results);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(`Error fetching data: ${error}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <SearchPanel
        searchTerm={searchTerm}
        onSearchChange={(value) => setSearchTerm(value)}
        onSearchClick={() => handleSearch(searchTerm)}
      />
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <PlanetList searchResults={searchResults} />
        )}
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <button type="button" onClick={throwError}>
        Throw Error
      </button>
    </div>
  );
};

export default App;
