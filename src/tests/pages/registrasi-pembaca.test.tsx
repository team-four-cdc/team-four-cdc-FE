import RegistrasiPembaca from '@/pages/registrasi-pembaca';
import { render } from '@/tests';
import { screen, waitFor } from '@testing-library/react';
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

test('all fields are required', async () => {
  const user = userEvent.setup();
  render(<RegistrasiPembaca />, { store });
  const submitButton = screen.getByText(/daftarkan akun/i);
  await user.click(submitButton);
  await waitFor(() => {
    const errorMessages = screen.getAllByText(/harus diisi/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
