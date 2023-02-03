import Heads from '@/PagesSection/Head/Head';
import { AppDispatch, RootState } from '@/store';
import { getNews } from '@/store/news/newsSlice';
import { Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { news } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    console.log('news: ', news);
  }, [news]);

  return (
    <>
      <Heads title="BacaAku" />
      <main>
        <div className="flex h-screen w">
          <div className="m-auto">
            <Typography.Title
              level={2}
              className="font-semibold text-success-color"
            >
              Team Four - CDC
            </Typography.Title>
          </div>
        </div>
      </main>
    </>
  );
}
