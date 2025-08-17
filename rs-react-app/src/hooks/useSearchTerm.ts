import { useState, useEffect } from 'react';

export function useSearchTerm(key: string = 'searchTerm') {
  const [term, setTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      setTerm(stored);
    }
  }, [key]);

  useEffect(() => {
    if (term) {
      localStorage.setItem(key, term);
    } else {
      localStorage.removeItem(key);
    }
  }, [term, key]);

  return [term, setTerm] as const;
}
