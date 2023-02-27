import { CaretDownFilled } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoginModal, { UserRole } from './LoginModal';

interface NavbarProps {
  Router: any;
}

export default function Navbar(props: NavbarProps) {
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
      register: '/registrasi-pembaca',
    },
    {
      name: 'Penulis',
      login: 'penulis',
      register: '/registrasi-penulis',
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
                  'text-success-color': props.Router == menu.register,
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

  useEffect(() => {
    setShowLoginModal(false);
  }, [props.Router]);

  return (
    <>
      <div className="flex flex-row w-full bg-monocrom-color px-30px py-20px shadow-primary-box-shadow">
        <div>
          <Link href={'/'} className="text-30px !text-secondary-color">
            BacaAku
          </Link>
        </div>
        <div className="flex flex-row ml-auto p-20px space-x-30px">
          <Link
            href={'/'}
            className={classNames({
              'text-success-color': props.Router == '/',
            })}
          >
            Lihat Artikel
          </Link>
          <Dropdown
            overlay={menu('login')}
            trigger={['click']}
            className={classNames('cursor-pointer hover:text-success-color', {
              'text-success-color': props.Router == '/login-pembaca',
            })}
          >
            <Space>
              Masuk Akun <CaretDownFilled />
            </Space>
          </Dropdown>
          <Dropdown
            overlay={menu('register')}
            trigger={['click']}
            className={classNames('cursor-pointer hover:text-success-color', {
              'text-success-color':
                props.Router == '/registrasi-pembaca' ||
                props.Router == '/registrasi-penulis',
            })}
          >
            <Space>
              Buat Akun <CaretDownFilled />
            </Space>
          </Dropdown>
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
