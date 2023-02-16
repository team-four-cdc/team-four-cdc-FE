import '@/styles/index.less';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const Router = useRouter();
  return (
    <Provider store={store}>
      <Navbar Router={Router.asPath} />
      <Component {...pageProps} />
    </Provider>
  );
}
