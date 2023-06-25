import React from 'react'
import { Typography } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';

interface Props {
  href: string;
  text: string;
  icon?: React.ReactNode;
}

const NavCategory = (props: Props) => {
  const { href, text, icon } = props;
  const Icon = icon;
  const isOther = !!icon;

  return (
    <Link href={href} className="inline-block group/category" legacyBehavior>
      <div className="w-fit rounded-radius-10px p-20px shadow-secondary-box-shadow group-hover/category:bg-success-color">
        <div
          className={classNames({
            'border-0 border-b border-solid min-w-150px pb-10px border-secondary-color group-hover/category:border-white':
              !isOther,
          })}
        >
          <div className="flex items-center justify-center space-x-10px ">
            {isOther && Icon && (
              <Icon className="flex items-center group-hover/category:text-white" />
            )}
            <Typography.Text className="text-secondary-color group-hover/category:text-white">
              {text}
            </Typography.Text>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NavCategory;
