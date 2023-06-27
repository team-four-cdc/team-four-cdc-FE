import { Typography } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import StyledButton from './Button';
import { resetAuth } from '@/store/auth/authSlice';
import axios from 'axios';

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
  const router = useRouter()
  const pathname = usePathname()
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
                'bg-success-color text-white': pathname == item.url,
              })}
              onClick={
                item.id == 5
                  ? async () => {
                    dispatch(resetAuth());
                    await axios('/api/logout');
                    // TODO: temporary solution
                    router.refresh()
                  }
                  : () => router.push(item.url, item.url)
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
