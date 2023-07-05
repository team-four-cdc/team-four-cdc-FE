import { ErrorResponse, DbConcurrencyError } from './errorResponseHandler'

async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config)
  const response = await fetch(request)

  if (!response.ok) {
    if (response.status === 400) {
      throw new ErrorResponse('User Tidak ditemukan!', response.status)
    }
    if (response.status === 401) {
      throw new ErrorResponse('User atau Password salah!', response.status)
    }
    if (response.status === 403) {
      throw new ErrorResponse('Anda tidak memiliki akses!', response.status)
    }
    if (response.status === 404) {
      throw new ErrorResponse('Tidak ditemukan!', response.status)
    }
    if (response.status === 500) {
      throw new DbConcurrencyError('Kesalahan pada database!', response.status)
    }
  }

  // may error if there is no body, return empty array
  return response.json().catch(() => ({}))
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: 'get', ...config }
  return await http<T>(path, init)
}

export async function post<T, U>(
  path: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = { method: 'post', body: JSON.stringify(body), ...config }
  return await http<U>(path, init)
}

export async function put<T, U>(
  path: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = { method: 'put', body: JSON.stringify(body), ...config }
  return await http<U>(path, init)
}
