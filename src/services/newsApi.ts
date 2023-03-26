import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface NewsResponse {
  news: any;
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, void>({
      query: () => '/news',
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
