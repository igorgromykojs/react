import React, { Component } from 'react';
import './index.css';

interface Planet {
  name: string;
  climate: string;
  population: string;
}

interface AppProps {}

interface AppState {
  searchTerm: string;
  searchResults: Planet[];
  isLoading: boolean;
  errorMessage: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: [],
      isLoading: true,
      errorMessage: ''
    };
  }

  throwError = () => {
    throw new Error('This is a sample error');
  };

  handleSearch = async (term: string) => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(`https://swapi.dev/api/planets/?search=${term}`);
      const data = await response.json();
      this.setState({ searchResults: data.results, isLoading: false, errorMessage: '' });
      localStorage.setItem('searchTerm', term);
    } catch (error) {
      this.setState({ errorMessage: `Error fetching data: ${error}`, isLoading: false });
    }
  };

  fetchData = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(`https://swapi.dev/api/planets/`);
      const data = await response.json();
      this.setState({ searchResults: data.results, isLoading: false });
    } catch (error) {
      this.setState({ errorMessage: `Error fetching data: ${error}`, isLoading: false });
    }
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.handleSearch(savedSearchTerm);
    } else {
      this.fetchData();
    }
  }

  render() {
    const { searchTerm, searchResults, isLoading, errorMessage } = this.state;

    return (
      <div className="wrapper">
        <div className="search-panel">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
          />
          <button type="button" onClick={() => this.handleSearch(searchTerm)}>
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
        <button type="button" onClick={this.throwError}>
          Throw Error
        </button>
      </div>
    );
  }
}

export default App;
