import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { store } from "@/store"

function generateHeaders(token: string | null = store.getState().auth.token) {
  return {
    'Authorization': `Bearer ${token}`
  }
}

const headers = generateHeaders()

interface ArticleRequest {
  id: number;
}

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    createArticle: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/article/create',
        method: 'POST',
        body: payload,
        headers
      }),
    }),
    allArticle: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/article/listing?userId=${payload.userId}`,
        method: 'GET',
        headers
      }),
    }),
    // get: builder.mutation<AuthResponse, AuthRequest>({
    // query: ({ role, ...body }) => ({
    // url: `/auth/login/${role}`,
    // method: 'POST',
    // body,
    // }),
    // }),
    updateArticle: builder.mutation<
      any,
      any
    >({
      query: (payload) => ({
        url: `/article/${payload.id}`,
        method: 'PUT',
        body: payload,
        headers
      }),
    }),
    deleteArticle: builder.mutation<any, ArticleRequest>({
      query: (payload) => ({
        url: `/article/${payload.id}`,
        method: 'DELETE',
        body: payload,
        headers
      }),
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useAllArticleMutation,
  useUpdateArticleMutation,
} = articleApi;
