import React from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CardList } from './components/CardList';

type State = {
  searchTerm: string;
  shouldThrow: boolean;
};
type Props = Record<string, never>;
const res: any = '';

export default class App extends React.Component<Props, State> {
  state: State = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    shouldThrow: false,
  };

  setSearchTerm = (term: string) => {
    this.setState({ searchTerm: term });
  };

  throwError = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Manually thrown error in render');
    }
    return (
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
            Throw Error.
          </button>
        </div>
        <CardList search={this.state.searchTerm} />
      </div>
    );
  }
}
