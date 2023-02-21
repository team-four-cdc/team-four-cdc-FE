import { authApi, newsApi } from '@/services';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/authSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      newsApi.middleware,
    ]),
});

export type Store = typeof store;
export type Reducer = typeof rootReducer;
export type State = ReturnType<Reducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
