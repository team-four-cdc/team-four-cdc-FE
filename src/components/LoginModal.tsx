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
  const [login, result] = useLoginMutation();

  const text = {
    pembaca: 'Login dulu yuk, agar dapat membaca lebih menyenangkan dengan',
    penulis: 'Bagikan tulisanmu untuk pembaca, ayo gabung sebagai penulis',
  };

  useEffect(() => {
    if (!visible) form.resetFields();
  }, [form, visible]);

  const onFinish = (values: any) => {
    login(values)
      .unwrap()
      .then(() => {
        notification.success({ message: 'Success' });
        setVisibility(false);
      })
      .catch((err) => {
        notification.error({ message: err?.data });
      });
  };

  return (
    <Modal
      {...modalProps}
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
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <TextInput
            label="Email"
            className="mt-10px"
            placeholder="Silakan tulis email"
          />
        </Form.Item>
        <Form.Item
          className="mb-35px"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <TextInput
            type="password"
            label="Password"
            className="mt-10px"
            placeholder="Silakan tulis password"
          />
        </Form.Item>
        <div className="text-center">
          <StyledButton
            type="primary"
            label="Login"
            htmlType="submit"
            className="mb-10px"
            loading={result.isLoading}
          />
          <Typography.Paragraph className="mb-0 text-12px">
            Anda belum punya akun ?
            <Link href={`/registrasi-${role}`}> Registrasi </Link>
          </Typography.Paragraph>
        </div>
      </Form>
    </Modal>
  );
};

export default LoginModal;
