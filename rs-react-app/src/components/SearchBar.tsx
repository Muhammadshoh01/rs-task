import React, { useState } from 'react';

type Props = {
  initialValue: string;
  onSearch: (term: string) => void;
};


export function SearchBar({ initialValue, onSearch }: Props) {

  const [input, setInput] = useState(initialValue)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  };

  function handleSearch() {
    const term = input.trim();
    onSearch(term);
  };

  return (
    <div data-testid="search-input" className="flex justify-center gap-2 p-4">
      <input
        className="border px-4 py-2 rounded"
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