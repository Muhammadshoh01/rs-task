import { Suspense, useMemo, useState, useCallback } from 'react';
import { useCO2Data } from './hooks/useCO2Data';
import { Controls } from './components/Controls';
import { CountryCard } from './components/CountryCard';
import { ColumnSelectorModal } from './components/ColumnSelectorModal';
import type { CountryData } from './types/co2';

const DATA_URL =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

function AppContent() {
  // const { data, loading, error } = useCO2Data(DATA_URL);
  const data = useCO2Data(DATA_URL); // Suspense handles loading, ErrorBoundary handles error

  const [year, setYear] = useState(2020);
  const [region, setRegion] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [extraColumns, setExtraColumns] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const countries = useMemo<CountryData[]>(() => {
    if (!data) return [];
    return Object.entries(data).map(([key, value]) => ({
      ...value,
      country: value.country ?? value.name ?? key,
    }));
  }, [data]);

  const regions = useMemo(() => {
    const set = new Set<string>();
    countries.forEach((c) => {
      if (c.region) set.add(c.region);
    });
    return Array.from(set).sort();
  }, [countries]);

  const allExtraColumns = useMemo(() => {
    if (countries.length === 0) return [];
    const sample = countries[0].data[0];
    return Object.keys(sample).filter(
      (k) => !['year', 'population', 'co2', 'co2_per_capita'].includes(k)
    );
  }, [countries]);

  const filtered = useMemo(() => {
    let list = [...countries];
    if (region) {
      list = list.filter((c) => c.region === region);
    }
    if (search) {
      list = list.filter((c) =>
        (c.country ?? '').toLowerCase().includes(search.toLowerCase())
      );
    }

    list.sort((a, b) => {
      const nameA = a.country ?? '';
      const nameB = b.country ?? '';

      if (sortBy === 'name-asc') return nameA.localeCompare(nameB);
      if (sortBy === 'name-desc') return nameB.localeCompare(nameA);

      const getPop = (c: CountryData) =>
        c.data.find((d) => d.year === year)?.population ?? 0;

      if (sortBy === 'population-asc') return getPop(a) - getPop(b);
      if (sortBy === 'population-desc') return getPop(b) - getPop(a);

      return 0;
    });

    return list;
  }, [countries, region, search, sortBy, year]);

  const handleYearChange = useCallback((y: number) => setYear(y), []);
  const handleRegionChange = useCallback((r: string) => setRegion(r), []);
  const handleSearchChange = useCallback((s: string) => setSearch(s), []);
  const handleSortByChange = useCallback((s: string) => setSortBy(s), []);
  const handleExtraColumnsChange = useCallback(
    (cols: string[]) => setExtraColumns(cols),
    []
  );
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h1>CO₂ Explorer</h1>
      <Controls
        year={year}
        onYearChange={handleYearChange}
        regions={regions}
        region={region}
        onRegionChange={handleRegionChange}
        search={search}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        onSortByChange={handleSortByChange}
      />
      <button onClick={() => setShowModal(true)}>Select Columns</button>
      {showModal && (
        <ColumnSelectorModal
          allColumns={allExtraColumns}
          selected={extraColumns}
          onChange={handleExtraColumnsChange}
          onClose={() => setShowModal(false)}
        />
      )}
      <div>
        {filtered.map((country) => (
          <CountryCard
            key={country.iso_code || country.country}
            country={country}
            year={year}
            extraColumns={extraColumns}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<p>Loading app...</p>}>
      <AppContent />
    </Suspense>
  );
}
