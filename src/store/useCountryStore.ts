import { create } from 'zustand';

type Country = {
  name: string;
  code: string;
};

type State = {
  countries: Country[];
};
type Action = {
  setCountries: (countries: Country[]) => void;
};

export const useCountryStore = create<State & Action>((set) => ({
  countries: [],
  setCountries: (countries) => set({ countries }),
}));
