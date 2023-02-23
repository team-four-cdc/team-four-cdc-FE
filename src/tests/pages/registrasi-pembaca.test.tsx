import RegistrasiPembaca from '@/pages/registrasi-pembaca';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('should render essential UI components', () => {
  render(<RegistrasiPembaca />);
  const emailField = screen.getByPlaceholderText(/email/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  const signupButton = screen.getByRole('button', { name: /daftarkan akun/i });
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});

test('text input works', async () => {
  const user = userEvent.setup();
  const text = 'asdfghjkl';
  render(<RegistrasiPembaca />);
  const emailField = screen.getByPlaceholderText(/email/i);
  await user.type(emailField, text);
  expect(emailField).toHaveValue(text);
});
