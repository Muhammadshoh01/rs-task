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
  name: string;
  sprites: {
    front_default: string;
  };
  base_experience: number;
};

export type PokemonListResponse = {
  results: { name: string; url: string }[];
  next: string | null;
  previous: string | null;
};
