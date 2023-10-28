import { useState, useEffect, ReactElement } from 'react';

interface Planet {
  name: string;
  climate: string;
  population: string;
}

function App(): ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://swapi.dev/api/planets/?search=${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data.results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
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
