import React from 'react';

interface ControlsProps {
  year: number;
  onYearChange: (y: number) => void;
  regions: string[];
  region: string;
  onRegionChange: (r: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
  sortBy: string;
  onSortByChange: (s: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  year,
  onYearChange,
  regions,
  region,
  onRegionChange,
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
}) => {
  return (
    <div className="controls">
      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
        />
      </label>
      <label>
        Region:
        <select value={region} onChange={(e) => onRegionChange(e.target.value)}>
          <option value="">All</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <input
        type="text"
        placeholder="Search country..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="population-asc">Population ↑</option>
        <option value="population-desc">Population ↓</option>
      </select>
    </div>
  );
};
