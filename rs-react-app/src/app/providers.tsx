'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';
import { ThemeContext } from '../context/ThemeContexts';

export function QueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [theme, setTheme] = useState<'light' | 'dark'>("light");
    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContext.Provider value={{ theme, toggleTheme }} >
                {children}
            </ThemeContext.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
