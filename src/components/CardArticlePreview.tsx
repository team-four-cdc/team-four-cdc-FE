import {
  Avatar, Card, CardProps, Typography,
} from 'antd';
import Link from 'next/link';
import React from 'react';

interface StandardCardProps extends CardProps {
  creator: string;
  preview: string;
  date: string;
  avatar: string;
  articleId: number;
}

const { Meta } = Card;

export default function CardArticlePreview(
  props: StandardCardProps,
): JSX.Element {
  return (
    <Link href={`/detail-artikel/${props.articleId}`}>
      <Card
        {...props}
        className="flex flex-row bg-monocrom-color shadow-primary-box-shadow rounded-radius-10px"
      >
        <Meta avatar={<Avatar src={props.avatar} />} title={props.creator} />
        <div className="display-block pt-20px">
          <Typography.Text className="text-18px !text-primary-color font-medium">
            {props.preview}
          </Typography.Text>
        </div>
        <div>
          <Typography.Text className="text-12px !text-secondary-color">
            {props.date}
          </Typography.Text>
        </div>
      </Card>
    </Link>
  );
}
