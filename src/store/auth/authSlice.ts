import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import jwt_decode, { JwtPayload } from 'jwt-decode';

export interface DecodedToken extends JwtPayload {
  email: string;
  role: 'reader' | 'creator';
  userId: number;
  fullName: string;

}

export interface IUser extends DecodedToken {
  token: string | null;
  isLogin?: boolean;
  openSidebar: boolean;
}

const initialState: IUser = {
  token: null,
  isLogin: false,
  role: 'reader',
  email: '',
  fullName: '',
  userId: 0,
  openSidebar: false,
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
          fullName = '',
        } = token ? jwt_decode<DecodedToken>(token) : {};

        state.role = role;
        state.token = token;
        state.isLogin = true;
        state.userId = userId;
        state.email = email;
        state.fullName = fullName;
      } else {
        state = initialState
      }
    },
    resetAuth: () => initialState,
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.openSidebar = action.payload
    }
  },
});

export const { setAuth, resetAuth, toggleSidebar } = authSlice.actions;
export default authSlice.reducer;
