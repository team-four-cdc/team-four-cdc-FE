import { FunctionComponent, ReactElement } from 'react';
import {
  queries,
  Queries,
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistedReducer, State, Store } from '@/store';

type ExtraOptions = {
  initialState?: State;
  store?: Store;
};

const render = <
  Q extends Queries = typeof queries,
  C extends Element | DocumentFragment = HTMLElement
>(
    ui: ReactElement,
    options: ExtraOptions & RenderOptions<Q, C> = {},
  ): RenderResult<Q, C> & { store: Store } => {
  const {
    store = configureStore({ reducer: persistedReducer }),
    ...renderOptions
  } = options;

  const Wrapper: FunctionComponent = ({ children }: any) => <Provider store={store}>{children}</Provider>;

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};

export * from '@testing-library/react';
export { render };
