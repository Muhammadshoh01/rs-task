import { useState, useEffect } from 'react';
import { useSearchTerm } from './hooks/useSearchTerm';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CardList } from './components/CardList';
import { Link } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export default function App() {
  const [searchTerm, setSearchTerm] = useSearchTerm()
  const [shouldThrow, setShouldThrow] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get('search') || '';

  // 👉 On load: if localStorage has value but URL doesn't — sync it
  useEffect(() => {
    if (searchTerm && !searchParams.get('search')) {
      setSearchParams({ search: searchTerm, offset: '0' });
    }
  }, []);

  function handleSearch(term: string) {
    setSearchTerm(term); // localStorage
    setSearchParams({ search: term, offset: '0' }); // URL
  }

  function throwError() {
    setShouldThrow(true)
  }
  if (shouldThrow) {
    throw new Error('Manually thrown error in render');
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <SearchBar
        initialValue={urlSearch}
        onSearch={handleSearch}
      />
      <div className="text-center my-2 flex items-center justify-center gap-2">
        <button
          onClick={throwError}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Throw Error.
        </button>
        <Link to="/about" className="bg-blue-500 text-white px-4 py-2 rounded">
          About page
        </Link>
      </div>
      <CardList search={searchTerm} />
    </div>
  );
}