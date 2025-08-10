import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as api from '../api';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { mockPokemonData } from '../api';
import type { PokemonListResponse } from '../types';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import About from '../components/About';
import Layout from '../components/Layout';
import ErrorPage from '../components/404';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
vi.mock('../api.ts');

describe('App Component', () => {
  const mockFetchPokemonList = vi.mocked(api.fetchPokemonList);
  const mockFetchPokemonByName = vi.mocked(api.fetchPokemonByName);

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  function renderApp() {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  }

  it('covers UI interactions', async () => {
    mockFetchPokemonList.mockResolvedValueOnce({
      results: [{ name: 'bulbasaur', url: '...' }],
    } as unknown as PokemonListResponse);
    mockFetchPokemonByName.mockResolvedValueOnce(mockPokemonData);

    renderApp();

    await waitFor(() => {
      expect(mockFetchPokemonList).toHaveBeenCalled();
    });

    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }));

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    fireEvent.click(screen.getByText(/pikachu/i));

    expect(() =>
      fireEvent.click(screen.getByRole('button', { name: /throw error/i }))
    ).toThrow();
  });
});
