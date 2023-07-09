import { createApi } from '@reduxjs/toolkit/query/react';
import { TypedFormData } from '@/utils/formDataTyper';
import { wrappedBaseQuery } from '@/utils/errorResponseHandler';
import { ArticleData } from '@/app/writer-dashboard/create-article/create-article';

interface DeleteArticleRequest {
  id: number;
}

interface GetAllArticleRequest {
  userId: number
}

export interface GetAllArticleResponse {
  data: {
    id: number,
    photo_article: string,
    title: string,
    description: string,
    body: string,
    publish_date: string,
    author_id: number,
    price: string,
    pdf_url: string,
    category_id: number,
    createdAt: string,
    updatedAt: string,
    author: {
      id: number,
      email: string,
      full_name: string,
      author: string,
      photo_url: string,
      createdAt: string,
      updatedAt: string,
    }
  }[]
}

interface UpdateArticleResponse {
  status: number,
  message: string,
  data: Array<number>,
}

type PartialAny<T> = {
  // eslint-disable-next-line
  [P in keyof T]?: any
}

type Modify<T, R extends PartialAny<T>> = Omit<T, keyof R> & R

export type UpdateArticleRequest = Modify<ArticleData, UpdateArticle>

export interface UpdateArticle {
  id: number;
  title: string
  body?: string;
  description?: string;
  price?: string;
}

type TypedFormDataUpdateArticle = TypedFormData<UpdateArticleRequest>

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

interface GetRandomArticlesByAuthorResponse {
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
    author: {
      id: number,
      email: string,
      full_name: string,
      role: string,
      author: string,
      photo_url?: string,
      createdAt: string,
      updatedAt: string
    },
    category: {
      id: number,
      name: string,
      createdAt: string,
      updatedAt: string
    }
  }[];
}

export interface DetailArticleResponse {
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
    author: {
      id: number,
      email: string,
      full_name: string,
      role: string,
      author: string,
      photo_url?: string,
      createdAt: string,
      updatedAt: string
    },
    category: {
      id: number,
      name: string,
      createdAt: string,
      updatedAt: string
    }
  };
  error: null;
}

interface DeleteArticleResponse {
  status: number;
  message: string;
  data: number;
}

interface DetailArticleRequest {
  id: number;
}

export interface GetPopularArticleResponse {
  status: number;
  message: string;
  data: [
    {
      id: number;
      title: string;
      body: string;
      publish_date: string;
      author_id: number;
      photo_article: string;
      price: number;
      pdf_url: null,
      description: null,
      category_id: number;
      total_clicks: number;
      createdAt: string;
      updatedAt: string;
      author: {
        id: number;
        email: string;
        full_name: string;
        role: string;
        author: null,
        photo_url: null,
        createdAt: string;
        updatedAt: string;
      },
      category: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      }
    }
  ],
  error: null
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
    allArticle: builder.mutation<GetAllArticleResponse, GetAllArticleRequest>({
      query: (payload) => ({
        url: `/article/listing?userId=${payload.userId}`,
        method: 'GET',
      }),
    }),
    getPopularArticle: builder.query<GetPopularArticleResponse, {
      limit: number
    }>({
      query: (payload) => ({
        url: `/article/popular-article?limit=${payload.limit}`,
      }),
    }),
    getNewestArticle: builder.query<GetPopularArticleResponse, {
      limit: number
    }>({
      query: (payload) => ({
        url: `/article/newest-article?limit=${payload.limit}`,
      }),
    }),
    getArticlesByCategory: builder.query<GetPopularArticleResponse, {
      limit: number;
      categoryId: number;
    }>({
      query: (payload) => ({
        url: `/article/articles-by-category?limit=${payload.limit}&categoryId=${payload.categoryId}`,
      }),
    }),
    getDetailArticle: builder.query<
      DetailArticleResponse,
      DetailArticleRequest
    >({
      query: (payload) => ({
        url: `/article/${payload.id}`,
      }),
    }),
    updateArticle: builder.mutation<UpdateArticleResponse, TypedFormDataUpdateArticle>({
      query: (payload) => {
        const formDataObj: ArticleData & { id: string } = {
          id: '',
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
    getRandomArticleByAuthor: builder.query<GetRandomArticlesByAuthorResponse, { authorId: number; limit: number; }>({
      query: (payload) => ({
        url: `/article/random-listing?authorId=${payload.authorId}&limit=${payload.limit}`
      })
    })
  }),
});

export const {
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useAllArticleMutation,
  useUpdateArticleMutation,
  useGetDetailArticleQuery,
  useGetPopularArticleQuery,
  useGetRandomArticleByAuthorQuery,
  useGetNewestArticleQuery,
  useGetArticlesByCategoryQuery,
} = articleApi;
