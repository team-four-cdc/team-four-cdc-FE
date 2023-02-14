import RegistrasiPembaca from '@/pages/registrasi-pembaca';
import { render, screen } from '@testing-library/react';

test('should render essential UI components', () => {
  render(<RegistrasiPembaca />);
  const emailField = screen.getByPlaceholderText(/email/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  const signupButton = screen.getByRole('button', { name: /daftarkan akun/i });
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});
