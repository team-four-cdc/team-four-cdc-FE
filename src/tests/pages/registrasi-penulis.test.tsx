import RegistrasiPenulis from '@/pages/registrasi-penulis';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('should render essential UI components', () => {
  render(<RegistrasiPenulis />);
  const nameField = screen.getByPlaceholderText(/nama/i);
  const emailField = screen.getByPlaceholderText(/email/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  const signupButton = screen.getByRole('button', { name: /daftarkan akun/i });
  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});

test('text input works', async () => {
  const user = userEvent.setup();
  const textName = 'Qwert Yuiop';
  const textEmail = 'asdfghjkl';
  render(<RegistrasiPenulis />);
  const nameField = screen.getByPlaceholderText(/nama/i);
  const emailField = screen.getByPlaceholderText(/email/i);
  await user.type(nameField, textName);
  await user.type(emailField, textEmail);
  expect(nameField).toHaveValue(textName);
  expect(emailField).toHaveValue(textEmail);
});

test('all fields are required', async () => {
  const user = userEvent.setup();
  render(<RegistrasiPenulis />);
  const submitButton = screen.getByText(/daftarkan akun/i);
  await user.click(submitButton);
  await waitFor(() => {
    const errorMessages = screen.getAllByText(/harus diisi/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
