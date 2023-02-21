import { RootState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SignUpResponse {
  message: string;
}

interface SignUpRequest {
  username: string;
  password: string;
}

interface VerifyResponse {
  user: any;
  token: string;
}

interface VerifyRequest {
  token: string;
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
    signup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (payload) => ({
        url: '/signup',
        method: 'POST',
        body: payload,
      }),
    }),
    verify: builder.mutation<VerifyResponse, VerifyRequest>({
      query: (payload) => ({
        url: '/verify',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useSignupMutation, useVerifyMutation } = authApi;
