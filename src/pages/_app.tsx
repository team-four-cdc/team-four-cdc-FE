import React, { ReactNode } from 'react';
import '@/styles/index.less';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ComponentType } from 'react';
import { NextPage } from 'next';
import MainLayout from '@/layout/MainLayout';
import { persistor, wrapper } from '@/store';

type NextPageWithLayout = NextPage & {
  getLayout?: ComponentType<ReactNode>;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // eslint-disable-next-line
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
