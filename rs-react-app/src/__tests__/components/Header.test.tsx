import { it, expect, describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import { Header } from '../../components/Header';
import { ThemeContext } from '../../context/ThemContexts';

describe('Header', () => {
  function renderWithTheme(theme: 'light' | 'dark') {
    return render(
      <ThemeContext.Provider value={theme}>
        <Header />
      </ThemeContext.Provider>
    );
  }

  it('should render header with light theme styles', () => {
    renderWithTheme('light');

    const banner = screen.getByRole('banner');
    expect(banner).toHaveTextContent(/pokemon/i);
    expect(banner).toHaveClass('bg-pink-500');
  });

  it('should render header with dark theme styles', () => {
    renderWithTheme('dark');

    const banner = screen.getByRole('banner');
    expect(banner).toHaveTextContent(/pokemon/i);
    expect(banner).toHaveClass('bg-gray-800');
  });
});
