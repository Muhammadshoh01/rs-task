import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('App Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders initial UI correctly', () => {
        render(<App />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('search-input')).toBeInTheDocument();
        screen.debug()
        waitFor(() => {
            expect(screen.getByTestId('card-list')).toHaveTextContent('Search term:');
        })
    });

    it('sets searchTerm from localStorage', () => {
        localStorage.setItem('searchTerm', 'pikachu');
        render(<App />);
        waitFor(() => {
            expect(screen.getByTestId('card-list')).toHaveTextContent('pikachu');
        })
    });

    // it('updates search term when typed in search bar', () => {
    //     render(<App />);
    //     const input = screen.getByTestId('search-input');
    //     fireEvent.change(input, { target: { value: 'charmander' } });

    //     // The component re-renders instantly
    //     expect(screen.getByTestId('card-list')).toHaveTextContent('charmander');
    // });

    it('throws error when "Throw Error" button is clicked', () => {
        // Use a try-catch block to catch the error and test the throw
        const consoleError = vi.spyOn(console, 'error').mockImplementation(() => { }); // silence React error logs

        expect(() => {
            render(<App />);
            const throwBtn = screen.getByText(/throw error/i);
            fireEvent.click(throwBtn);
        }).toThrow('Manually thrown error in render');

        consoleError.mockRestore();
    });
});
