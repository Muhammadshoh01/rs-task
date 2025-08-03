import React, { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemContexts';

type Props = {
  initialValue: string;
  onSearch: (term: string) => void;
};

export function SearchBar({ initialValue, onSearch }: Props) {
  const [input, setInput] = useState(initialValue);
  const theme = useContext(ThemeContext);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function handleSearch() {
    const term = input.trim();
    onSearch(term);
  }

  return (
    <div
      data-testid="search-input"
      className={`flex justify-center gap-2 p-4 ${theme === 'light' ? 'bg-pink-100' : 'bg-gray-800'}`}
    >
      <input
        className={`border px-4 py-2 rounded w-[280px] outline-none
    ${theme === 'light' ? 'text-gray-800 border-pink-300 bg-white' : 'text-white bg-gray-700 border-gray-600'}`}
        value={input}
        onChange={handleChange}
        placeholder="Search Pokémon by name"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
