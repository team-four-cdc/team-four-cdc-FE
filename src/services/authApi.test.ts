import fetchMock from 'jest-fetch-mock';
import { authApi } from '@/services';
import { store } from '@/store';

describe('Registration API', () => {
  const successPayload = {
    email: 'test@gmail.com',
    password: 'testtest',
    role: 'reader',
    author: 'author',
    fullName: 'fullname',
  };

  const errorPayload = {
    email: 'test@gmail.com',
    password: 'testtest',
    role: '',
    author: '',
    fullName: '',
  };

  test('request is correct', () => {
    fetchMock.mockResponse(JSON.stringify({}));
    return store
      .dispatch(authApi.endpoints.register.initiate(successPayload))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0] as Request;
        expect(method).toBe('POST');
        expect(url).toBe(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`);
      });
  });

  test('successful response', () => {
    const response = { status: 'fulfilled', message: 'success' };
    fetchMock.mockResponse(JSON.stringify(response));
    return store
      .dispatch(authApi.endpoints.register.initiate(successPayload))
      .then((action: any) => {
        const { data } = action;
        expect(data.status).toBe('fulfilled');
        expect(data.message).toBe('success');
        expect(data).toStrictEqual(response);
      });
  });

  test('unsuccessful response', () => {
    fetchMock.mockReject(new Error('Internal Server Error'));
    return store
      .dispatch(authApi.endpoints.register.initiate(errorPayload))
      .then((action: any) => {
        const { error } = action;
        expect(error.error).toBe('Error: Internal Server Error');
      });
  });
});

describe('Verify API', () => {
  const successPayload = {
    token: 'token',
  };

  const errorPayload = {
    token: '',
  };

  test('request is correct', () => {
    fetchMock.mockResponse(JSON.stringify({}));
    return store
      .dispatch(authApi.endpoints.verify.initiate(successPayload))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0] as Request;
        expect(method).toBe('POST');
        expect(url).toBe(`${process.env.NEXT_PUBLIC_BASE_URL}/user/verify`);
      });
  });

  test('successful response', () => {
    const response = { status: 'fulfilled', message: 'success' };
    fetchMock.mockResponse(JSON.stringify(response));
    return store
      .dispatch(authApi.endpoints.verify.initiate(successPayload))
      .then((action: any) => {
        const { data } = action;
        expect(data.status).toBe('fulfilled');
        expect(data.message).toBe('success');
        expect(data).toStrictEqual(response);
      });
  });

  test('unsuccessful response', () => {
    fetchMock.mockReject(new Error('Internal Server Error'));
    return store
      .dispatch(authApi.endpoints.verify.initiate(errorPayload))
      .then((action: any) => {
        const { error } = action;
        expect(error.error).toBe('Error: Internal Server Error');
      });
  });
});

describe('Login API', () => {
  const successPayload = {
    email: 'test@gmail.com',
    password: 'testtest',
    role: 'reader',
  };

  const errorPayload = {
    email: 'test@gmail.com',
    password: 'testtest',
    role: '',
  };

  test('request is correct', () => {
    fetchMock.mockResponse(JSON.stringify({}));
    return store
      .dispatch(authApi.endpoints.login.initiate(successPayload))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0] as Request;
        expect(method).toBe('POST');
        expect(url).toBe(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/${successPayload.role}`
        );
      });
  });

  test('successful response', () => {
    const response = { status: 'fulfilled', message: 'success' };
    fetchMock.mockResponse(JSON.stringify(response));
    return store
      .dispatch(authApi.endpoints.login.initiate(successPayload))
      .then((action: any) => {
        const { data } = action;
        expect(data.status).toBe('fulfilled');
        expect(data.message).toBe('success');
        expect(data).toStrictEqual(response);
      });
  });

  test('unsuccessful response', () => {
    fetchMock.mockReject(new Error('Internal Server Error'));
    return store
      .dispatch(authApi.endpoints.login.initiate(errorPayload))
      .then((action: any) => {
        const { error } = action;
        expect(error.error).toBe('Error: Internal Server Error');
      });
  });
});
