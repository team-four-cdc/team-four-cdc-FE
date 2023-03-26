import Heads from '@/layout/Head/Head';
import { Typography } from 'antd';

export default function Home() {
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
