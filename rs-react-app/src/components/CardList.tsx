import React from 'react';
import { Card } from './Card';
import type { Pokemon } from '../types';
import { fetchPokemonByName, fetchPokemonList } from '../api';

const LIMIT = 10;

type Props = {
  search: string;
};

type State = {
  loading: boolean;
  error: string | null;
  pokemons: Pokemon[];
  offset: number;
};

export class CardList extends React.Component<Props, State> {
  state: State = {
    loading: false,
    error: null,
    pokemons: [],
    offset: 0,
  };

  componentDidMount(): void {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    if (
      prevProps.search !== this.props.search ||
      prevState.offset !== this.state.offset
    ) {
      this.loadData();
    }
  }

  loadData = async () => {
    this.setState({ loading: true, error: null });

    try {
      if (this.props.search) {
        const pokemon = await fetchPokemonByName(this.props.search);
        this.setState({ pokemons: [pokemon], loading: false });
      } else {
        const list = await fetchPokemonList(LIMIT, this.state.offset);
        const pokemons = await Promise.all(
          list.results.map((p) => fetchPokemonByName(p.name))
        );
        this.setState({ pokemons, loading: false });
      }
    } catch (err: unknown) {
      if (err instanceof Error) this.setState({ error: err.message, loading: false });
    }
  };

  next = () => this.setState((prev) => ({ offset: prev.offset + LIMIT }));
  prev = () =>
    this.setState((prev) => ({ offset: Math.max(prev.offset - LIMIT, 0) }));

  render() {
    const { loading, error, pokemons, offset } = this.state;

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error)
      return <div className="text-red-500 text-center p-4">Error: {error}</div>;

    return (
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pokemons.map((p) => (
            <Card key={p.name} pokemon={p} />
          ))}
        </div>
        {!this.props.search && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={this.prev}
              className="px-4 py-2 bg-gray-400 rounded"
            >
              Prev
            </button>
            <span>Offset: {offset}</span>
            <button
              onClick={this.next}
              className="px-4 py-2 bg-gray-400 rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}
