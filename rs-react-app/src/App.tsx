import { useState } from 'react';
import { useSearchTerm } from './hooks/useSearchTerm';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CardList } from './components/CardList';

export default function App() {
  const [searchTerm, setSearchTerm] = useSearchTerm()
  const [shouldThrow, setShouldThrow] = useState<boolean>(false)

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
        initialValue={searchTerm}
        onSearch={setSearchTerm}
      />
      <div className="text-center my-2">
        <button
          onClick={throwError}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Throw Error.
        </button>
      </div>
      <CardList search={searchTerm} />
    </div>
  );
}