import { useState, useEffect } from 'react';
import { useSearchTerm } from './hooks/useSearchTerm';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CardList } from './components/CardList';
import { Link } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { PokemonDetails } from './components/PokemonDetails';
import { ThemeContext } from './context/ThemContexts';

export default function App() {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [shouldThrow, setShouldThrow] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [theme, setTheme] = useState('light');

  const urlSearch = searchParams.get('search') || '';
  const detailsId = searchParams.get('detailsId');

  useEffect(() => {
    if (searchTerm && !urlSearch) {
      setSearchParams({ search: searchTerm });
    }
  }, [searchTerm, urlSearch, setSearchParams]);

  function changeTheme() {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  }
  function handleSearch(term: string) {
    setSearchTerm(term);
    setSearchParams({ search: term });
  }
  const handleCardClick = (id: number) => {
    setSearchParams((prev) => {
      prev.set('search', urlSearch);
      prev.set('detailsId', String(id));
      return prev;
    });
  };
  const closeDetails = () => {
    setSearchParams((prev) => {
      prev.delete('detailsId');
      return prev;
    });
  };

  function throwError() {
    setShouldThrow(true);
  }
  if (shouldThrow) {
    throw new Error('Manually thrown error in render');
  }
  return (
    <ThemeContext value={theme}>
      <div
        className={`min-h-screen ${theme === 'light' ? 'bg-pink-50' : 'bg-gray-900 text-white'}`}
      >
        <Header />
        <SearchBar initialValue={urlSearch} onSearch={handleSearch} />
        <div className="text-center my-2 flex items-center justify-center gap-2">
          <button
            onClick={throwError}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Throw Error.
          </button>
          <Link
            to="/about"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            About page
          </Link>
          <button
            className="cursor-pointer bg-slate-500 text-white px-4 py-2 rounded"
            onClick={changeTheme}
          >
            Toggle theme
          </button>
        </div>
        <div className="flex">
          <div className="w-full md:w-1/2 p-4">
            <CardList onCardClick={handleCardClick} search={searchTerm} />
          </div>
          {detailsId && (
            <div className="hidden md:block w-1/2 p-4 border-l">
              <PokemonDetails id={detailsId} onClose={closeDetails} />
            </div>
          )}
        </div>
      </div>
    </ThemeContext>
  );
}
