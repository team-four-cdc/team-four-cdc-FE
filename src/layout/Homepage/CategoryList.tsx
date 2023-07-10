import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import NavCategory from '@/components/NavCategory';
import {
  GetCategoriesResponse,
  useGetCategoriesMutation,
} from '@/services/categories';
import { capitalize } from '@/utils';

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

  useEffect(() => {
    getData();

    return () => { };
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
              href={`/kategori-artikel/${list.id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
