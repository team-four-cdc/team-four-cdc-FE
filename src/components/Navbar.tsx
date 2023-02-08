import { CaretDownFilled } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import Link from 'next/link';

export default function Navbar() {
  const itemMenus = [
    {
      name: 'Pembaca',
    },
    {
      name: 'Penulis',
    },
  ];
  const menu = (
    <Menu>
      {itemMenus.map((menu: any, index: any) => {
        return <Menu.Item key={index}>{menu.name}</Menu.Item>;
      })}
    </Menu>
  );
  return (
    <div className="flex flex-row bg-monocrom-color px-30px py-20px shadow-primary-box-shadow">
      <div className="p-20">
        <Typography.Text className="text-30px !text-secondary-color">
          BacaAku
        </Typography.Text>
      </div>
      <div className="flex p-20px flex-row space-x-30px ml-auto">
        <Link href={'/'}>Lihat Artikel</Link>
        <Dropdown overlay={menu} trigger={['click']}>
          <a>
            <Space>
              Masuk Akun <CaretDownFilled />
            </Space>
          </a>
        </Dropdown>
        <Dropdown overlay={menu} trigger={['click']}>
          <a>
            <Space>
              Registrasi <CaretDownFilled />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
