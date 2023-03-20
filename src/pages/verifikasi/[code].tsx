import Heads from '@/layout/Head/Head';
import VerifiedPage from '@/components/VerifiedPage';
import { useEffect, useState } from 'react';
import { useVerifyMutation } from '@/services';
import { useRouter } from 'next/router';
import { Spin } from 'antd';

type Status = 'success' | 'failed' | 'error';

export default function Verifikasi() {
  const { query } = useRouter();
  const [verify, { isLoading, isUninitialized }] = useVerifyMutation();
  const [status, setStatus] = useState<Status>('error');

  useEffect(() => {
    const code = query.code as string;
    if (code) {
      verify({ token: code })
        .unwrap()
        .then(() => setStatus('success'))
        .catch(() => setStatus('failed'));
    }
  }, [query.code, verify]);

  if (isUninitialized || isLoading)
    return (
      <div className="flex h-screen w">
        <div className="m-auto">
          <Spin spinning size="large" />
        </div>
      </div>
    );

  return (
    <>
      <Heads showNavbar={false} title="Verifikasi" />
      <main>
        <div className="flex h-screen w">
          <div className="m-auto">
            <VerifiedPage status={status} />
          </div>
        </div>
      </main>
    </>
  );
}
