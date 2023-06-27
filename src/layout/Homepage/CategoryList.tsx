import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import NavCategory from '@/components/NavCategory';
import {
  GetCategoriesResponse,
  useGetCategoriesMutation,
} from '@/services/categories';

export default function CategoryList() {
  const [data, setData] = useState<GetCategoriesResponse['data']>();
  const [getCategories] = useGetCategoriesMutation();

  async function getData() {
    try {
      await getCategories()
        .unwrap()
        .then((dataRaw) => {
          setData(dataRaw.data);
        });
    } catch (err) {
      console.log((err as Error).message);
    }
  }

  function capitalize(str: string) {
    const arr = str.split(' ');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(' ');
  }

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  return (
    <>
      <div className="mt-5" data-testid="categoryListTest">
        <Typography.Title className="text-30px text-secondary-color">
          Kategori Artikel
        </Typography.Title>
        <div className="flex flex-wrap gap-8">
          {data?.map((list, index) => (
            <NavCategory
              key={`category-index-${index}`}
              text={capitalize(list.name)}
              href="/"
            />
          ))}
        </div>
      </div>
    </>
  );
}
