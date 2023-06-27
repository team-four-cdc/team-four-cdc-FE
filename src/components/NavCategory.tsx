import React from 'react'
import { Typography } from 'antd';
import Link from 'next/link';

interface Props {
  href: string;
  text: string;
  // icon?: React.ReactNode;
}

const NavCategory = (props: Props) => {
  const { href, text } = props;

  return (
    <Link href={href} legacyBehavior>
      <div className='inline-block group'>
        <div className="w-fit rounded-radius-10px p-20px shadow-secondary-box-shadow group-hover:bg-success-color">
          <div
            className={'border-0 border-b border-solid min-w-150px pb-10px border-secondary-color group-hover:border-white'}
          >
            <div className="flex items-center justify-center space-x-10px ">
              {/*isOther && Icon && (
                <Icon className="flex items-center group-hover:text-white" />
              )*/}
              <Typography.Text className="text-secondary-color group-hover:text-white">
                {text}
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NavCategory;
