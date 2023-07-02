import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import CardArticlePreview from '@/components/CardArticlePreview';
import { GetPopularArticleResponse, useGetPopularArticleMutation } from '@/services';
import { dateFormat } from '@/utils';

export default function NewArticleList() {
  const [getArticle] = useGetPopularArticleMutation()
  const [data, setData] = useState<GetPopularArticleResponse['data']>()

  async function getData() {
    try {
      await getArticle({ limit: 10 }).unwrap().then(dataRaw => {
        setData(dataRaw.data)
      })
    } catch (err) {
      console.log((err as Error).message)
    }
  }

  useEffect(() => {

    getData()
    return () => {

    }
  }, [])

  return (
    <>
      <div className="mt-16" data-testid="newsArticleTest">
        <Typography.Title className="text-30px text-secondary-color">
          Artikel Terbaru
        </Typography.Title>
        <div className="grid grid-cols-2 gap-4">
          {data?.map((list, index) => (
            <div key={`popular-article-list-${index}`} className="">
              <CardArticlePreview
                // TODO: fix this
                creator={'Ahmad Dhani'}
                date={dateFormat(list.publish_date)}
                preview={list.description || list.title || ''}
                avatar=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
