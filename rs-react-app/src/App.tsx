'use client';
import { useEffect } from 'react';
import { useSearchTerm } from './hooks/useSearchTerm';
import { SearchBar } from './components/SearchBar';
import { CardList } from './components/CardList';
import { useSearchParams, useRouter } from 'next/navigation';
import { PokemonDetails } from './components/PokemonDetails';
import { useTheme } from './context/ThemeContexts';

export default function App() {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { theme } = useTheme();

  const urlSearch = searchParams.get('search') || '';
  const detailsId = searchParams.get('detailsId');

  useEffect(() => {
    if (searchTerm && !urlSearch) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('search', searchTerm);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchTerm, urlSearch, searchParams]);

  function handleSearch(term: string) {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', term);
    if (term) {
      router.push(`?${params.toString()}`, { scroll: false });
    } else {
      params.delete('search');
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }
  const handleCardClick = (id: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('detailsId', String(id));
    params.set('search', urlSearch);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  const closeDetails = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('detailsId');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={`min-h-screen ${theme === 'light' ? 'bg-pink-50' : 'bg-gray-900 text-white'}`}
    >
      <SearchBar initialValue={urlSearch} onSearch={handleSearch} />
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
  );
}
