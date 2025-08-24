import { describe, it, expect, beforeEach } from 'vitest';
import { useCountryStore } from '../../store/useCountryStore';

describe('useCountryStore', () => {
  beforeEach(() => {
    useCountryStore.setState({ countries: [] });
  });

  it('should initialize with empty countries', () => {
    const state = useCountryStore.getState();
    expect(state.countries).toEqual([]);
  });

  it('should set countries correctly', () => {
    const countries = [
      { name: 'United States', code: 'US' },
      { name: 'Germany', code: 'DE' },
    ];

    useCountryStore.getState().setCountries(countries);

    const state = useCountryStore.getState();
    expect(state.countries).toEqual(countries);
    expect(state.countries).toHaveLength(2);
    expect(state.countries[0].code).toBe('US');
  });
});
