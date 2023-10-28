import React, { useState, useEffect, ReactElement } from 'react';

interface Planet {
  name: string;
  climate: string;
  population: string;
}

function App(): ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error) {
      console.error('Error fetching data:', error);
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
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Получить сохраненный поисковый запрос из localStorage
    const savedSearchTerm = localStorage.getItem('searchTerm');

    // Если сохраненный поисковый запрос существует, установить его в searchTerm и выполнить поиск
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      handleSearch(savedSearchTerm);
    } else {
      // Если сохраненного поискового запроса нет, загрузить все планеты
      fetchData();
    }
  }, []); // Пустой массив зависимостей гарантирует выполнение useEffect только при монтировании компонента

  return (
    <div>
      <div>
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
    </div>
  );
}

export default App;
