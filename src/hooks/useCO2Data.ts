import type { CO2Dataset } from '../types/co2';

let cachedData: CO2Dataset | null = null;
let dataPromise: Promise<CO2Dataset> | null = null;
let error: Error | null = null;

export function useCO2Data(url: string): CO2Dataset {
  if (cachedData) return cachedData;
  if (error) throw error;
  if (!dataPromise) {
    dataPromise = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        return res.json() as Promise<CO2Dataset>;
      })
      .then((json) => {
        cachedData = json;
        return json;
      })
      .catch((err) => {
        error = err;
        throw err;
      });
  }
  throw dataPromise;
}
