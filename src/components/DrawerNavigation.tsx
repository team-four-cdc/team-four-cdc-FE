import { Typography } from 'antd';
import router from 'next/router';
import React from 'react';
import StyledButton from './Button';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { resetAuth } from '@/store/auth/authSlice';

interface Item {
  id: number;
  label: string;
  url: string;
}

interface Props {
  items: Item[];
}

const ItemList: React.FC<Props> = ({ items }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="h-full text-center bg-monocrom-color">
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
              className={classNames('border-none text-14px', {
                'bg-success-color text-white': router.asPath == item.url,
              })}
              onClick={
                item.id == 5
                  ? () => dispatch(resetAuth())
                  : () => router.push(item.url)
              }
            />
          </div>
        ))}
        <div className="h-5" />
      </div>
    </div>
  );
};

export default ItemList;
