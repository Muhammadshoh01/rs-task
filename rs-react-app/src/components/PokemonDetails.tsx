import { useContext } from 'react';
import { ThemeContext } from '../context/ThemContexts';
import type { Pokemon } from '../types';
import { useQuery } from '@tanstack/react-query';

async function fetchPokemonByName(name: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );
  if (!res.ok) throw new Error(`Pokemon not found: ${res.status}`);
  return res.json();
}

export function PokemonDetails({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const theme = useContext(ThemeContext);

  const {
    isPending,
    isError,
    data: pokemon,
    error,
  } = useQuery<Pokemon>({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonByName(id),
  });

  if (isPending) return <div>Loading details...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!isPending && !pokemon) return <div>Pokémon not found.</div>;

  return (
    <div
      className={`p-4 rounded shadow ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{pokemon.name}</h2>
        <button onClick={onClose} className="text-sm text-red-500 underline">
          Close
        </button>
      </div>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base experience: {pokemon.base_experience}</p>
      <p>Abilities: </p>
      <ul className="list-disc list-inside">
        {pokemon.abilities.map((a) => (
          <li key={a.ability.url}>{a.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}
