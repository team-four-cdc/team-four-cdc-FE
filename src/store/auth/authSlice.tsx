import { authApi } from '@/services';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isLogin: boolean;
  role: string | null;
}

const initialState: AuthState = {
  role: null,
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
        state.role = payload.data?.role;
        state.token = payload.data?.token;
        state.isLogin = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.role = payload.data?.role;
        state.token = payload.data?.token;
        state.isLogin = true;
      }
    );
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
