import RegistrasiPembaca from '@/pages/registrasi-pembaca';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

test('should render essential UI components', () => {
  render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RegistrasiPembaca />
      </PersistGate>
    </Provider>
  );
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
  render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RegistrasiPembaca />
      </PersistGate>
    </Provider>
  );
  const emailField = screen.getAllByPlaceholderText(/email/i);
  await user.type(emailField[0], text);
  await user.type(emailField[1], text);
  expect(emailField[0]).toHaveValue(text);
  expect(emailField[1]).toHaveValue(text);
});
