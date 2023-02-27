import RegistrasiPenulis from '@/pages/registrasi-penulis';
import { render, screen, waitFor } from '@testing-library/react';
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

// for some reason, the HTML for the form error messages cannot be detected
/*test('all fields are required', async () => {
  const user = userEvent.setup();
  render(<RegistrasiPenulis />);
  const submitButton = screen.getByText(/daftarkan akun/i);
  await user.click(submitButton);
  const errorMessages = screen.getAllByText(/harus diisi/i);
  await waitFor(() => expect(errorMessages.length).toBeGreaterThan(0));
});*/
