import Heads from '@/layout/Head/Head';
import VerifiedPage from '@/components/VerifiedPage';
import { useRouter } from 'next/router';

export default function Verifikasi() {
  const Router = useRouter();
  const [, , secondUrl] = Router.asPath.split('/');

  function UrlVerified(url: any) {
    switch (url) {
      case 'success':
        return 0;
      case 'error':
        return 1;
      default:
        return 2;
    }
  }

  return (
    <>
      <Heads showNavbar={false} title="Verifikasi" />
      <main>
        <div className="flex h-screen w">
          <div className="m-auto">
            <VerifiedPage status={UrlVerified(secondUrl)} />
          </div>
        </div>
      </main>
    </>
  );
}
