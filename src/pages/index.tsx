import Heads from '@/layout/Head/Head';
import { useGetNewsQuery } from '@/services';
import { Typography } from 'antd';
import { useEffect } from 'react';

export default function Home() {
  const { data, isLoading, error } = useGetNewsQuery();

  useEffect(() => {
    console.log(data);
    console.log(isLoading);
    console.log(error);
  }, [data, error, isLoading]);

  return (
    <>
      <Heads showNavbar={true} title="BacaAku" />
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
