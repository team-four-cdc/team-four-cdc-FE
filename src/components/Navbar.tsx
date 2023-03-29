import { CaretDownFilled } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Typography } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoginModal, { UserRole } from './LoginModal';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuth } from '@/store/auth/authSlice';

interface NavbarProps {
  showWrapperOption: boolean;
}

export default function Navbar({ showWrapperOption = true }: NavbarProps) {
  const [userRole, setUserRole] = useState<UserRole>('pembaca');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const Router = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector((state: any) => state);
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
    },
    {
      name: 'Masuk Akun',
      type: 'dropdown',
      menu: 'login',
      url: '/login-pembaca',
    },
    {
      name: 'Buat Akun',
      type: 'dropdown',
      menu: 'register',
      url: '/registrasi-pembaca',
      url2: '/registrasi-penulis',
    },
  ];

  const itemNavbarLogin = [
    {
      name: 'Lihat Artikel',
      type: 'link',
      url: '/lihat-artikel',
    },
    {
      name: 'Daftar Artikelmu',
      type: 'link',
      url: '/daftar-artikel',
    },
    {
      name: `Hi ${'nama kamu'}`,
      type: 'dropdown',
      menu: 'logout',
      url: '/registrasi-pembaca',
    },
  ];

  function menu(type: string) {
    return (
      <Menu>
        {type == 'logout' ? (
          <Menu.Item>
            <Button
              className="bg-transparent"
              type="text"
              onClick={() => dispatch(resetAuth())}
            >
              Keluar
            </Button>
          </Menu.Item>
        ) : (
          itemMenus.map((menu: any, index: any) => {
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
          })
        )}
      </Menu>
    );
  }

  const NavbarWrapp = auth.isLogin ? (
    <>
      {auth.role == 'reader' ? (
        itemNavbarLogin.map((navbar: any, index: number) => {
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
                      'text-success-color':
                        Router.asPath == navbar.url ||
                        Router.asPath == navbar.url2,
                    }
                  )}
                >
                  <Space>
                    {navbar.name} <CaretDownFilled />
                  </Space>
                </Dropdown>
              );
          }
        })
      ) : (
        <>
          <div className="flex items-center justify-center gap-8">
            <div className="w-10 h-10 rounded-full bg-primary-color" />
            <Typography.Paragraph className="mb-0 font-normal text-14px text-secondary-color">
              Selamat Datang, {'nama penulis'}
            </Typography.Paragraph>
          </div>
        </>
      )}
    </>
  ) : (
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
                    'text-success-color':
                      Router.asPath == navbar.url ||
                      Router.asPath == navbar.url2,
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
        <div className="flex items-center justify-center">
          <Link href={'/'} className="text-30px !text-secondary-color">
            BacaAku
          </Link>
        </div>
        {showWrapperOption && (
          <div className="flex flex-row ml-auto p-20px space-x-30px">
            {NavbarWrapp}
          </div>
        )}
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
