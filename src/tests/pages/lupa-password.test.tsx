import LupaPassword from '@/pages/lupa-password';
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

test('Render Lupa Password', async () => {
  const user = userEvent.setup();
  const textEmail = 'kresnataWorld@gmail.com';
  render(<LupaPassword />);
  const emailField = screen.getByPlaceholderText(/email/i);
  await user.type(emailField, textEmail);
  expect(emailField).toHaveValue(textEmail);
});

test('Required Field', async () => {
  const user = userEvent.setup();
  render(<LupaPassword />);
  const submitEmail = screen.getByText(/kirim email/i);
  await user.click(submitEmail);
  await waitFor(() => {
    const errorMessages = screen.getAllByText(/input your email!/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
