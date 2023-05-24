import { RootState } from '@/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface DeleteArticleRequest {
  id: number;
}

interface CreateArticleResponse {
  status: number;
  message: string;
  data: {
    id: number;
    title: string;
    body: string;
    publish_date: string;
    author_id: number;
    photo_article: string;
    price: number;
    category_id: number;
    updatedAt: string;
    createdAt: string;
    pdf_url: string;
    description: string;
  };
}

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (!!token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    createArticle: builder.mutation<CreateArticleResponse, any>({
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
    updateArticle: builder.mutation<any, any>({
      query: (payload) => {
        const formDataObj: any = {};
        payload.forEach((value: any, key: any) => (formDataObj[key] = value));

        return {
          url: `/article/${formDataObj.id}`,
          method: 'PUT',
          body: payload,
        };
      },
    }),
    deleteArticle: builder.mutation<any, DeleteArticleRequest>({
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
