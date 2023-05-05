import CardArticlePreview from '@/components/CardArticlePreview';
import { Typography } from 'antd';

export default function NewArticleList() {
  const Array = ['1', '2', '3', '4', '5'];
  return (
    <>
      <div className="mt-16">
        <Typography.Title className="text-30px text-secondary-color">
          Artikel Terbaru
        </Typography.Title>
        <div className="flex flex-wrap">
          {Array.map((list: any) => (
            <div key={list} className="grid justify-center w-1/2 p-3">
              <CardArticlePreview
                creator="Breda tafta"
                date="Jakarta, 12 Jan 2023"
                preview="The 1619 Project, MLK, 
                and the Subtle Indignity of a Lazy History Teacher’s Assignment"
                avatar=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
