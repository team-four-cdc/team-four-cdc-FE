import React, { Suspense } from 'react'
import DetailArticle from './article-detail'

async function getDetailArticle(id: number) {
  try {
    const res = await fetch(`http://0.0.0.0:5000/api/article/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1YmlzMkB5b3BtYWlsLmNvbSIsInJvbGUiOiJyZWFkZXIiLCJ1c2VySWQiOjIsImlhdCI6MTY4ODQ0NTUxNywiZXhwIjoxNjg4NTMxOTE3fQ.hbIGkJuLkZUyNYnKvnRXSLKCRATcwFDdUYQ1dSpVZUk`
      }
    })
    return res.json()
  } catch (e: any) {
    return e
  }
}

export default async function Page({ params: { id } }: { params: { id: number } }) {
  const data = await getDetailArticle(id)
  return (
    <>
      <Suspense fallback={<div>Loading . . .</div>}>
        <DetailArticle data={data} />
      </Suspense>
    </>
  )
}

