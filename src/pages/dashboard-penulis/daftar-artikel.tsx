import ArticleList from '@/components/ArticleList';
import Heads from '@/layout/Head/Head';
import WriterLayout from '@/layout/Head/Writer/WriterLayout';
import { useAllArticleMutation } from '@/services';
import { useEffect, useState } from 'react';

export default function CheckComponent() {
  const [getAllArticle] = useAllArticleMutation();
  const [dataArticle, setDataArticle] = useState([]);

  useEffect(() => {
    fetchArticle();

    return () => { };
    // eslint-disable-next-line
  }, []);

  function fetchArticle() {
    // TODO: set dynamic user
    getAllArticle({
      userId: 2,
    })
      .unwrap()
      .then((res) => {
        const temp = res.data.map((val: any) => {
          return {
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
          };
        });
        setDataArticle(temp);
      });
  }

  return (
    <>
      <Heads title="Daftar artikel" showNavbar={true} showWrappOption={true} />
      <WriterLayout>
        <ArticleList fetchArticle={fetchArticle} items={dataArticle} />
      </WriterLayout>
    </>
  );
}
