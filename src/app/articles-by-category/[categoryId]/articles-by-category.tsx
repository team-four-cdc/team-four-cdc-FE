"use client"
import React from 'react'
import Heads from '@/layout/Head/Head'
import BaseLayout from '@/layout/Head/Writer/BaseLayout'
import { useGetArticlesByCategoryQuery } from '@/services'
import { Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { capitalize } from '@/utils'

interface Props {
  categoryId: number;
}

export default function ArticlesByCategoryid({ categoryId }: Props) {
  const {
    data,
  } = useGetArticlesByCategoryQuery({ limit: 15, categoryId })

  const articles = data?.data

  return (
    <>
      <Heads title="Artikel Dengan Kategori" showNavbar showWrappOption />
      <BaseLayout>
        <div className="grid grid-cols-2 gap-2 justify-center px-4 w-full">
          {articles?.map((list, index) => {
            return <Link key={`articles-by-category-${index}`} href={`/detail-artikel/${list.id}`} className="border border-2 group border-[#DDD] border-solid px-4 py-2 rounded-lg mt-20 flex justify-start items-center gap-2 hover:bg-success-color">
              <Image width={200} height={200} className="object-contain" src="/image-preview.png" alt="Preview Artikel" />
              <div className="flex flex-col">
                <Typography.Title className="group-hover:text-white">{capitalize(list.title || list.description || '')}</Typography.Title>
                <Typography.Text className="group-hover:text-white">{list.author.full_name || list.author.author || ''}</Typography.Text>
              </div>
            </Link>
          })}
        </div>
      </BaseLayout>
    </>
  )
}
