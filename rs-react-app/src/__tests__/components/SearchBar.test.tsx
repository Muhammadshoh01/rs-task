import { it, expect, describe, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { SearchBar } from '../../components/SearchBar';
import userEvent from '@testing-library/user-event';

describe('Searchbar', () => {
  function setup() {
    const mockOnSearch = vi.fn();
    render(<SearchBar initialValue="pikachu" onSearch={mockOnSearch} />);

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
});
