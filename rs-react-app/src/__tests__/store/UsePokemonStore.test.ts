import { describe, it, expect, beforeEach } from 'vitest';
import { usePokemonStore } from '../../store/usePokemonStore';
import { mockPokemonData } from '../../api';

describe('usePokemonStore', () => {
  beforeEach(() => {
    usePokemonStore.setState({ pokemonList: [] });
  });

  it('adds a pokemon', () => {
    usePokemonStore.getState().addPokemon(mockPokemonData);
    expect(usePokemonStore.getState().pokemonList).toHaveLength(1);
    expect(usePokemonStore.getState().pokemonList[0].name).toBe('pikachu');
  });

  it('removes a pokemon by id', () => {
    usePokemonStore.setState({ pokemonList: [mockPokemonData] });
    usePokemonStore.getState().removePokemon(25);
    expect(usePokemonStore.getState().pokemonList).toHaveLength(0);
  });

  it('removes all pokemon', () => {
    usePokemonStore.setState({ pokemonList: [mockPokemonData] });
    usePokemonStore.getState().removeAllPokemon();
    expect(usePokemonStore.getState().pokemonList).toHaveLength(0);
  });
});
