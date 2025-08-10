import { Card } from './Card';
import type { Pokemon } from '../types';
import { fetchPokemonByName, fetchPokemonList } from '../api';
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemContexts';
import { usePokemonStore } from '../store/usePokemonStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const LIMIT = 10;

type Props = {
  search: string;
  onCardClick?: (id: number) => void;
};

export function CardList({ search, onCardClick }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const {
    isPending,
    isError,
    data: pokemons,
    error,
  } = useQuery<Pokemon[]>({
    queryKey: ['pokemons', { search, offset }],
    queryFn: async () => {
      if (search) {
        const pokemon = await fetchPokemonByName(search);
        return [pokemon];
      } else {
        const list = await fetchPokemonList(LIMIT, offset);
        const pokemons = await Promise.all(
          list.results.map((p) => fetchPokemonByName(p.name))
        );
        return pokemons;
      }
    },
    staleTime: 60_000,
    gcTime: 10 * 60_000,
    refetchOnWindowFocus: false,
  });
  const queryClient = useQueryClient();

  const theme = useContext(ThemeContext);

  const pokemonList = usePokemonStore((state) => state.pokemonList);
  const removeAllPokemon = usePokemonStore((state) => state.removeAllPokemon);
  const downloadInfo = usePokemonStore((state) => state.downloadInfo);

  function next() {
    setSearchParams({ offset: String(offset + LIMIT), search });
  }
  function prev() {
    setSearchParams({ offset: String(Math.max(offset - LIMIT, 0)), search });
  }
  function handleRefresh() {
    queryClient.invalidateQueries({
      queryKey: ['pokemons', { search, offset }], type: 'active',
      exact: true,
    });
  }

  if (isPending) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center p-4">Error: {error.message}</div>
    );

  return (
    <div
      data-testid="card-list"
      className={`p-4 ${theme === 'light' ? '' : 'bg-gray-900 text-white'}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pokemons.map((p) => (
          <div onClick={() => onCardClick?.(p.id)} key={p.name}>
            <Card pokemon={p} />
          </div>
        ))}
      </div>
      {pokemonList && pokemonList.length > 0 && (
        <div className="flex items-center justify-center gap-3 pt-3">
          <h2>{pokemonList.length} items are selected</h2>
          <button
            onClick={removeAllPokemon}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {' '}
            Unselect all
          </button>
          <button
            onClick={downloadInfo}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Download
          </button>
        </div>
      )}
      <button
        onClick={handleRefresh}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
      >
        Refresh
      </button>
      {!search && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={prev}
            className={`px-4 py-2 rounded 
    ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
          >
            Prev
          </button>

          <span>Offset: {offset}</span>
          <button
            onClick={next}
            className={`px-4 py-2 rounded 
    ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
