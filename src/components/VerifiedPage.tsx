import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import { EyeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import StyledButton from './Button';

interface StandardVerifiedPageProps {
  status: 'success' | 'failed' | 'error';
}

export default function VerifiedPage(props: StandardVerifiedPageProps) {
  const { status = 'error' } = props;
  const router = useRouter();

  const contents = {
    success: {
      image: '/verifiedSuccess.svg',
      title: 'Verifikasi Berhasil',
      description:
        'Selamat verifikasi anda berhasil, silakan nikmati membaca artikel secara lengkap',
      labelButton: 'Halaman BacaAku',
      urlRedirect: '/',
      isSuccess: true,
    },
    failed: {
      image: '/verifiedFailed.svg',
      title: 'Verifikasi Gagal',
      description:
        'Mohon maaf verifikasi anda gagal, silakan mencoba untuk mendaftar kembali',
      labelButton: 'Kembali Beranda',
      urlRedirect: '/',
      isSuccess: false,
    },
    error: {
      image: '/verifiedWarning.svg',
      title: 'Maaf Terjadi Kesalahan',
      description:
        'Hallo maaf, saat ini halaman yang anda tuju sedang ada masalah. Silakan ke Beranda',
      labelButton: 'Kembali Beranda',
      urlRedirect: '/',
      isSuccess: false,
    },
  };

  return (
    <div className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8">
      <div>
        <Image
          src={contents[status].image}
          alt="Image Notification"
          width={336}
          height={231}
        />
      </div>
      <div className="mt-10">
        <Typography.Text className="text-30px !text-primary-color">
          {contents[status].title}
        </Typography.Text>
      </div>
      <div className="my-10">
        <Typography.Text className="text-14px !text-primary-color">
          {contents[status].description}
        </Typography.Text>
      </div>
      <div>
        <StyledButton
          label={contents[status].labelButton}
          type={contents[status].isSuccess ? 'primary' : 'default'}
          size="large"
          icon={contents[status].isSuccess ? <EyeOutlined /> : null}
          onClick={async() => router.push(contents[status].urlRedirect)}
        />
      </div>
    </div>
  );
}
