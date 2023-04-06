import { Typography } from 'antd';
import router from 'next/router';
import React from 'react';
import StyledButton from './Button';

interface Item {
  id: number;
  label: string;
  url: string;
}

interface Props {
  items: Item[];
}

const ItemList: React.FC<Props> = ({ items }) => {
  return (
    <div>
      <div className="text-center">
        <div className="mb-30px">
          <Typography.Text className="text-20px !text-secondary-color">
            Menu
          </Typography.Text>
        </div>
        {items.map((item) => (
          <div key={item.id} className="px-4 mb-30px">
            <StyledButton
              label={item.label}
              type="default"
              size="large"
              block
              round="rounded"
              active="active:bg-green-700 active:text-white"
              onClick={() => router.push(item.url)}
            />
          </div>
        ))}
        <div className="h-5" />
      </div>
    </div>
  );
};

export default ItemList;
