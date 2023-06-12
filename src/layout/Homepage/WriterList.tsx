import React from 'react';
import { Avatar, Card, Typography } from 'antd';
import StyledButton from '@/components/Button';

export default function WriterList() {
  const { Meta } = Card;
  const Array = ['1', '2', '3', '4', '5'];
  const ButtonArray = [
    'ngoding',
    'masak dapur',
    'belanja',
    'teknologi',
    'persalinan',
  ];
  return (
    <>
      <div className="mt-16" data-testid="writerListTest">
        <Typography.Title className="text-30px text-secondary-color">
          Daftar Penulis
        </Typography.Title>
        <div className="flex flex-wrap gap-6">
          {Array.map((list: any) => (
            <div
              key={list}
              className="grid p-3 border border-solid w-80 border-primary-color rounded-radius-10px"
            >
              <Meta avatar={<Avatar src="" />} title="Ahmad Munasir" />
              <div className="flex flex-wrap gap-2 mt-3">
                {ButtonArray.map((buttonList, index) => (
                  <StyledButton
                    key={index}
                    type="default"
                    label={buttonList}
                    className="self-center w-auto px-2"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
