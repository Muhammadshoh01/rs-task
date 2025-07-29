import { useContext } from 'react';
import { ThemeContext } from '../context/ThemContexts';
export function Header() {
  const theme = useContext(ThemeContext);
  return (
    <header
      data-testid="header"
      className={`text-white text-center p-4 text-xl font-bold ${theme === 'light' ? 'bg-pink-500 text-white' : 'bg-gray-800 text-pink-200'}`}
    >
      Pokemon Explorer
    </header>
  );
}
