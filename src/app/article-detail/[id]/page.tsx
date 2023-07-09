import React from 'react'
import DetailArticle from './article-detail'

export default async function Page({ params: { id } }: { params: { id: number } }) {
  return <DetailArticle id={id} />
}

