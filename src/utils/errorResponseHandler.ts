import { RootState } from "@/store";
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export class ErrorResponse {
  constructor(public message: string, public status: number) { }
}

export class DbConcurrencyError implements ErrorResponse {
  constructor(public message: string, public status: number) { }
}

export class InternalServerError implements ErrorResponse {
  constructor(public message: string, public status: number) { }
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

export const wrappedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result.error) {
    if (result.error.status === 403) {
      return {
        ...result,
        error: new ErrorResponse('Anda tidak memiliki akses!', result.error.status) as unknown as FetchBaseQueryError
      }
    }
    if (result.error.status === 404) {
      return {
        ...result,
        error: new ErrorResponse('Tidak ditemukan!', result.error.status) as unknown as FetchBaseQueryError
      }
    }
    if (result.error.status === 401) {
      return {
        ...result,
        error: new ErrorResponse('User atau Password salah!', result.error.status) as unknown as FetchBaseQueryError
      }
    }
    if (result.error.status === 400) {
      return {
        ...result,
        error: new ErrorResponse('User Tidak ditemukan!', result.error.status) as unknown as FetchBaseQueryError
      }
    }
    if (result.error.status === 500) {
      return {
        ...result,
        error: new ErrorResponse('Kesalahan pada database!', result.error.status) as unknown as FetchBaseQueryError
      }
    }
  }
  return result
}

