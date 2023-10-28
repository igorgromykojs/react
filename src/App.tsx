import { useState, useEffect, ReactElement } from 'react';
import './index.css';

interface Planet {
  name: string;
  climate: string;
  population: string;
}

function App(): ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
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
      localStorage.setItem('searchTerm', term);
      setErrorMessage(``);
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

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');

    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      handleSearch(savedSearchTerm);
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="seach-panel">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={() => handleSearch(searchTerm)}>
          Search
        </button>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {searchResults.map((planet) => (
              <li key={planet.name}>
                <strong>Name:</strong> {planet.name} <br />
                <strong>Climate:</strong> {planet.climate} <br />
                <strong>Population:</strong> {planet.population}
              </li>
            ))}
          </ul>
        )}
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button type="button" onClick={throwError}>
        Throw Error
      </button>
    </div>
  );
}

export default App;
