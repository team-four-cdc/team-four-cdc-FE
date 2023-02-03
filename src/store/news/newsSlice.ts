import { getNewsApi } from '@/services/api/newsApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface NewsState {
  isLoading: boolean;
  isFailed: boolean;
  news: any;
}

export const initialState: NewsState = {
  isLoading: false,
  isFailed: false,
  news: [],
};

export const getNews = createAsyncThunk(
  'news/getAll',
  async (_, { rejectWithValue }) => {
    return await getNewsApi()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isFailed = false;
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state) => {
        state.isLoading = false;
        state.isFailed = true;
        state.news = initialState.news;
      });
  },
});

export default newsSlice.reducer;
