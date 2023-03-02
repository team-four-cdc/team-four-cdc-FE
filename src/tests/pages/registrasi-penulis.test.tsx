import RegistrasiPenulis from '@/pages/registrasi-penulis';
import { store } from '@/store';
import { render } from '@/tests';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('should render essential UI components', () => {
  render(<RegistrasiPenulis />, { store });
  const nameField = screen.getAllByPlaceholderText(/nama/i);
  const emailField = screen.getAllByPlaceholderText(/email/i);
  const passwordField = screen.getAllByPlaceholderText(/password/i);
  const signupButton = screen.getByRole('button', { name: /daftarkan akun/i });
  expect(nameField[0]).toBeInTheDocument();
  expect(emailField[0]).toBeInTheDocument();
  expect(passwordField[0]).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});

test('text input works', async () => {
  const user = userEvent.setup();
  const textName = 'Qwert Yuiop';
  const textEmail = 'asdfghjkl';
  render(<RegistrasiPenulis />, { store });
  const nameField = screen.getAllByPlaceholderText(/nama/i);
  const emailField = screen.getAllByPlaceholderText(/email/i);
  await user.type(nameField[0], textName);
  await user.type(emailField[0], textEmail);
  expect(nameField[0]).toHaveValue(textName);
  expect(emailField[0]).toHaveValue(textEmail);
});

test('all fields are required', async () => {
  const user = userEvent.setup();
  render(<RegistrasiPenulis />, { store });
  const submitButton = screen.getByText(/daftarkan akun/i);
  await user.click(submitButton);
  await waitFor(() => {
    const errorMessages = screen.getAllByText(/harus diisi/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
