import React from 'react';
import type { YearlyData } from '../types/co2';

interface Props {
  data: YearlyData[];
  extraColumns: string[];
}

export const DataTable: React.FC<Props> = ({ data, extraColumns }) => {
  const columns = [
    'year',
    'population',
    'co2',
    'co2_per_capita',
    ...extraColumns,
  ];

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.year}>
            {columns.map((col) => (
              <td key={col}>{row[col] ?? 'N/A'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
