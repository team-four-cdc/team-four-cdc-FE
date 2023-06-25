import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import jwt_decode, { JwtPayload } from 'jwt-decode';

export interface DecodedToken extends JwtPayload {
  email: string;
  role: 'reader' | 'creator';
  userId: number;
}

export interface IUser extends DecodedToken {
  token: string | null;
  isLogin?: boolean;
}

const initialState: IUser = {
  token: null,
  isLogin: false,
  role: 'reader',
  email: '',
  userId: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string | undefined>) => {
      const token = action.payload;
      if (token) {
        const {
          role = 'reader',
          userId = 0,
          email = '',
        } = token ? jwt_decode<DecodedToken>(token) : {};
        state.role = role;
        state.token = token;
        state.isLogin = true;
        state.userId = userId;
        state.email = email;
      } else {
        state = initialState
      }
    },
    getCurrentState: (state) => {
      state = current(state)
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
  },
});

export const { setAuth, resetAuth, getCurrentState } = authSlice.actions;
export default authSlice.reducer;
