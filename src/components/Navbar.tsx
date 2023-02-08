import { Typography } from 'antd';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="flex flex-row bg-monocrom-color px-30px py-20px shadow-primary-box-shadow">
      <div className="p-20">
        <Typography.Text className="text-30px !text-secondary-color">
          BacaAku
        </Typography.Text>
      </div>
      <div className="flex p-20px flex-row space-x-30px ml-auto">
        <Link href={'/'}>Lihat Artikel</Link>
        <Link href={'/'}>Masuk Akun</Link>
        <Link href={'/'}>Registrasi</Link>
      </div>
    </div>
  );
}
