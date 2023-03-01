import RegistrasiPembaca from '@/pages/registrasi-pembaca';
import { render } from '@/tests';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '@/store';

test('should render essential UI components', () => {
  render(<RegistrasiPembaca />, { store });
  const emailField = screen.getAllByPlaceholderText(/email/i);
  const passwordField = screen.getAllByPlaceholderText(/password/i);
  const signupButton = screen.getByRole('button', { name: /daftarkan akun/i });
  expect(emailField[0]).toBeInTheDocument();
  expect(passwordField[0]).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});

test('text input works', async () => {
  const user = userEvent.setup();
  const text = 'asdfghjkl';
  render(<RegistrasiPembaca />, { store });
  const emailField = screen.getAllByPlaceholderText(/email/i);
  await user.type(emailField[0], text);
  await user.type(emailField[1], text);
  expect(emailField[0]).toHaveValue(text);
  expect(emailField[1]).toHaveValue(text);
});
