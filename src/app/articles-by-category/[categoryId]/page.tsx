import React from 'react'
import Articles from './articles-by-category'

export default async function Page({ params: { categoryId } }: { params: { categoryId: number } }) {
  return <Articles categoryId={categoryId} />
}

