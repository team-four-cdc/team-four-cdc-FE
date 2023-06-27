"use client"

import Heads from "@/layout/Head/Head"
import { Typography } from "antd"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function MyArticle() {
  return (<>
    <Heads title="Artikel Saya" showNavbar showWrappOption />
    <div className="grid grid-cols-2 gap-2 justify-center px-4">
      <Link href={'/detail-artikel/1'} className="border border-2 group border-[#DDD] border-solid px-2 py-2 rounded-lg mt-20 flex justify-center items-center gap-2 hover:bg-success-color">
        <Image width={200} height={200} className="object-contain" src="/image-preview.png" alt="Preview Artikel" />
        <div className="flex flex-col">
          <Typography.Title className="group-hover:text-white">Ahmad Dhani</Typography.Title>
          <Typography.Text className="group-hover:text-white">The 1619 Project, MLK, and the Subtle Indignity of a Lazy History Teacher’s Assignment</Typography.Text>
        </div>
      </Link>
      <Link href={'/detail-artikel/1'} className="border border-2 group border-[#DDD] border-solid px-2 py-2 rounded-lg mt-20 flex justify-center items-center gap-2 hover:bg-success-color">
        <Image width={200} height={200} className="object-contain" src="/image-preview.png" alt="Preview Artikel" />
        <div className="flex flex-col">
          <Typography.Title className="group-hover:text-white">Ahmad Dhani</Typography.Title>
          <Typography.Text className="group-hover:text-white">The 1619 Project, MLK, and the Subtle Indignity of a Lazy History Teacher’s Assignment</Typography.Text>
        </div>
      </Link>
    </div>
  </>)
}
