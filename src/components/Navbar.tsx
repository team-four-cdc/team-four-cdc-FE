import { CaretDownFilled } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import Link from 'next/link';

export default function Navbar() {
  const itemMenus = [
    {
      name: 'Pembaca',
      login: '/login-pembaca',
      register: '/register-pembaca',
    },
    {
      name: 'Penulis',
      login: '/login-pembaca',
      register: '/register-pembaca',
    },
  ];

  function menu(type: string) {
    return (
      <Menu>
        {itemMenus.map((menu: any, index: any) => {
          return type == 'login' ? (
            <Menu.Item key={index}>
              <Link href={menu.login}>{menu.name}</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key={index}>
              <Link href={menu.register}>{menu.name}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }

  return (
    <div className="flex flex-row bg-monocrom-color px-30px py-20px shadow-primary-box-shadow">
      <div className="p-20">
        <Typography.Text className="text-30px !text-secondary-color">
          BacaAku
        </Typography.Text>
      </div>
      <div className="flex p-20px flex-row space-x-30px ml-auto">
        <Link href={'/'}>Lihat Artikel</Link>
        <Dropdown overlay={menu('login')} trigger={['click']}>
          <a>
            <Space>
              Masuk Akun <CaretDownFilled />
            </Space>
          </a>
        </Dropdown>
        <Dropdown overlay={menu('register')} trigger={['click']}>
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
