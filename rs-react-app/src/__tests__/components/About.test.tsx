import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import About from '../../components/About';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('About Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('renders About content correctly', () => {
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        );

        expect(screen.getByText(/About This Project/)).toBeInTheDocument();
        expect(screen.getByText(/Muhammadshoh Rajabov/)).toBeInTheDocument();
    });

    it('calls navigate(-1) when back button is clicked', () => {
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        );

        const button = screen.getByRole('button', { name: /⬅ Back/i });
        fireEvent.click(button);
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});
