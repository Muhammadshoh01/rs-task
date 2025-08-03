export type Person = {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
};

export type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: Ability[];
  sprites: {
    front_default: string;
  };
  base_experience: number;
};

interface Ability {
  ability: { url: string; name: string };
}

export type PokemonListResponse = {
  results: { name: string; url: string }[];
  next: string | null;
  previous: string | null;
};
