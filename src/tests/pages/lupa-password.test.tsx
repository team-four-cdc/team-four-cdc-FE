import LupaPassword from '@/pages/lupa-password';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@/tests';
import userEvent from '@testing-library/user-event';
import { store } from '@/store';

test('Render Lupa Password', async () => {
  const user = userEvent.setup();
  const textEmail = 'kresnataWorld@gmail.com';
  render(<LupaPassword />, { store });
  const emailField = screen.getAllByPlaceholderText(/email/i);
  await user.type(emailField[1], textEmail);
  expect(emailField[1]).toHaveValue(textEmail);
});

test('Required Field', async () => {
  const user = userEvent.setup();
  render(<LupaPassword />, { store });
  const submitEmail = screen.getByText(/kirim email/i);
  await user.click(submitEmail);
  await waitFor(() => {
    const errorMessages = screen.getAllByText(/input your email!/i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
