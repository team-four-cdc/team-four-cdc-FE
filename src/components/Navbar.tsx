import { CaretDownFilled, MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Typography } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoginModal, { UserRole } from './LoginModal';
import { resetAuth, toggleSidebar } from '@/store/auth/authSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';

interface NavbarProps {
  showWrapperOption: boolean;
}

interface ItemMenuIF {
  name: string;
  login: UserRole;
  register: string;
}

interface ItemNavbarIF {
  name: string;
  menu?: string;
  type: string;
  url: string;
  url2?: string;
}

export default function Navbar({ showWrapperOption = true }: NavbarProps) {
  const [userRole, setUserRole] = useState<UserRole>('pembaca');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const Pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch()
  const { auth } = useAppSelector((state) => state);

  const showDrawer = () => {
    dispatch(toggleSidebar(true))
  };

  const onClose = () => {
    dispatch(toggleSidebar(false))
  };

  const onClickLoginButton = (role: UserRole) => {
    setUserRole(role);
    setShowLoginModal(true);
  };

  const itemMenus: ItemMenuIF[] = [
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

  const itemNavbar: ItemNavbarIF[] = [
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

  const itemNavbarLogin: ItemNavbarIF[] = [
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
      // eslint-disable-next-line
      name: `Hi ${auth?.fullName}`,
      // eslint-disable-next-line
      type: 'dropdown',
      menu: 'logout',
      url: '/registrasi-pembaca',
    },
  ];

  function menuComponent(type: string) {
    return (
      <Menu>
        {type == 'logout' ? (
          <Menu.Item>
            <Button
              className="bg-transparent"
              type="text"
              onClick={async () => {
                dispatch(resetAuth());
                await axios('/api/logout');
                // TODO: temporary solution
                router.push('/');
              }}
            >
              Keluar
            </Button>
          </Menu.Item>
        ) : (
          itemMenus.map((menu, index: number) =>
            type == 'login' ? (
              <Menu.Item key={`item-menus-no-${index}`}>
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
                    'text-success-color': Pathname == menu.register,
                  })}
                  legacyBehavior
                >
                  {menu.name}
                </Link>
              </Menu.Item>
            )
          )
        )}
      </Menu>
    );
  }

  const NavbarWrap = auth?.isLogin ? (
    <>
      {auth.role == 'reader' ? (
        itemNavbarLogin.map((navbar, index: number) => {
          switch (navbar.type) {
            case 'link':
              return (
                <Link
                  key={`item-navbar-no-${index}`}
                  href={'/artikel-saya'}
                  className={classNames({
                    'text-success-color': Pathname == navbar.url,
                  })}
                  legacyBehavior
                >
                  {navbar.name}
                </Link>
              );
            case 'dropdown':
              return (
                <Dropdown
                  key={index}
                  overlay={menuComponent(navbar?.menu || '')}
                  trigger={['click']}
                  className={classNames(
                    'cursor-pointer hover:text-success-color',
                    {
                      'text-success-color':
                        Pathname == navbar.url || Pathname == navbar.url2,
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
              Selamat Datang, {auth.fullName}
            </Typography.Paragraph>
          </div>
        </>
      )}
    </>
  ) : (
    <>
      {itemNavbar.map((navbar, index: number) => {
        switch (navbar.type) {
          case 'link':
            return (
              <Link
                key={`item-navbar2-no-${index}`}
                href={'/lihat-artikel'}
                className={classNames({
                  'text-success-color': Pathname == navbar.url,
                })}
                legacyBehavior
              >
                {navbar.name}
              </Link>
            );
          case 'dropdown':
            return (
              <Dropdown
                key={index}
                overlay={menuComponent(navbar?.menu || '')}
                trigger={['click']}
                className={classNames(
                  'cursor-pointer hover:text-success-color',
                  {
                    'text-success-color':
                      Pathname == navbar.url || Pathname == navbar.url2,
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
  }, [Pathname]);

  return (
    <>
      <div className="sticky top-0 flex flex-row w-full bg-monocrom-color px-30px py-20px shadow-primary-box-shadow z-50">
        <div className="flex items-center justify-center">
          <div className="text-[30px] !text-secondary-color">
            <div className='flex justify-center items-center gap-2'>
              {!!auth && auth.role === 'creator' ? <MenuOutlined className='cursor-pointer' onClick={() => {
                if (auth.openSidebar) {
                  onClose()
                } else {
                  showDrawer()
                }
              }} />
                : null}
              <Link href={'/'}>BacaAku</Link>
            </div>
          </div>
        </div>
        {showWrapperOption && (
          <div className="flex flex-row ml-auto p-20px space-x-30px">
            {NavbarWrap}
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
