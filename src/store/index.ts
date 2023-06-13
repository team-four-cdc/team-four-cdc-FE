import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from '@/store/auth/authSlice';
import {
  articleApi, authApi, categoriesApi, newsApi,
} from '@/services';

const persistConfig = {
  storage,
  key: 'root',
  whitelist: ['auth'],
};

const combinedReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    // eslint-disable-next-line
    const nextState = {
      ...state,
      ...action.payload,
    };
    // eslint-disable-next-line
    return nextState;
  }
  return combinedReducer(state, action);
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat([
    authApi.middleware,
    newsApi.middleware,
    articleApi.middleware,
    categoriesApi.middleware,
  ]),
});

export const persistor = persistStore(store);

export const wrapper = createWrapper(() => store);

export type Store = typeof store;
export type Reducer = typeof rootReducer;
export type State = ReturnType<Reducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
