import { combineReducers, configureStore } from '@reduxjs/toolkit';
import newsReducer from './news/newsSlice';

export const rootReducer = combineReducers({
  news: newsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
