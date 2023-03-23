import { Form, Modal, ModalProps, notification, Typography } from 'antd';
import TextInput from '@/components/TextInput';
import StyledButton from '@/components/Button';
import Link from 'next/link';
import { useLoginMutation } from '@/services';
import { Dispatch, SetStateAction, useEffect } from 'react';

export type UserRole = 'pembaca' | 'penulis';

interface Props extends ModalProps {
  visible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  role: UserRole;
}

const LoginModal = (props: Props) => {
  const { visible, setVisibility, role, ...modalProps } = props;
  const [form] = Form.useForm();
  const [login, { isLoading }] = useLoginMutation();

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

  const onFinish = (values: any) => {
    login({
      role: roles[role],
      email: values['login-email'],
      password: values['login-password'],
    })
      .unwrap()
      .then(() => {
        notification.success({ message: 'Success' });
        setVisibility(false);
      })
      .catch((err) => {
        notification.error({ message: err?.data });
      });
  };

  const onRedirect = () => {
    setVisibility(false);
  };

  return (
    <Modal
      {...modalProps}
      forceRender
      centered
      visible={visible}
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
              message: 'Please input your email!',
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
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <TextInput
            type="password"
            label="Password"
            placeholder="Silakan tulis password"
          />
        </Form.Item>
        <div className="text-right mb-30px">
          <Typography.Paragraph className="mb-0 text-12px ">
            <Link
              href={`/lupa-password`}
              onClick={onRedirect}
              className="text-black hover:text-secondary-color"
            >
              Lupa password
            </Link>
          </Typography.Paragraph>
        </div>
        <div className="text-center">
          <StyledButton
            type="primary"
            label="Login"
            htmlType="submit"
            className="mb-10px"
            loading={isLoading}
          />
          <Typography.Paragraph className="mb-0 text-12px">
            Anda belum punya akun ?
            <Link href={`/registrasi-${role}`} onClick={onRedirect}>
              {' '}
              Registrasi
            </Link>
          </Typography.Paragraph>
        </div>
      </Form>
    </Modal>
  );
};

export default LoginModal;
