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
}

const initialState: IUser = {
  token: null,
  isLogin: false,
  role: 'reader',
  email: '',
  fullName: '',
  userId: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{
      token: string;
      fullName: string
    }>) => {
      const {token, fullName} = action.payload;
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
        state.fullName = fullName;
      } else {
        state = initialState
      }
    },
    resetAuth: () => initialState,
  },
});

export const { setAuth, resetAuth } = authSlice.actions;
export default authSlice.reducer;
