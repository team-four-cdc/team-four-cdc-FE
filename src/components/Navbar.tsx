import { CaretDownFilled } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Typography } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import LoginModal, { UserRole } from '@/components/LoginModal';

export default function Navbar() {
  const [userRole, setUserRole] = useState<UserRole>('pembaca');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const onClickLoginButton = (role: UserRole) => {
    setUserRole(role);
    setShowLoginModal(true);
  };

  const itemMenus = [
    {
      name: 'Pembaca',
      login: 'pembaca',
      register: '/register-pembaca',
    },
    {
      name: 'Penulis',
      login: 'penulis',
      register: '/register-penulis',
    },
  ];

  function menu(type: string) {
    return (
      <Menu>
        {itemMenus.map((menu: any, index: any) => {
          return type == 'login' ? (
            <Menu.Item key={index}>
              <Button
                className="bg-transparent"
                type="text"
                onClick={() => onClickLoginButton(menu.login)}
              >
                {menu.name}
              </Button>
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
    <>
      <div className="flex flex-row bg-monocrom-color px-30px py-20px shadow-primary-box-shadow">
        <div>
          <Typography.Text className="text-30px !text-secondary-color">
            BacaAku
          </Typography.Text>
        </div>
        <div className="flex flex-row ml-auto p-20px space-x-30px">
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
      <LoginModal
        visible={showLoginModal}
        role={userRole}
        onCancel={() => setShowLoginModal(false)}
      />
    </>
  );
}
