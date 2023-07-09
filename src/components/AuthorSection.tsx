import { useGetRandomArticleByAuthorQuery } from '@/services';
import { dateFormat } from '@/utils';
import { Divider } from 'antd';
import Link from 'next/link';
import React from 'react'

interface Props {
  authorId: number;
  authorName: string;
  id: number;
}

export const AuthorSection = ({ authorName, authorId, id }: Props) => {
  const {
    data,
  } = useGetRandomArticleByAuthorQuery({ authorId, limit: 5, })

  return (
    <>
      <span className="flex items-center gap-2 ml-4">
        <div className="w-[40px] h-[40px] rounded-full bg-[#DDD]" />
        {authorName}
      </span>
      <Divider className="border-[#DDD]" />
      <div className='grid grid-rows-5 gap-4'>
        {data?.data.map((article, index) => {
          if (article.id !== id) {
            return <Link href={`/detail-artikel/${article.id}`} key={`random-articles-by-author-${index}`} className='px-2 py-4 bg-[#DDD] rounded-lg cursor-pointer'>
              <span className='flex items-center gap-4'>
                <div className='w-[40px] h-[40px] rounded-full bg-black' />
                {article.author.author}
              </span>

              <div className='mt-10'>
                <section dangerouslySetInnerHTML={{ __html: article.body }} />
              </div>

              <span className='mt-20'>{dateFormat(article.updatedAt)}</span>
            </Link>
          }
          return null
        })}
      </div>
    </>
  )
}
