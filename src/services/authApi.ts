import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

interface AuthRequest {
  role: string;
  email: string;
  password: string;
  author?: string;
  full_name?: string;
}

interface ForgotPasswordRequest {
  role: string;
  email: string;
}

interface ForgotPasswordResponse {
  status: number
  message: string
  data: null
  error: null
}

interface RegisterResponse {
  status: string;
  message: string;
  data?: null;
}

interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string
  }
  error: null
}

interface ChangePasswordRequest {
  newPassword: string;
  resetPasswordToken: string;
}

interface VerifyResponse {
  status: number
  message: string
  data: null
  error: null
}

interface ChangePasswordResponse {
  status: string;
  message: string;
  data?: null;
}

interface VerifyRequest {
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, AuthRequest>({
      query: (payload) => ({
        url: '/user/register',
        method: 'POST',
        body: payload,
      }),
    }),
    verify: builder.mutation<VerifyResponse, VerifyRequest>({
      query: (payload) => ({
        url: '/user/verify',
        method: 'POST',
        body: payload,
      }),
    }),
    login: builder.mutation<LoginResponse, AuthRequest>({
      query: ({ role, ...body }) => ({
        url: `/auth/login/${role}`,
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (payload) => ({
        url: `/auth/send-email/${payload.role}`,
        method: 'POST',
        body: payload,
      }),
    }),
    ubahPass: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (payload) => ({
        url: '/auth/reset-password',
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useUbahPassMutation,
} = authApi;
