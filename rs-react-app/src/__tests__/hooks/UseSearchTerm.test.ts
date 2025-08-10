import { renderHook, act } from '@testing-library/react';
import { useSearchTerm } from '../../hooks/useSearchTerm';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useSearchTerm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value from localStorage', () => {
    localStorage.setItem('searchTerm', 'pokemon');
    const { result } = renderHook(() => useSearchTerm('searchTerm'));
    expect(result.current[0]).toBe('pokemon');
  });

  it('should update localStorage when term changes', () => {
    const { result } = renderHook(() => useSearchTerm('searchTerm'));

    act(() => {
      result.current[1]('pikachu');
    });

    expect(localStorage.getItem('searchTerm')).toBe('pikachu');
    expect(result.current[0]).toBe('pikachu');
  });

  it('should return empty string if no value in localStorage', () => {
    const { result } = renderHook(() => useSearchTerm('searchTerm'));
    expect(result.current[0]).toBe('');
  });
});
