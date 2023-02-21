import { authApi } from '@/services';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.verify.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    );
  },
});

export default authSlice.reducer;
