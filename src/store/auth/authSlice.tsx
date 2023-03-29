import { authApi } from '@/services';
import { createSlice } from '@reduxjs/toolkit';
import jwt_decode, { JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  email: string;
  role: 'reader' | 'creator' | null;
}

interface AuthState {
  token: string | null;
  isLogin: boolean;
  role: 'reader' | 'creator' | null;
}

const initialState: AuthState = {
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
        const token = payload.data?.token;
        const { role = null } = token ? jwt_decode<DecodedToken>(token) : {};
        state.role = role;
        state.token = token;
        state.isLogin = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const token = payload.data?.token;
        const { role = null } = token ? jwt_decode<DecodedToken>(token) : {};
        state.role = role;
        state.token = token;
        state.isLogin = true;
      }
    );
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
