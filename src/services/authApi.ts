import { RootState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AuthRequest {
  role: string;
  email: string;
  password: string;
  author?: string;
  fullname?: string;
}

interface VerifyRequest {
  token: string;
}

interface AuthResponse {
  email: any;
  token: string;
}

interface RegisterResponse {
  status: string;
  data: any;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, AuthRequest>({
      query: (payload) => ({
        url: '/user/register',
        method: 'POST',
        body: payload,
      }),
    }),
    verify: builder.mutation<AuthResponse, VerifyRequest>({
      query: (payload) => ({
        url: '/user/verify',
        method: 'POST',
        body: payload,
      }),
    }),
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (payload) => ({
        url: '/login',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useRegisterMutation, useVerifyMutation, useLoginMutation } =
  authApi;
