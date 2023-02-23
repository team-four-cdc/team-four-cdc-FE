import '@/styles/index.less';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  const Router = useRouter();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navbar Router={Router.asPath} />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
