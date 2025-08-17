
import type { Pokemon } from '../types';
import { useTheme } from '../context/ThemeContexts';
import { useTranslations } from 'next-intl';
import { usePokemonStore } from '../store/usePokemonStore';

import Image from 'next/image';

type Props = {
  pokemon: Pokemon;
};

export function Card({ pokemon }: Props) {
  const { theme } = useTheme();
  const t = useTranslations("Card")

  const pokemonList = usePokemonStore((state) => state.pokemonList);
  const addPokemon = usePokemonStore((state) => state.addPokemon);
  const removePokemon = usePokemonStore((state) => state.removePokemon);

  const isSelected = pokemonList.some((p) => p.id === pokemon.id);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    if (e.target.checked) {
      addPokemon(pokemon);
    } else {
      removePokemon(pokemon.id);
    }
  }

  return (
    <div
      data-testid="pokemon-card"
      className={`rounded p-4 text-center shadow transition-colors duration-300 
        ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
    >
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={96}
        height={96}
        priority
        className="mx-auto"
      />
      <h3 className="text-lg font-bold mt-2 capitalize">{pokemon.name}</h3>
      <p>{t('base_exp')} {pokemon.base_experience}</p>
      <div className="flex items-center justify-center gap-2">
        <label htmlFor="">{t('choose')}</label>
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={isSelected}
        />
      </div>
    </div>
  );
}
