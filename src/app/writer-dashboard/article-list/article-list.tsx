"use client"
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArticleList from '@/components/ArticleList';
import Heads from '@/layout/Head/Head';
import WriterLayout from '@/layout/Head/Writer/WriterLayout';
import { useAllArticleMutation } from '@/services';
import { RootState } from '@/store';

interface ComputedAllArticle {
  id: number,
  preview: string,
  title: string,
  desc: string,
  body: string,
  publish_date: string,
  author_id: number,
  price: string,
  pdf_url: string,
  category_id: number,
  createdAt: string,
  updatedAt: string,
  author: {
    email: string,
    full_name: string,
    author: string,
    photo_url: string,
    createdAt: string,
    updatedAt: string,
  }
}

export default function ListArticles() {
  const [getAllArticle] = useAllArticleMutation();
  const [dataArticle, setDataArticle] = useState<ComputedAllArticle[]>([]);
  const { auth } = useSelector((state: RootState) => state);

  function fetchArticle() {
    getAllArticle({
      userId: auth.userId,
    })
      .unwrap()
      .then((res) => {
        const temp = res.data.map((val) => ({
          id: val.id,
          preview: val.photo_article,
          title: val.title,
          desc: val.description,
          body: val.body,
          publish_date: val.publish_date,
          author_id: val.author_id,
          price: val.price,
          pdf_url: val.pdf_url,
          category_id: val.category_id,
          createdAt: val.createdAt,
          updatedAt: val.updatedAt,
          author: {
            id: val.author.id,
            email: val.author.email,
            full_name: val.author.full_name,
            author: val.author.author,
            photo_url: val.author.photo_url,
            createdAt: val.author.createdAt,
            updatedAt: val.author.updatedAt,
          },
        }));
        setDataArticle(temp);
      });
  }

  useEffect(() => {
    //eslint-disable-next-line
    fetchArticle();

    return () => { };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Heads title="Daftar artikel" showNavbar={true} showWrappOption={true} />
      <WriterLayout>
        <ArticleList fetchArticle={fetchArticle} items={dataArticle} />
      </WriterLayout>
    </>
  );
}
