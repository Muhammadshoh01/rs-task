import { it, expect, describe, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from '../../components/SearchBar';
import userEvent from '@testing-library/user-event';
import { ThemeContext } from '../../context/ThemContexts';

describe('Searchbar', () => {
  function setup(theme: 'light' | 'dark' = 'light') {
    const mockOnSearch = vi.fn();
    render(
      <ThemeContext.Provider value={theme}>
        <SearchBar initialValue="pikachu" onSearch={mockOnSearch} />
      </ThemeContext.Provider>
    );

    return {
      mockOnSearch,
      input: screen.getByRole('textbox'),
      button: screen.getByRole('button'),
    };
  }

  it('should render input(provided in parent) and button', () => {
    const { input, button } = setup();

    expect(input).toHaveValue('pikachu');
    expect(button).toBeInTheDocument();
  });

  it('should call onSearch when button clicked', async () => {
    const { input, button, mockOnSearch } = setup();

    const user = userEvent.setup();

    await user.clear(input);
    await user.type(input, 'newTerm');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('newTerm');
    waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('newTerm');
    });
  });

  it('should render with dark theme', () => {
    const { input, button } = setup('dark');
    expect(input).toHaveClass('text-white bg-gray-700 border-gray-600');
    expect(button).toHaveClass('bg-blue-500 text-white');
  });
});
