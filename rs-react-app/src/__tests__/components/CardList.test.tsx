
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CardList } from '../../components/CardList';
import * as api from '../../api';
import type { Pokemon, PokemonListResponse } from '../../types';
import userEvent from '@testing-library/user-event';

vi.mock('../../api.ts');

const mockPokemon: Pokemon = {
    name: 'bulbasaur',
    base_experience: 64,
    sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
};

describe('CardList', () => {
    const mockFetchPokemonByName = api.fetchPokemonByName as unknown as ReturnType<typeof vi.fn>;
    const mockFetchPokemonList = api.fetchPokemonList as unknown as ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders loading state', async () => {
        mockFetchPokemonList.mockImplementation(() => new Promise(() => { }));

        render(<CardList search="" />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders a single searched Pokémon', async () => {
        mockFetchPokemonByName.mockResolvedValueOnce(mockPokemon);

        render(<CardList search="bulbasaur" />);

        await waitFor(() => {
            expect(screen.getByTestId('pokemon-card')).toBeInTheDocument();
            expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        });

        expect(mockFetchPokemonByName).toHaveBeenCalledWith('bulbasaur');
    });

    it('renders paginated Pokémon list', async () => {
        const mockList: PokemonListResponse = {
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            ],
            next: null,
            previous: null,
        };

        mockFetchPokemonList.mockResolvedValueOnce(mockList);
        mockFetchPokemonByName.mockImplementation((name: string) =>
            Promise.resolve({
                name,
                base_experience: 50,
                sprites: { front_default: `${name}.png` },
            })
        );

        render(<CardList search="" />);

        await waitFor(() => {
            expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
            expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/offset: 0/i)).toBeInTheDocument();
    });

    it('displays error on failed search', async () => {
        mockFetchPokemonByName.mockRejectedValueOnce(new Error('Pokemon not found: 404'));

        render(<CardList search="sukuna" />);

        await waitFor(() => {
            screen.debug()
            expect(screen.getByText(/error: pokemon not found: 404/i)).toBeInTheDocument();
        });
    });

    it('handles pagination button clicks', async () => {
        const mockList: PokemonListResponse = {
            results: [{ name: 'bulbasaur', url: '...' }],
            next: null,
            previous: null,
        };

        mockFetchPokemonList.mockResolvedValue(mockList);
        mockFetchPokemonByName.mockResolvedValue(mockPokemon);

        render(<CardList search="" />);
        await waitFor(() => screen.getByText(/bulbasaur/i));

        const nextBtn = screen.getByText(/next/i);
        const user = userEvent.setup()
        await user.click(nextBtn);

        await waitFor(() => {
            expect(mockFetchPokemonList).toHaveBeenCalledTimes(2);
        });

        expect(screen.getByText(/offset: 10/i)).toBeInTheDocument();

        mockFetchPokemonList.mockResolvedValueOnce({
            results: [{ name: 'bulbasaur', url: '...' }],
            next: 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
            previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10',
        });

        const prevBtn = screen.getByText(/prev/i);
        await user.click(prevBtn);
        await waitFor(() => {
            expect(mockFetchPokemonList).toHaveBeenCalledTimes(3);
        });
        expect(screen.getByText(/offset: 0/i)).toBeInTheDocument();
    });
});
