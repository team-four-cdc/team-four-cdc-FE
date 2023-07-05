"use client"
import React, { useEffect, useState } from "react";
import StyledButton from "@/components/Button";
import Heads from "@/layout/Head/Head";
import { Divider, Typography } from "antd";
import Image from "next/image";
import { DetailArticleResponse } from "@/services";
import { dateFormat } from "@/utils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export default function ArticleDetail({ data }: { data?: DetailArticleResponse }) {
  const article = data?.data

  console.log('aku disana', data)

  return (
    <>
      <Heads title="Detail Artikel" showNavbar={true} showWrappOption={true} />
      <div className="grid grid-cols-5 gap-4">
        <section className="p-4 col-span-3">
          <div className="flex flex-wrap gap-2">
            <StyledButton
              type="default"
              size="small"
              // TODO: set this dynamically
              label="Teknologi"
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
          <span className="flex items-center gap-2 ml-4">
            <div className="w-[40px] h-[40px] rounded-full bg-[#DDD]" />
            {article?.author_id}
          </span>
          {/*<div className="flex flex-wrap mt-6 gap-2 mx-2">
            <StyledButton
              type="default"
              size="small"
              // TODO: set this dynamically
              label="Teknologi"
              className="self-center px-2 rounded-full"
              round="true"
            /><StyledButton
              type="default"
              size="small"
              // TODO: set this dynamically
              label="Teknologi"
              className="self-center px-2 rounded-full"
              round="true"
            /><StyledButton
              type="default"
              size="small"
              // TODO: set this dynamically
              label="Teknologi"
              className="self-center px-2 rounded-full"
              round="true"
            /><StyledButton
              type="default"
              size="small"
              // TODO: set this dynamically
              label="Teknologi"
              className="self-center px-2 rounded-full"
              round="true"
            />
          </div>*/}
          <Divider className="border-[#DDD]" />
        </section>
      </div>
    </>
  )
}

