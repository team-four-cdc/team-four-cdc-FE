"use client"

import React from "react";
import Heads from "@/layout/Head/Head";
import CategoryList from "@/layout/Homepage/CategoryList";
import NewArticleList from "@/layout/Homepage/NewArticleList";
import WriterList from "@/layout/Homepage/WriterList";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BacaAku',
  description: 'Aplikasi Jual Beli Artikel',
}

export default function Home() {

  return (
    <div data-testid="homepage">
      <Heads showNavbar={true} title="BacaAku" />
      <div className="px-6 py-4">
        <CategoryList />
        <NewArticleList />
        <WriterList />
      </div>
    </div>
  );
}

