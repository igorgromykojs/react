import React, { Component } from 'react';
import './index.css';
import SearchPanel from './components/SearchPanel';
import PlanetList from './components/PlanetList';
import ErrorMessage from './components/ErrorMessage';

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
      errorMessage: '',
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
      this.handleSearch(savedSearchTerm);
    } else {
      this.fetchData();
    }
  }

  throwError = () => {
    throw new Error('This is a sample error');
  };

  handleSearch = async (term: string) => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `https://swapi.dev/api/planets/?search=${term}`
      );
      const data = await response.json();
      this.setState({
        searchResults: data.results,
        isLoading: false,
        errorMessage: '',
      });
      localStorage.setItem('searchTerm', term);
    } catch (error) {
      this.setState({
        errorMessage: `Error fetching data: ${error}`,
        isLoading: false,
      });
    }
  };

  fetchData = async () => {
    this.setState({ isLoading: true });
    try {
      const response = await fetch(`https://swapi.dev/api/planets/`);
      const data = await response.json();
      this.setState({ searchResults: data.results, isLoading: false });
    } catch (error) {
      this.setState({
        errorMessage: `Error fetching data: ${error}`,
        isLoading: false,
      });
    }
  };

  render() {
    const { searchTerm, searchResults, isLoading, errorMessage } = this.state;

    return (
      <div className="wrapper">
        <SearchPanel
          searchTerm={searchTerm}
          onSearchChange={(value) => this.setState({ searchTerm: value })}
          onSearchClick={() => this.handleSearch(searchTerm)}
        />
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <PlanetList searchResults={searchResults} />
          )}
        </div>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <button type="button" onClick={this.throwError}>
          Throw Error
        </button>
      </div>
    );
  }
}

export default App;
