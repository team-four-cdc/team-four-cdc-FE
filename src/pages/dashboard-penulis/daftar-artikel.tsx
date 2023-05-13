import ArticleList from '@/components/ArticleList';
import Heads from '@/layout/Head/Head';
import WriterLayout from '@/layout/Head/Writer/WriterLayout';
import { useAllArticleMutation } from '@/services';
import { useEffect, useState } from 'react';

export default function CheckComponent() {
  const [getAllArticle, { isLoading }] = useAllArticleMutation();
  const [dataArticle, setDataArticle] = useState([]);

  useEffect(() => {
    // TODO: set dynamic user
    getAllArticle({
      userId: 1
    }).unwrap().then((res) => {
      // setDataArticle(res)
    })

    return () => {

    }
  }, [])

  // const dataArticle = [
  // {
  // id: 1,
  // preview: 'https://i.pravatar.cc/',
  // title: 'Judulrd',
  // desc: 'Hac adipiscing ridiculus per Conubia',
  // },
  // {
  // id: 2,
  // preview: 'https://i.pravatar.cc/',
  // title: 'Judul',
  // desc: 'The "filler" text we know today has been altered over the years (in fact "Lorem" isn',
  // },
  // {
  // id: 3,
  // preview: 'https://i.pravatar.cc/',
  // title: 'Judultikel',
  // desc: 'Quisque nec nam. Ridiculus aenean torquent hac rutrum pede risus urna sem commodo molestie, neque pellentesque cubilia. Natoque condimentum. Venenatis ut, egestas vestibulum vulputate pretium enim.',
  // },
  // {
  // id: 4,
  // preview: 'https://i.pravatar.cc/',
  // title: 'JudulPenulis',
  // desc: '',
  // },
  // {
  // id: 5,
  // preview: 'https://i.pravatar.cc/',
  // title: 'Judul',
  // desc: 'Porta ornare dictumst hymenaeos hendrerit nostra rhoncus viverra. Scelerisque aptent varius ridiculus pede vivamus consectetuer venenatis. Maecenas condimentum. Dolor congue placerat. Vestibulum curae; porta. At est metus hymenaeos augue vitae gravida justo, eros. Potenti natoque amet ipsum consequat.',
  // },
  // ];

  return (
    <>
      <Heads title="Daftar artikel" showNavbar={true} showWrappOption={true} />
      <WriterLayout>
        <ArticleList items={dataArticle} />
      </WriterLayout>
    </>
  );
}
