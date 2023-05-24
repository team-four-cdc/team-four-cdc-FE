import { authApi } from '@/services';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      const { role = null } = token ? jwt_decode<DecodedToken>(token) : {};
      state.role = role;
      state.token = token;
      state.isLogin = true;
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
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

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
