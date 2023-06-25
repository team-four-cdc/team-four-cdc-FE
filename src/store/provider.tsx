"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from '@/store';

function Providers({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}

export default Providers
