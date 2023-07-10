import React from 'react';
import { Typography } from 'antd';
import CardArticlePreview from '@/components/CardArticlePreview';
import { useGetPopularArticleQuery } from '@/services';
import { dateFormat } from '@/utils';

export default function PopularArticleList() {

  const {
    data,
  } = useGetPopularArticleQuery({ limit: 5, })

  const articles = data?.data

  return (
    <>
      <div className="mt-16" data-testid="newsArticleTest">
        <Typography.Title className="text-30px text-secondary-color">
          Artikel Populer
        </Typography.Title>
        <div className="grid grid-cols-2 gap-4">
          {articles?.map((list, index) => (
            <div key={`popular-article-list-${index}`} className="">
              <CardArticlePreview
                articleId={list.id}
                creator={list.author.full_name || ''}
                date={dateFormat(list.publish_date)}
                preview={list.title || list.description || ''}
                avatar=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
