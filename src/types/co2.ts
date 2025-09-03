export interface YearlyData {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  [key: string]: number | string | undefined;
}

export interface CountryData {
  country: string;
  name?: string;
  iso_code?: string;
  region?: string;
  data: YearlyData[];
}

export type CO2Dataset = Record<string, CountryData>;
