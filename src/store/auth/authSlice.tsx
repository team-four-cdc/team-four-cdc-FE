import { authApi } from '@/services';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  token: string | null;
  isLogin: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isLogin = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isLogin = true;
      }
    );
  },
});

export default authSlice.reducer;
