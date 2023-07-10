"use client"

import React from "react";
import Heads from "@/layout/Head/Head";
import CategoryList from "@/layout/Homepage/CategoryList";
import NewArticleList from "@/layout/Homepage/NewArticleList";
import WriterList from "@/layout/Homepage/WriterList";
import { Metadata } from 'next'
import BaseLayout from "@/layout/Head/Writer/BaseLayout";
import PopularArticleList from "@/layout/Homepage/PopularArticleList";

export const metadata: Metadata = {
  title: 'BacaAku',
  description: 'Aplikasi Jual Beli Artikel',
}

export default function Home() {

  return (
    <div data-testid="homepage" className="">
      <Heads showNavbar={true} title="BacaAku" />
      <BaseLayout>
        <div className="px-6 py-4">
          <CategoryList />
          <NewArticleList />
          <PopularArticleList />
          <WriterList />
        </div>
      </BaseLayout>
    </div>
  );
}

