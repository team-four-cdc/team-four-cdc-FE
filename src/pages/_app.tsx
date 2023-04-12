import '@/styles/index.less';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { persistor, wrapper } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import MainLayout from '@/layout/MainLayout';
import { ComponentType } from 'react';
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: ComponentType<any>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const Layout = Component.getLayout || MainLayout;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Component {...props} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
