import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import type { PokemonListResponse } from '../types';
import { fetchPokemonByName, fetchPokemonList } from '../api';
import { mockPokemonData } from '../api';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('fetchPokemonByName', () => {
  it('should fetch pokemon by name', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPokemonData),
    } as Response);

    const data = await fetchPokemonByName('pikachu');

    expect(data).toEqual(mockPokemonData);
    expect(data.name).toBe('pikachu');
    expect(data.base_experience).toBe(112);
    expect(data.sprites.front_default).toBeTruthy();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });

  it('should throw an error when pokemon is not found', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: 'Not found' }),
    } as Response);

    await expect(fetchPokemonByName('sukuna')).rejects.toThrow(
      'Pokemon not found: 404'
    );
  });
});

describe('fetchPokemonList', () => {
  it('should fetch pokemon list by given parameters', async () => {
    const mockData: PokemonListResponse = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2' },
      ],
      next: 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
      previous: null,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    const data = await fetchPokemonList(10, 0);

    expect(data).toEqual(mockData);
    expect(data.results).toHaveLength(2);
    expect(data.results[0].name).toBe('bulbasaur');
    expect(data.next).toBeTruthy();
    expect(data.previous).toBeNull();

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should throw error if response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    } as Response);

    await expect(fetchPokemonList(1000000, 10000000)).rejects.toThrow(
      'List fetch failed: 500'
    );
  });
});
