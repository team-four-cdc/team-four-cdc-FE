import React from 'react';
import { Typography } from 'antd';
import Image from 'next/image';
import StyledButton from './Button';
import { EyeOutlined } from '@ant-design/icons';

interface StandardVerifiedPageProps {
  status: 'success' | 'warning' | 'error';
}

export default function VerifiedPage(
  props: StandardVerifiedPageProps
): JSX.Element {
  const contents = {
    success: {
      image: '/verifiedSuccess.svg',
      title: 'Verifikasi Berhasil',
      description:
        'Selamat verifikasi anda berhasil, silakan nikmati membaca artikel secara lengkap',
      labelButton: 'Halaman BacaAku',
      isSuccess: true,
    },
    error: {
      image: '/verifiedFailed.svg',
      title: 'Verifikasi gagal',
      description:
        'Mohon maaf verifikasi anda gagal, silakan mencoba untuk mendaftar kembali',
      labelButton: 'Kembali Registrasi',
      isSuccess: false,
    },
    warning: {
      image: '/verifiedWarning.svg',
      title: 'Maaf Terjadi Kesalahan',
      description:
        'Hallo maaf, saat ini halaman yang anda tuju sedang ada masalah. Silakan ke Beranda',
      labelButton: 'Kembali Beranda',
      isSuccess: false,
    },
  };
  return (
    <div className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div>
        <Image
          src={contents[props.status].image}
          alt="Image Notification"
          width={336} // set width to 200px
          height={231} // set height to 150px
        />
      </div>
      <div className="mt-10">
        <Typography.Text className="text-30px !text-primary-color">
          {contents[props.status].title}
        </Typography.Text>
      </div>
      <div className="my-10">
        <Typography.Text className="text-14px !text-primary-color">
          {contents[props.status].description}
        </Typography.Text>
      </div>
      <div>
        <StyledButton
          label={contents[props.status].labelButton}
          type={contents[props.status].isSuccess ? 'primary' : 'default'}
          size="large"
          icon={contents[props.status].isSuccess ? <EyeOutlined /> : null}
        />
      </div>
    </div>
  );
}