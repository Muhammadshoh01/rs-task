import { create } from 'zustand';
import type { Pokemon } from '../types';

type State = {
  pokemonList: Pokemon[];
};
type Action = {
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemonId: number) => void;
  removeAllPokemon: () => void;
  downloadInfo: () => void;
};

export const usePokemonStore = create<State & Action>((set, get) => ({
  pokemonList: [],
  addPokemon: (pokemon: Pokemon) => {
    set((state) => ({
      pokemonList: [...state.pokemonList, pokemon],
    }));
  },
  removePokemon: (pokemonId: number) => {
    set((state) => ({
      pokemonList: state.pokemonList.filter(
        (pokemon) => pokemon.id !== pokemonId
      ),
    }));
  },
  removeAllPokemon: () => {
    set(() => ({
      pokemonList: [],
    }));
  },
  downloadInfo: () => {
    const csvHeader = ['Name', 'Height', 'Weight', 'Base EXP', 'Details URL'];

    const { pokemonList } = get();
    const rows = pokemonList.map((p) => {
      const detailsUrl = `https://pokeapi.co/api/v2/pokemon/${p.id}`;
      return [p.name, p.height, p.weight, p.base_experience, detailsUrl];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      csvHeader.join(',') +
      '\r\n' +
      rows.map((r) => r.join(',')).join('\r\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${pokemonList.length}_pokemons.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
}));
