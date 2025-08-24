import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  picture: string;
  country: string;
};

type State = {
  users: User[];
};

type Action = {
  addUser: (user: User) => void;
};

export const useFormStore = create<State & Action>((set) => ({
  users: [],
  addUser: (user: User) => {
    set((state) => ({
      users: [...state.users, user],
    }));
  },
}));
