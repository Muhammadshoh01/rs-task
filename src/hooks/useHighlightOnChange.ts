import { useEffect, useState } from 'react';

export function useHighlightOnChange<T>(value: T, duration = 1000) {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timeout = setTimeout(() => setHighlight(false), duration);
    return () => clearTimeout(timeout);
  }, [value, duration]);

  return highlight;
}
