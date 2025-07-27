import { useEffect, useState } from 'react';
import { Card } from './Card';
import type { Pokemon } from '../types';
import { fetchPokemonByName, fetchPokemonList } from '../api';
import { useSearchParams } from 'react-router-dom';


const LIMIT = 10;

type Props = {
  search: string;
};

export function CardList({ search }: Props) {

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  // const [offset, setOffset] = useState<number>(0)
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        if (search) {
          const pokemon = await fetchPokemonByName(search);
          setPokemons([pokemon])
          setLoading(false)
        } else {
          const list = await fetchPokemonList(LIMIT, offset);
          const pokemons = await Promise.all(
            list.results.map((p) => fetchPokemonByName(p.name))
          );
          setPokemons(pokemons)
          setLoading(false)
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setLoading(false)
          setError(err.message)
        }
      }
    };

    loadData()
  }, [search, offset])

  function next() {
    setSearchParams({ offset: String(offset + LIMIT), search });
  }
  function prev() {
    setSearchParams({ offset: String(Math.max(offset - LIMIT, 0)), search });
  }

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div data-testid="card-list" className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pokemons.map((p) => (
          <Card key={p.name} pokemon={p} />
        ))}
      </div>
      {!search && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={prev}
            className="px-4 py-2 bg-gray-400 rounded"
          >
            Prev
          </button>
          <span>Offset: {offset}</span>
          <button
            onClick={next}
            className="px-4 py-2 bg-gray-400 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}