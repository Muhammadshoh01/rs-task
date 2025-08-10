import { it, expect, describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import { Card } from '../../components/Card';
import { mockPokemonData } from '../../api';

describe('Card', () => {
  it('should render pokemon info', () => {
    render(<Card pokemon={mockPokemonData} />);

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      mockPokemonData.name
    );
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      mockPokemonData.sprites.front_default
    );
    expect(screen.getByText(mockPokemonData.name)).toBeInTheDocument();
    expect(screen.getByText(/base exp: 112/i)).toBeInTheDocument();
  });
});
