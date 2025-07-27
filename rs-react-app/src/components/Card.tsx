import type { Pokemon } from '../types';

type Props = {
  pokemon: Pokemon;
};

export function Card({ pokemon }: Props) {
  return (
    <div data-testid="pokemon-card" className="bg-white shadow rounded p-4 text-center">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto" />
      <h3 className="text-lg font-bold mt-2">{pokemon.name}</h3>
      <p>Base EXP: {pokemon.base_experience}</p>
    </div>
  );
}