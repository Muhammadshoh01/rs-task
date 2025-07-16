import React from 'react';

type Props = {
  initialValue: string;
  onSearch: (term: string) => void;
};

type State = {
  input: string;
};

export class SearchBar extends React.Component<Props, State> {
  state: State = {
    input: this.props.initialValue,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleSearch = () => {
    const term = this.state.input.trim();
    localStorage.setItem('searchTerm', term);
    this.props.onSearch(term);
  };

  render() {
    return (
      <div className="flex justify-center gap-2 p-4">
        <input
          className="border px-4 py-2 rounded"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Search Pokémon by name"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}
