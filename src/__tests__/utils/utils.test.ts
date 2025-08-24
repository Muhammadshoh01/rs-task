import { describe, it, expect, vi } from 'vitest';
import {
  getPasswordStrength,
  toBase64,
  filterCountries,
} from '../../utils/utils';

type Country = {
  name: string;
  code: string;
};
const countries: Country[] = [
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'UK' },
  { name: 'Germany', code: 'DE' },
];

describe('getPasswordStrength', () => {
  it('should return "weak" for short or simple passwords', () => {
    expect(getPasswordStrength('abc')).toBe('weak');
    expect(getPasswordStrength('12345')).toBe('weak');
    expect(getPasswordStrength('aaaaaaa')).toBe('weak');
  });

  it('should return "medium" for moderately strong passwords', () => {
    expect(getPasswordStrength('abc12345')).toBe('medium');
    expect(getPasswordStrength('Abcdefgh')).toBe('medium');
    expect(getPasswordStrength('1234Abcd')).toBe('medium');
  });

  it('should return "strong" for complex passwords', () => {
    expect(getPasswordStrength('Abcd1234!')).toBe('strong');
    expect(getPasswordStrength('P@ssw0rd2025')).toBe('strong');
    expect(getPasswordStrength('A1b2C3d4$')).toBe('strong');
  });
});

describe('toBase64', () => {
  it('should resolve with base64 string', async () => {
    const mockFile = new File(['hello'], 'test.txt', { type: 'text/plain' });

    const result = await toBase64(mockFile);
    expect(result).toContain('data:text/plain;base64');
  });

  it('should reject on error', async () => {
    const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });

    const originalReader = globalThis.FileReader;

    globalThis.FileReader = vi.fn().mockImplementation(
      (): Partial<FileReader> => ({
        readAsDataURL: () => {
          throw new Error('FileReader failed');
        },
      })
    ) as unknown as typeof FileReader;

    await expect(toBase64(mockFile)).rejects.toThrow('FileReader failed');

    globalThis.FileReader = originalReader;
  });
});

describe('filterCountries', () => {
  it('should return empty array if query is empty', () => {
    expect(filterCountries(countries, '')).toEqual([]);
  });

  it('should filter countries by name (case-insensitive)', () => {
    expect(filterCountries(countries, 'united')).toEqual([
      { name: 'United States', code: 'US' },
      { name: 'United Kingdom', code: 'UK' },
    ]);
  });

  it('should return no results if no match found', () => {
    expect(filterCountries(countries, 'france')).toEqual([]);
  });
});
