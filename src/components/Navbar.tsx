import { CaretDownFilled } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoginModal, { UserRole } from './LoginModal';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [userRole, setUserRole] = useState<UserRole>('pembaca');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const Router = useRouter();

  const onClickLoginButton = (role: UserRole) => {
    setUserRole(role);
    setShowLoginModal(true);
  };

  const itemMenus = [
    {
      name: 'Pembaca',
      login: 'pembaca',
      register: '/registrasi-pembaca',
    },
    {
      name: 'Penulis',
      login: 'penulis',
      register: '/registrasi-penulis',
    },
  ];

  const itemNavbar = [
    {
      name: 'Lihat Artikel',
      type: 'link',
      url: '/lihat-artikel',
      show: '',
    },
    {
      name: 'Masuk Akun',
      type: 'dropdown',
      menu: 'login',
      url: '/login-pembaca',
      show: '',
    },
    {
      name: 'Buat Akun',
      type: 'dropdown',
      menu: 'register',
      url: '/registrasi-pembaca',
      url2: 'registrasi-penulis',
      show: '',
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
              <Link
                href={menu.register}
                className={classNames({
                  'text-success-color': Router.asPath == menu.register,
                })}
              >
                {menu.name}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }

  const NavbarWrapp = (
    <>
      {itemNavbar.map((navbar: any, index: number) => {
        switch (navbar.type) {
          case 'link':
            return (
              <Link
                key={index}
                href={'/lihat-artikel'}
                className={classNames({
                  'text-success-color': Router.asPath == navbar.url,
                })}
              >
                {navbar.name}
              </Link>
            );
          case 'dropdown':
            return (
              <Dropdown
                key={index}
                overlay={menu(navbar.menu)}
                trigger={['click']}
                className={classNames(
                  'cursor-pointer hover:text-success-color',
                  {
                    'text-success-color': Router.asPath == navbar.url,
                  }
                )}
              >
                <Space>
                  {navbar.name} <CaretDownFilled />
                </Space>
              </Dropdown>
            );
        }
      })}
    </>
  );

  useEffect(() => {
    setShowLoginModal(false);
  }, [Router.asPath]);

  return (
    <>
      <div className="sticky top-0 flex flex-row w-full bg-monocrom-color px-30px py-20px shadow-primary-box-shadow">
        <div>
          <Link href={'/'} className="text-30px !text-secondary-color">
            BacaAku
          </Link>
        </div>
        <div className="flex flex-row ml-auto p-20px space-x-30px">
          {NavbarWrapp}
        </div>
      </div>
      <LoginModal
        visible={showLoginModal}
        setVisibility={setShowLoginModal}
        role={userRole}
        onCancel={() => setShowLoginModal(false)}
      />
    </>
  );
}
