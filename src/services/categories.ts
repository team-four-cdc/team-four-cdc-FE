import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store';

export interface GetCategoriesResponse {
  status: number,
  message: string,
  data: Array<{
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
  }>
}

interface CreateCategoryRequest {
  name: string
}

interface CreateCategoryResponse {
  status: number,
  message: string,
  data: {
    id: number,
    name: string,
    updatedAt: string,
    createdAt: string
  },
}

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.mutation<GetCategoriesResponse, void>({
      query: () => ({
        url: '/category/listing',
        method: 'GET',
      }),
    }),
    createCategory: builder.mutation<CreateCategoryResponse, CreateCategoryRequest>({
      query: (payload) => ({
        url: '/user/register',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useGetCategoriesMutation, useCreateCategoryMutation } = categoriesApi;
