import { Form, Modal, ModalProps, notification, Typography } from 'antd';
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TextInput from '@/components/TextInput';
import ButtonCategory from '@/components/Button';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { LoginResponse } from '@/services';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/store/auth/authSlice';

interface ILogin {
  'login-email': string;
  'login-password': string;
}

export type UserRole = 'pembaca' | 'penulis';

interface Props extends ModalProps {
  visible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  role: UserRole;
}

const LoginModal = (props: Props) => {
  const { visible, setVisibility, role, ...modalProps } = props;
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [loginAttempt, setLoginAttempt] = useState(1);

  const text = {
    pembaca: 'Login dulu yuk, agar dapat membaca lebih menyenangkan dengan',
    penulis: 'Bagikan tulisanmu untuk pembaca, ayo gabung sebagai penulis',
  };

  const roles = {
    pembaca: 'reader',
    penulis: 'creator',
  };

  useEffect(() => {
    if (!visible) form.resetFields();
  }, [form, visible]);

  const onFinish = async (values: ILogin) => {
    const body = {
      role: roles[role],
      email: values['login-email'],
      password: values['login-password'],
    };

    // eslint-disable-next-line
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (pattern.test(body.email)) {
      await axios
        .post<LoginResponse>('/api/login', body)
        .then((data) => {
          dispatch(setAuth(data.data.data?.token));

          notification.success({ message: 'Login Berhasil!' });
          router.push('/dashboard-penulis');
          setVisibility(false);
        })
        .catch((err) => {
          // eslint-disable-next-line
          const errorResponse = err.response.data as LoginResponse;
          if (errorResponse.status === 400) {
            setLoginAttempt(prev => prev + 1)
            return notification.error({
              message: 'User tidak ditemukan!',
            });
          }
          if (errorResponse.status === 401) {
            setLoginAttempt(prev => prev + 1)
            return notification.error({
              message: 'Username atau Password salah!',
            });
          }
          return notification.error({ message: 'Error pada sistem!' });
        });
    } else {
      notification.error({
        message: 'Email tidak valid!',
      });
    }
  };

  const onRedirect = () => {
    setVisibility(false);
  };

  return (
    <Modal
      {...modalProps}
      forceRender
      centered
      open={visible}
      closable={false}
      footer={null}
    >
      <div className="mb-30px">
        <Typography.Title level={2} className="mb-1">
          BacaAku
        </Typography.Title>
        <Typography.Paragraph className="mb-0 text-12px text-secondary-color">
          {text[role]}
        </Typography.Paragraph>
        <Typography.Paragraph className="text-12px text-secondary-color">
          BacaAku
        </Typography.Paragraph>
      </div>
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Form.Item
          className="mb-35px"
          name="login-email"
          rules={[
            {
              required: true,
              message: 'Masukkan Email anda!',
            },
          ]}
        >
          <TextInput
            type="email"
            label="Email"
            placeholder="Silakan tulis email"
          />
        </Form.Item>
        <Form.Item
          className="mb-10px"
          name="login-password"
          rules={[{ required: true, message: 'Masukkan Password anda!' }]}
        >
          <TextInput
            type="password"
            label="Password"
            placeholder="Silakan tulis password"
          />
        </Form.Item>
        {loginAttempt >= 3 ? <span className='text-red-500 w-full flex justify-center animate-shake'>Anda telah gagal login sebanyak 3x. Silahkan gunakan Lupa Password.</span> : null}
        <div className="text-right mb-30px">
          <Typography.Paragraph className="mb-0 text-12px ">
            <Link
              href={`/lupa-password?role=${role}`}
              onClick={onRedirect}
              className="text-black hover:text-secondary-color"
            >
              Lupa password
            </Link>
          </Typography.Paragraph>
        </div>
        <div className="text-center flex flex-col items-center ">
          <ButtonCategory
            type="primary"
            label="Login"
            htmlType="submit"
            className="mb-10px "
          />
          <Typography.Paragraph className="mb-0 text-12px">
            Anda belum punya akun ?
            <Link
              href={`/registrasi-${role}`}
              onClick={onRedirect}
              legacyBehavior
            >
              Registrasi
            </Link>
          </Typography.Paragraph>
        </div>
      </Form>
    </Modal>
  );
};

export default LoginModal;
