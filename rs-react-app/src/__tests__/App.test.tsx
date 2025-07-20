import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import * as api from '../api';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Pokemon } from '../types';

vi.mock('../api.ts');

const mockPokemon: Pokemon = {
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

    it('renders initial UI correctly', () => {
        mockFetchPokemonList.mockResolvedValueOnce({
            results: [{ name: 'bulbasaur', url: '...' }],
        });
        mockFetchPokemonByName.mockResolvedValueOnce(mockPokemon);
        render(<App />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('search-input')).toBeInTheDocument();
        waitFor(() => {
            expect(screen.getByTestId('card-list')).toHaveTextContent('Search term:');
        })
    });
});
