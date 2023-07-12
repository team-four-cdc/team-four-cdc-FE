"use client"
import React from "react";
import StyledButton from "@/components/Button";
import Heads from "@/layout/Head/Head";
import { Typography } from "antd";
import Image from "next/image";
import { useGetDetailArticleQuery } from "@/services";
import { capitalize, dateFormat, formatCurrency } from "@/utils";
import { AuthorSection } from "@/components/AuthorSection";
import BaseLayout from "@/layout/Head/Writer/BaseLayout";
import { EyeOutlined } from "@ant-design/icons";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

interface Props {
  id: number;
}

export default function ArticleDetail({ id }: Props) {
  const {
    data,
  } = useGetDetailArticleQuery({ id })

  const article = data?.data

  const isOwned = !article?.body.includes('notOwned')

  return (
    <>
      <Heads title="Detail Artikel" showNavbar={true} showWrappOption={true} />
      <BaseLayout>
        <div className="grid grid-cols-5 gap-4 w-full">
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
                <div dangerouslySetInnerHTML={{ __html: (!isOwned ? article?.body.replace('notOwned', '') : article?.body) || "" }} />
                {!isOwned ?
                  <>
                    <div className="mt-10 text-center">
                      <Typography.Text className="text-20px !text-secondary-color font-bold">
                        Harga {formatCurrency({ value: article?.price || 0 })}
                      </Typography.Text>
                    </div>
                    <div className="mt-4">
                      <StyledButton
                        label="Untuk Lihat lebih detail, ayo beli artikel ini"
                        type="default"
                        size="large"
                        block
                        icon={<EyeOutlined />}
                      />
                    </div>
                  </>
                  : null}

              </div>
            </div>
          </section>
          <section className="col-span-2 mt-10 mx-4">
            <AuthorSection id={article?.id || 0} authorId={article?.author.id || 0} authorName={article?.author.full_name || article?.author.author || ''} />
          </section>
        </div>
      </BaseLayout>
    </>
  )
}

