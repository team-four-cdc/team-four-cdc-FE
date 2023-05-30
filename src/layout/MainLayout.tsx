// import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function MainLayout({ children }: any) {
  const { auth } = useSelector((state: any) => state);
  // const Router = useRouter();
  useEffect(() => {
    // auth.role == 'creator' && auth.isLogin
    //   ? Router.push('/dashboard-penulis')
    //   : Router.push('/');
    // eslint-disable-next-line
  }, [auth]);
  return <>{children}</>;
}
