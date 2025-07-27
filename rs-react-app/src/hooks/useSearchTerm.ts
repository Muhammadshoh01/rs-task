import { useState, useEffect } from 'react';

export function useSearchTerm(key: string = 'searchTerm') {
  const [term, setTerm] = useState(() => localStorage.getItem(key) || '');

  useEffect(() => {
    localStorage.setItem(key, term);
  }, [term, key]);

  return [term, setTerm] as const;
}
