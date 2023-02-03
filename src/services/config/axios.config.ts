import { getToken } from '@/utils';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL,
  headers: {
    ContentType: 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken() && `Bearer ${getToken()}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
