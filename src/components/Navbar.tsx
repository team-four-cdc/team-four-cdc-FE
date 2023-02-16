import { CaretDownFilled } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import classNames from 'classnames';
import Link from 'next/link';

interface NavbarProps {
  Router: any;
}

export default function Navbar(props: NavbarProps) {
  const itemMenus = [
    {
      name: 'Pembaca',
      login: '/login-pembaca',
      register: '/register-pembaca',
    },
    {
      name: 'Penulis',
      login: '/login-penulis',
      register: '/register-penulis',
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

  return (
    <div className="fixed flex flex-row w-full bg-monocrom-color px-30px py-20px shadow-primary-box-shadow">
      <div>
        <Typography.Text className="text-30px !text-secondary-color">
          BacaAku
        </Typography.Text>
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
  );
}
