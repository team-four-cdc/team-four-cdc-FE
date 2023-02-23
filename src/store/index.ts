import { authApi, newsApi } from '@/services';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  storage,
  key: 'root',
  whitelist: ['auth'],
};

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      newsApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export type Store = typeof store;
export type Reducer = typeof rootReducer;
export type State = ReturnType<Reducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
