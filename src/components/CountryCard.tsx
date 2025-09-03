import React, { useState } from 'react';
import type { CountryData, YearlyData } from '../types/co2';
import { DataTable } from './DataTable';

interface Props {
  country: CountryData;
  extraColumns: string[];
  year: number;
}

export const CountryCard: React.FC<Props> = React.memo(
  ({ country, extraColumns, year }) => {
    const [open, setOpen] = useState(false);
    const row: YearlyData | undefined = country.data.find(
      (d) => d.year === year
    );

    return (
      <div className="country-card">
        <h2>
          {country.country} {country.iso_code && `(${country.iso_code})`}
        </h2>
        <p>Population: {row?.population ?? 'N/A'}</p>
        <button onClick={() => setOpen((o) => !o)}>
          {open ? 'Hide Data' : 'Show Data'}
        </button>
        {open && <DataTable data={country.data} extraColumns={extraColumns} />}
      </div>
    );
  }
);
