import Heads from '@/layout/Head/Head';
import CategoryList from '@/layout/Homepage/CategoryList';
import NewArticleList from '@/layout/Homepage/NewArticleList';

export default function Home() {
  return (
    <>
      <Heads showNavbar={true} title="BacaAku" />
      <div className="px-6 py-4">
        <CategoryList />
        <NewArticleList />
      </div>
    </>
  );
}
