import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrasiPenulis from '@/pages/registrasi-penulis';
import { store } from '@/store';
import { render } from '@/tests';

describe('Registration Creator Page', () => {
  it('shows success message when registration success', async () => {
    const user = userEvent.setup();
    render(<RegistrasiPenulis />, { store });
    const response = [{ status: 'fulfilled', message: 'success' }];
    fetchMock.mockResponse(JSON.stringify(response));
    const name = 'name';
    const nameField = screen.getAllByPlaceholderText(/nama/i);
    await user.type(nameField[0], name);
    const email = 'email@gmail.com';
    const emailField = screen.getAllByPlaceholderText(/email/i);
    await user.type(emailField[0], email);
    const password = 'password';
    const passwordField = screen.getAllByPlaceholderText(/password/i);
    await user.type(passwordField[0], password);
    const submitButton = screen.getByText(/daftarkan akun/i);
    await user.click(submitButton);
    await waitFor(() => {
      const message = screen.getByText(/success/i);
      expect(message).toBeInTheDocument();
    });
  });

  it('shows failed message when registration failed', async () => {
    const user = userEvent.setup();
    render(<RegistrasiPenulis />, { store });
    fetchMock.mockReject(new Error('Internal Server Error'));
    const name = 'name';
    const nameField = screen.getAllByPlaceholderText(/nama/i);
    await user.type(nameField[0], name);
    const email = 'email@gmail.com';
    const emailField = screen.getAllByPlaceholderText(/email/i);
    await user.type(emailField[0], email);
    const password = 'password';
    const passwordField = screen.getAllByPlaceholderText(/password/i);
    await user.type(passwordField[0], password);
    const submitButton = screen.getByText(/daftarkan akun/i);
    await user.click(submitButton);
    await waitFor(() => {
      const message = screen.getByText(/error/i);
      expect(message).toBeInTheDocument();
    });
  });
});
