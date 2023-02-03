import Heads from '@/PagesSection/Head/Head';
import { Typography } from 'antd';

export default function Home() {
  return (
    <>
      <Heads title="BacaAku" />
      <main>
        <div className="flex h-screen w">
          <div className="m-auto">
            <Typography.Title
              level={2}
              className="!font-semibold !text-success-color"
            >
              Team Four - CDC
            </Typography.Title>
          </div>
        </div>
      </main>
    </>
  );
}
