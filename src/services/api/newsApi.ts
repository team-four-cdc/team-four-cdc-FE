import { axios } from '@/services/config';

export const getNewsApi = async () => {
  return await axios.get('/news').then((res) => {
    return res?.data;
  });
};
