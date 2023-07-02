"use client"
import React, { useEffect, useState } from "react";
import StyledButton from "@/components/Button";
import Heads from "@/layout/Head/Head";
import { Typography } from "antd";
import Image from "next/image";
import { DetailArticleResponse, useGetDetailArticleMutation } from "@/services";
import { useParams } from "next/navigation";
import { capitalize, dateFormat } from "@/utils";
import { AuthorSection } from "@/components/AuthorSection";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export default function ArticleDetail() {
  const [getArticleDetail] = useGetDetailArticleMutation()
  const [article, setArticle] = useState<DetailArticleResponse['data']>();
  const params = useParams() as unknown as { id: number }

  async function getArticle(id: number) {
    getArticleDetail({ id }).unwrap().then((data) => {
      setArticle(data.data)
    })
  }

  useEffect(() => {
    getArticle(params.id)

    return () => {

    }
  }, [])

  return (
    <>
      <Heads title="Detail Artikel" showNavbar={true} showWrappOption={true} />
      <div className="grid grid-cols-5 gap-4">
        <section className="p-4 col-span-3">
          <div className="flex flex-wrap gap-2">
            <StyledButton
              type="default"
              size="small"
              label={capitalize(article?.category.name || '')}
              className="self-center px-2 rounded-full"
              round="true"
            />
          </div>
          <div className="grid gap-3 grid-cols-13">
            <div className="col-start-1 col-end-10">
              <div className="display-block pt-20px">
                <Typography.Text className="text-18px !text-primary-color font-medium">
                  {article?.title}
                </Typography.Text>
              </div>
              <div className="mb-11">
                <Typography.Text className="text-12px !text-secondary-color">
                  {dateFormat(article?.publish_date || '')}
                </Typography.Text>
              </div>
              <Image
                src={`${baseUrl}/media/${article?.photo_article || ''}`}
                alt="Photo Artikel"
                width={100}
                height={100}
                layout="responsive"
                className="mb-10 object-contain"
              />
              <div dangerouslySetInnerHTML={{ __html: article?.body || '' }} />
            </div>
          </div>
        </section>
        <section className="col-span-2 mt-10 mx-4">
          <AuthorSection authorId={article?.author.id || 0} authorName={article?.author.author || ''} />
        </section>
      </div>
    </>
  )
}

