import NavCategory from '@/components/NavCategory';
import { Typography } from 'antd';

export default function CategoryList() {
  const Array = ['1', '2', '3', '4', '5'];
  return (
    <>
      <div className="mt-5" data-testid="categoryListTest">
        <Typography.Title className="text-30px text-secondary-color">
          Kategori Artikel
        </Typography.Title>
        <div className="flex flex-wrap justify-center gap-8">
          {Array.map((list: any) => (
            <NavCategory key={list} text="Tes artikel" href="/" />
          ))}
        </div>
      </div>
    </>
  );
}
