import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import '@testing-library/jest-dom';

// Mock reducer
const mockReducer = (state = {}, action: any) => state;

// Create a mock store
const mockStore = createStore(mockReducer);

describe('Login component', () => {
  it('should show validation errors when submitting with empty fields', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();

      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('should not show validation errors when submitting with valid fields', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.queryByText(/username is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
    });
  });
});
