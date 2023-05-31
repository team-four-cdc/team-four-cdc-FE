import { useAsync } from '@/hooks/useAsync';
import { RootState } from '@/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function MainLayout({ children }: any) {
  const { auth } = useSelector((state: RootState) => state);
  const router = useRouter();

  useAsync(
    async () => {
      const isCreator = auth.role === 'creator';
      const isReader = auth.role === 'reader';
      if (auth.isLogin && isCreator && router.isReady) {
        router.replace(
          {
            pathname: '/dashboard-penulis',
          },
          undefined,
          { shallow: true }
        );
      } else if (auth.isLogin && isReader && router.isReady) {
        router.replace(
          {
            pathname: '/',
          },
          undefined,
          { shallow: false }
        );
      }
    },
    () => null,
    () => null,
    []
  );

  return <>{children}</>;
}
