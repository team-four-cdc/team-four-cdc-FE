import { render } from '@/tests';
import { store } from '@/store';
import { screen, waitFor } from '@testing-library/react';
import Verifikasi from '@/pages/verifikasi/[token]';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
      query: { token: 'token' },
    };
  },
}));

describe('Verification Page', () => {
  it('shows success message when verification success', async () => {
    render(<Verifikasi />, { store });
    const response = [null, { isUninitialized: false, isLoading: false }];
    fetchMock.mockResponse(JSON.stringify(response));
    await waitFor(() => {
      const message = screen.getByText(/verifikasi berhasil/i);
      expect(message).toBeInTheDocument();
    });
  });

  it('shows failed message when verification failed', async () => {
    render(<Verifikasi />, { store });
    fetchMock.mockReject(new Error('Internal Server Error'));
    await waitFor(() => {
      const message = screen.getByText(/verifikasi gagal/i);
      expect(message).toBeInTheDocument();
    });
  });
});
