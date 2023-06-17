import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAsync } from '@/hooks/useAsync';
import { RootState } from '@/store';

export default function MainLayout({ children }: { children: JSX.Element }) {
  const { auth } = useSelector((state: RootState) => state);
  const router = useRouter();

  useAsync(
    async () => {
      const isCreator = auth.role === 'creator';
      const isReader = auth.role === 'reader';
      if (auth.isLogin && isCreator && router.isReady) {
        await router.replace(
          {
            pathname: '/dashboard-penulis',
          },
          undefined,
          { shallow: true },
        );
      } else if (auth.isLogin && isReader && router.isReady) {
        await router.replace(
          {
            pathname: '/',
          },
          undefined,
          { shallow: false },
        );
      }
    },
    () => null,
    () => null,
    [],
  );

  return <>{children}</>;
}
