import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

export interface NewsResponse {
  // eslint-disable-next-line
  news: any;
}

export interface DashboardRequest {
  userId: number;
}

export interface DashboardResponseTransactions {
  sales: string;
  value: string;
  Article: {
    id: number;
    title: string;
    body: string;
    publish_date: string;
    author_id: number;
    photo_article: string;
    price: number;
    pdf_url: string;
    description: string;
    category_id: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface DashboardResponseAuthor {
  id: number;
  email: string;
  full_name: string;
  role: string;
  author: string;
  photo_url: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardResponseTopArticles {
  id: number;
  title: string;
  body: string;
  publish_date: string;
  author_id: number;
  photo_article: string;
  price: number;
  pdf_url: string;
  description: string;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  author: Array<DashboardResponseAuthor>;
}

export interface DashboardResponseData {
  topArticles: Array<DashboardResponseTopArticles>;
  transactions: Array<DashboardResponseTransactions>;
}
export interface DashboardResponse {
  status: number;
  message: string;
  data: DashboardResponseData;
}

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, void>({
      query: () => '/news',
    }),
    getDashboard: builder.mutation<DashboardResponse, DashboardRequest>({
      query: (payload) => ({
        url: `/article/dashboard?userId=${payload.userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetNewsQuery, useGetDashboardMutation } = newsApi;
