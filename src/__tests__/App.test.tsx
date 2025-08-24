import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    const file = new File(['dummy image'], 'john.png', { type: 'image/png' });
    it('renders buttons to open modals', () => {
        render(<App />);
        expect(
            screen.getByRole('button', { name: /Open React Hook Form/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Open Uncontrolled Form/i })
        ).toBeInTheDocument();
    });

    it('opens and closes ReactHookForm modal', () => {
        render(<App />);

        const openButton = screen.getByRole('button', { name: /Open React Hook Form/i });
        fireEvent.click(openButton);

        expect(screen.getByText(/React Hook Form/i)).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('modal-backdrop'));
    });

    it('adds user to the store and displays it', async () => {
        render(<App />);

        fireEvent.click(screen.getByRole('button', { name: /Open React Hook Form/i }));
        const modal = screen.getByRole('dialog');

        const nameInput = within(modal).getByLabelText(/Name/i);
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });

        const ageInput = within(modal).getByLabelText(/Age/i);
        fireEvent.change(ageInput, { target: { value: '28' } });

        const emailInput = within(modal).getByLabelText(/Email/i);
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

        const maleRadio = within(modal).getByLabelText("Male");
        fireEvent.click(maleRadio);

        const countrySelect = within(modal).getByLabelText(/Select country/i);
        fireEvent.change(countrySelect, { target: { value: 'us' } });

        const pictureInput = within(modal).getByLabelText(/Profile Picture/i);
        fireEvent.change(pictureInput, {
            target: { files: [file] },
        });

        fireEvent.click(within(modal).getByRole('button', { name: /Submit/i }));
    });
});
