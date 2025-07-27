import { render, screen } from '@testing-library/react';
import * as api from '../api';
import { describe, it, vi, beforeEach } from 'vitest';
import type { Pokemon } from '../types';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../router/routes';

vi.mock('../api.ts');

const mockPokemon: Pokemon = {
    id: 45,
    name: 'bulbasaur',
    base_experience: 64,
    sprites: {
        front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
};


describe('App Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        localStorage.clear();
    });
    const mockFetchPokemonList = api.fetchPokemonList as unknown as ReturnType<typeof vi.fn>;
    const mockFetchPokemonByName = api.fetchPokemonByName as unknown as ReturnType<typeof vi.fn>;

    it('renders initial UI correctly', async () => {
        mockFetchPokemonList.mockResolvedValueOnce({
            results: [{ name: 'bulbasaur', url: '...' }],
        });
        mockFetchPokemonByName.mockResolvedValueOnce(mockPokemon);

        const router = createMemoryRouter(routes, { initialEntries: ['/'] });

        render(<RouterProvider router={router} />);
        screen.debug()

    });
});
