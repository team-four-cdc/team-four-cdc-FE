import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface AuthRequest {
  role: string;
  email: string;
  password: string;
  author?: string;
  fullname?: string;
}

interface AuthResponse {
  status: string;
  message: string;
  data?: any;
}

interface VerifyRequest {
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, AuthRequest>({
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
      query: ({ role, ...body }) => ({
        url: `/auth/login/${role}`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useVerifyMutation, useLoginMutation } =
  authApi;
