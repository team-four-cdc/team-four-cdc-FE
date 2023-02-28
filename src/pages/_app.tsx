import '@/styles/index.less';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistor, wrapper } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
}
