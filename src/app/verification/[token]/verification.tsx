"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { useVerifyMutation } from '@/services';
import VerifiedPage from '@/components/VerifiedPage';
import Heads from '@/layout/Head/Head';
import { setAuth } from '@/store/auth/authSlice';

type Status = 'success' | 'failed' | 'error';

export default function Verification() {
  const pathname = usePathname()
  const token = pathname?.replace('/verifikasi/','')
  const [verify, { isLoading, isUninitialized }] = useVerifyMutation();
  const [status, setStatus] = useState<Status>('error');
  const dispatch = useDispatch();

  useEffect(() => { 
    if (token) {
      verify({ token })
        .unwrap()
        .then(() => {
          setStatus('success');
          dispatch(setAuth(token));
        })
        .catch(() => setStatus('failed'));
    }
  }, [dispatch, token, verify]);

  if (isUninitialized || isLoading) {
    return (
      <div className="flex h-screen w">
        <div className="m-auto">
          <Spin spinning size="large" />
        </div>
      </div>
    );
  }

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
