import { articleApi, authApi, newsApi } from '@/services';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

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
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      newsApi.middleware,
      articleApi.middleware,
    ]),
});

export const persistor = persistStore(store);

export const wrapper = createWrapper(() => store);

export type Store = typeof store;
export type Reducer = typeof rootReducer;
export type State = ReturnType<Reducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
