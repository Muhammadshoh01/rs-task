import { useContext } from 'react';
import type { Pokemon } from '../types';
import { ThemeContext } from '../context/ThemContexts';

type Props = {
  pokemon: Pokemon;
};

export function Card({ pokemon }: Props) {
  const theme = useContext(ThemeContext);

  return (
    <div
      data-testid="pokemon-card"
      className={`rounded p-4 text-center shadow transition-colors duration-300 
        ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto"
      />
      <h3 className="text-lg font-bold mt-2 capitalize">{pokemon.name}</h3>
      <p>Base EXP: {pokemon.base_experience}</p>
    </div>
  );
}
