import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArticleData } from '@/pages/writer-dashboard/create-article';
import { RootState } from '@/store';
import { TypedFormData } from '@/utils/formDataTyper';
import { ErrorResponse } from '@/utils/errorResponseHandler';

interface DeleteArticleRequest {
  id: number;
}

interface UpdateArticleResponse {
  status: number,
  message: string,
  data: Array<number>,
}

export interface UpdateArticleRequest extends TypedFormData<ArticleData> {
  id: number;
  title: string
  body?: string;
  description?: string;
  price?: string;
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

interface DetailArticleResponse {
  status: number;
  message: string;
  data: {
    id: number;
    title: string;
    body: string;
    publish_date: string;
    author_id: number;
    photo_article?: string;
    price: number;
    pdf_url?: string;
    description: string;
    category_id: number;
    total_clicks: number;
    createdAt: string;
    updatedAt: string;
  };
}

interface DeleteArticleResponse {
  status: number;
  message: string;
  data: number;
}

interface DetailArticleRequest {
  id: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
})

const wrappedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 403) {
    return Promise.reject(new ErrorResponse('Anda tidak memiliki akses!', result.error.status));
  }
  if (result.error && result.error.status === 404) {
    return Promise.reject(new ErrorResponse('Tidak ditemukan!', result.error.status));
  }
  if (result.error && result.error.status === 401) {
    return Promise.reject(new ErrorResponse('Anda belum melakukan login!', result.error.status));
  }
  return result
}

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: wrappedBaseQuery,
  endpoints: (builder) => ({
    createArticle: builder.mutation<CreateArticleResponse, TypedFormData<ArticleData>>({
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
    getDetailArticle: builder.mutation<
      DetailArticleResponse,
      DetailArticleRequest
    >({
      query: (payload) => ({
        url: `/api/article/${payload.id}`,
        method: 'POST',
      }),
    }),
    updateArticle: builder.mutation<UpdateArticleResponse, UpdateArticleRequest>({
      query: (payload) => {
        const formDataObj: ArticleData = {
          body: '',
          price: '',
          title: '',
          picture: new File([], 'sample'),
          authorId: '',
          categoryId: '',
          description: '',
        };
        payload.forEach((value, key) => (formDataObj[key] = value));

        return {
          url: `/article/${formDataObj.id}`,
          method: 'PUT',
          body: payload,
        };
      },
    }),
    deleteArticle: builder.mutation<DeleteArticleResponse, DeleteArticleRequest>({
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
