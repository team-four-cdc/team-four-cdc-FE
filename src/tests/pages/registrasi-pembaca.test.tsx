import RegistrasiPembaca from '@/pages/registrasi-pembaca';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// fix for window.matchMedia is not a function
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

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
