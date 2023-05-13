import { RootState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ArticleRequest {
  id: number;
}

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL, prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (!!token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: (builder) => ({
    createArticle: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/article/create',
        method: 'POST',
        body: payload,
      }),
    }),
    allArticle: builder.mutation<any, any>({
      query: (payload) => ({
        url: `/article/listing?userId=${payload.userId}`,
        method: 'GET',
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
      }),
    }),
    deleteArticle: builder.mutation<any, ArticleRequest>({
      query: (payload) => ({
        url: `/article/${payload.id}`,
        method: 'DELETE',
        body: payload,
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
