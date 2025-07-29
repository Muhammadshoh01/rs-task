import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonDetails } from '../../components/PokemonDetails';

const mockPokemonData = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  sprites: {
    front_default: 'https://example.com/pikachu.png',
  },
  abilities: [
    {
      ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' },
    },
    {
      ability: {
        name: 'lightning-rod',
        url: 'https://pokeapi.co/api/v2/ability/31/',
      },
    },
  ],
};

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PokemonDetails', () => {
  it('shows loading initially', () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockPokemonData),
    } as Response;

    mockFetch.mockResolvedValueOnce(mockResponse);

    render(<PokemonDetails id="pikachu" onClose={() => {}} />);
    expect(screen.getByText(/loading details/i)).toBeInTheDocument();
  });

  it('renders pokemon details on success', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockPokemonData),
    } as Response;

    mockFetch.mockResolvedValueOnce(mockResponse);

    render(<PokemonDetails id="pikachu" onClose={() => {}} />);

    await screen.findByText(/pikachu/i);

    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 60/i)).toBeInTheDocument();
    expect(screen.getByText(/base experience: 112/i)).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.getByText('lightning-rod')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/pikachu.png'
    );
  });

  it('shows error message if pokemon not found', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: 'Not found' }),
    } as Response;

    mockFetch.mockResolvedValueOnce(mockResponse);

    render(<PokemonDetails id="unknown" onClose={() => {}} />);
    await screen.findByText(/pokémon not found/i);
  });

  it('calls onClose when close button is clicked', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockPokemonData),
    } as Response;

    mockFetch.mockResolvedValueOnce(mockResponse);

    const onClose = vi.fn();

    render(<PokemonDetails id="pikachu" onClose={onClose} />);

    await screen.findByText(/pikachu/i);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
