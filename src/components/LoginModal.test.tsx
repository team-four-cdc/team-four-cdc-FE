import { render } from '@/tests';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '@/store';
import LoginModal from '@/components/LoginModal';

describe('Login Modal Component', () => {
  it('shows success message when login success', async () => {
    const user = userEvent.setup();
    render(
      <LoginModal visible={true} setVisibility={() => null} role="pembaca" />,
      { store }
    );
    const response = [{ status: 'fulfilled', message: 'success' }];
    fetchMock.mockResponse(JSON.stringify(response));
    const email = 'email@gmail.com';
    const emailField = screen.getByPlaceholderText(/email/i);
    await user.type(emailField, email);
    const password = 'password';
    const passwordField = screen.getByPlaceholderText(/password/i);
    await user.type(passwordField, password);
    const loginButton = screen.getByRole('button', { name: /login/i });
    await user.click(loginButton);
    await waitFor(() => {
      const message = screen.getByText(/success/i);
      expect(message).toBeInTheDocument();
    });
  });

  it('shows failed message when login failed', async () => {
    const user = userEvent.setup();
    render(
      <LoginModal visible={true} setVisibility={() => null} role="pembaca" />,
      { store }
    );
    fetchMock.mockReject(new Error('Internal Server Error'));
    const email = 'email@gmail.com';
    const emailField = screen.getByPlaceholderText(/email/i);
    await user.type(emailField, email);
    const password = 'password';
    const passwordField = screen.getByPlaceholderText(/password/i);
    await user.type(passwordField, password);
    const loginButton = screen.getByRole('button', { name: /login/i });
    await user.click(loginButton);
    await waitFor(() => {
      const message = screen.getByText(/error/i);
      expect(message).toBeInTheDocument();
    });
  });
});
