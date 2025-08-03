import { render, screen } from '@testing-library/react';
import * as api from '../api';
import { describe, it, vi, beforeEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../router/routes';
import { mockPokemonData } from '../api';

vi.mock('../api.ts');


describe('App Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });
  const mockFetchPokemonList = api.fetchPokemonList as unknown as ReturnType<
    typeof vi.fn
  >;
  const mockFetchPokemonByName =
    api.fetchPokemonByName as unknown as ReturnType<typeof vi.fn>;

  it('renders initial UI correctly', async () => {
    mockFetchPokemonList.mockResolvedValueOnce({
      results: [{ name: 'bulbasaur', url: '...' }],
    });
    mockFetchPokemonByName.mockResolvedValueOnce(mockPokemonData);

    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);
    screen.debug();
  });
});
