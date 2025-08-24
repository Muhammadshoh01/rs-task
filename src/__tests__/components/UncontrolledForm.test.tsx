import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import UncontrolledForm from '../../components/UncontrolledForm';
import { useFormStore } from '../../store/useFormStore';
import { useCountryStore } from '../../store/useCountryStore';

beforeEach(() => {
  useFormStore.setState({ users: [] });
  useCountryStore.setState({
    countries: [
      { name: 'Germany', code: 'DE' },
      { name: 'Canada', code: 'CA' },
    ],
  });
});

describe('UncontrolledForm', () => {
  it('renders all fields', () => {
    render(<UncontrolledForm onClose={() => {}} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Profile Picture/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Accept Terms/i)).toBeInTheDocument();
  });

  it('shows password strength indicator', async () => {
    render(<UncontrolledForm onClose={() => {}} />);
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(passwordInput, { target: { value: 'abc' } });
    expect(await screen.findByText(/Strength: weak/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'Abc123' } });
    expect(await screen.findByText(/Strength: medium/i)).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: 'Abc123$%^' } });
    expect(await screen.findByText(/Strength: strong/i)).toBeInTheDocument();
  });

  it('filters and selects country', async () => {
    render(<UncontrolledForm onClose={() => {}} />);
    const input = screen.getByLabelText(/Select country/i);

    fireEvent.change(input, { target: { value: 'ger' } });

    expect(await screen.findByText('Germany')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Germany'));

    await waitFor(() => {
      expect(input).toHaveValue('DE');
    });
  });
});
