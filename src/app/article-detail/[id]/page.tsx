import { DetailArticleResponse } from '@/services'
import { getRequestCookie } from '@/utils'
import * as fetchWrapper from '@/utils/fetchWrapper'
import React, { Suspense } from 'react'
import DetailArticle from './article-detail'
import { cookies } from 'next/headers'
import { sessionOptions } from '@/data/sessionOptions'
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { unsealData } from 'iron-session'

async function getDetailArticle(id: number) {
  return {
    status: 0,
    message: '',
    data: {
      id: 0,
      title: '',
      body: '',
      publish_date: '',
      author_id: 0,
      photo_article: '',
      price: 0,
      pdf_url: '',
      description: '',
      category_id: 0,
      total_clicks: 0,
      createdAt: '',
      updatedAt: '',
    },
    error: null
  }
}

export default async function Page({ params: { id } }: { params: { id: number } }) {
  const data = await getDetailArticle(id)
  const myCookies = await fetch('http://localhost:3000/api/user')
  console.log('aku disini', myCookies)

  return (
    <>
      <Suspense fallback={<div>Loading . . .</div>}>
        <DetailArticle data={data} />
      </Suspense>
    </>
  )
}

