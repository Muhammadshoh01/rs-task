import type { Pokemon, PokemonListResponse } from './types';

export async function fetchPokemonList(
  limit: number,
  offset: number
): Promise<PokemonListResponse> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!res.ok) throw new Error(`List fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );
  if (!res.ok) throw new Error(`Pokemon not found: ${res.status}`);
  return res.json();
}
