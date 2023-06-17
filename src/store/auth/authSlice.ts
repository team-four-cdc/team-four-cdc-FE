import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { authApi } from '@/services';

interface DecodedToken extends JwtPayload {
  email: string;
  role: 'reader' | 'creator' | null;
  userId: number;
}

interface AuthState extends DecodedToken {
  token: string | null;
  isLogin: boolean;
}

const initialState: AuthState = {
  token: null,
  isLogin: false,
  role: null,
  email: '',
  userId: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      const {
        role = null,
        userId = 0,
        email = '',
      } = token ? jwt_decode<DecodedToken>(token) : {};
      state.role = role;
      state.token = token;
      state.isLogin = true;
      state.userId = userId;
      state.email = email;
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const token = payload.data?.token;
        const {
          role = null,
          userId = 0,
          email = '',
        } = token ? jwt_decode<DecodedToken>(token) : {};
        state.role = role;
        state.token = token;
        state.isLogin = true;
        state.userId = userId;
        state.email = email;
      },
    );
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
