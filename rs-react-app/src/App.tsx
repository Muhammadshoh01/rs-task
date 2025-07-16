import React from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CardList } from './components/CardList';
import { ErrorBoundary } from './components/ErrorBoundary';

type State = {
  searchTerm: string;
};
type Props = Record<string, never>;

export default class App extends React.Component<Props, State> {
  state: State = {
    searchTerm: localStorage.getItem("searchTerm") || '',
  };

  setSearchTerm = (term: string) => {
    this.setState({ searchTerm: term });
  };

  throwError = () => {
    throw new Error('Manual error trigger');
  };

  render() {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <SearchBar
            initialValue={this.state.searchTerm}
            onSearch={this.setSearchTerm}
          />
          <div className="text-center my-2">
            <button
              onClick={this.throwError}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Throw Error
            </button>
          </div>
          <CardList search={this.state.searchTerm} />
        </div>
      </ErrorBoundary>
    );
  }
}
