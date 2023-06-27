"use client"
import React from 'react';
import Image from 'next/legacy/image';
import { Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { EyeOutlined } from '@ant-design/icons';
import StyledButton from '@/components/Button';
import CardArticlePreview from '@/components/CardArticlePreview';
import Heads from '@/layout/Head/Head';

export default function ArticleDetails() {
  return (
    <>
      <Heads title="Detail Artikel" showNavbar={true} showWrappOption={true} />
      <div className="p-4">
        <div className="grid grid-cols-13">
          <div>
            <StyledButton
              type="default"
              size="small"
              label="Teknologi"
              className="self-center px-2"
              round="true"
            />
          </div>
        </div>
        <div className="grid gap-3 grid-cols-13">
          <div className="col-start-1 col-end-10">
            <div className="display-block pt-20px">
              <Typography.Text className="text-18px !text-primary-color font-medium">
                The 1619 Project, MLK, and the Subtle Indignity of a Lazy History
                Teacher’s Assignment
              </Typography.Text>
            </div>
            <div className="mb-11">
              <Typography.Text className="text-12px !text-secondary-color">
                Jakarta, 20 Feb 2023
              </Typography.Text>
            </div>
            <Image
              src="https://i.pravatar.cc/"
              alt=""
              title=""
              width={100}
              height={100}
              layout="responsive"
              objectFit="contain"
              className="mb-10"
            />
            <Typography.Text className="text-12px !text-secondary-color">
              TL;DR: Analyzing the fundamental user need that led a German poet in
              1747 to transform his apartment into a social network — a visual
              representation of his social connections, and the UX lessons that
              can be gleaned from this fascinating historical case study.
            </Typography.Text>
            <div className="mt-10 text-center">
              <Typography.Text className="text-20px !text-secondary-color font-bold">
                Harga Rp.10.000.000
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
          </div>
          <div className="col-start-11 col-end-13 pb-2">
            <div className="mb-1">
              <Avatar
                style={{ verticalAlign: 'middle' }}
                size="large"
                src="https://i.pravatar.cc"
              />
              <Typography.Text className="text-12px !text-secondary-color pl-2">
                Ahamad Sahroni
              </Typography.Text>
            </div>
            <div className="flex flex-wrap gap-2 pb-2 border-0 border-b border-solid border-b-black mb-14">
              <StyledButton
                type="default"
                size="small"
                label="ngoding gampang"
                className="self-center px-2"
              />
              <StyledButton
                type="default"
                size="small"
                label="teknologi terkini"
                className="self-center px-2"
              />
              <StyledButton
                type="default"
                size="small"
                label="Gimana Caranya menanam ?"
                className="self-center px-2"
              />
              <StyledButton
                type="default"
                size="small"
                label="teknologi terkini masszzeh"
                className="self-center px-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <CardArticlePreview
                  creator="Breda tafta"
                  date="Jakarta, 12 Jan 2023"
                  preview="The 1619 Project, MLK,
                and the Subtle Indignity of a Lazy History Teacher’s Assignment"
                  avatar=""
                />
              </div>
              <div>
                <CardArticlePreview
                  creator="Breda tafta"
                  date="Jakarta, 12 Jan 2023"
                  preview="The 1619 Project, MLK,
                and the Subtle Indignity of a Lazy History Teacher’s Assignment"
                  avatar=""
                />
              </div>
              <div>
                <CardArticlePreview
                  creator="Breda tafta"
                  date="Jakarta, 12 Jan 2023"
                  preview="The 1619 Project, MLK,
                and the Subtle Indignity of a Lazy History Teacher’s Assignment"
                  avatar=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
