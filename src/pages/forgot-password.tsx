import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form, Typography, notification } from 'antd';
import { useRouter } from 'next/router';
import React, { useState, ChangeEvent } from 'react';
import StyledButton from '@/components/Button';
import TextInput from '@/components/TextInput';
import Heads from '@/layout/Head/Head';
import { useForgotPasswordMutation } from '@/services';
import { DbConcurrencyError, ErrorResponse, InternalServerError } from '@/utils/errorResponseHandler';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [form] = Form.useForm();
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'email') {
      setEmail(event.target.value);
    }
  }

  const onFinish = (values: { emailField: string }) => {
    const { emailField } = values;
    forgotPassword({
      email: emailField,
      // TODO: placeholder
      role: router.query.role !== 'pembaca' ? 'creator' : 'reader',
    })
      .unwrap()
      .then(() => {
        notification.success({ message: 'Success' });
      })
      .catch((err) => {
        if (err instanceof ErrorResponse || err instanceof DbConcurrencyError || err instanceof InternalServerError) {
          notification.error({ message: err.message });
        } else {
          notification.error({ message: 'Error pada sistem!' });
        }
      });
  };

  return (
    <>
      <Heads
        title="Lupa Password Pembaca"
        showNavbar={true}
        showWrappOption={false}
      />
      <div>
        <div className="flex flex-row justify-center">
          <div className="inline-block mt-5 text-center align-top ">
            <Typography.Title className="mb-2.5">
              Lupa Password
            </Typography.Title>
            <Typography.Text className="text-secondary-color">
              Tuliskan email anda, dan anda akan menerima link
            </Typography.Text>
          </div>
        </div>
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            className="px-20 mt-5"
            name="email"
            rules={[
              {
                required: true,
                message: 'Masukkan Email anda!',
              },
            ]}
          >
            <TextInput
              id="email"
              type="email"
              label="Email"
              placeholder="Silahkan tulis email"
              onChange={handleChange}
              value={email}
            />
          </Form.Item>
          <div className="text-center mt-7">
            <StyledButton
              htmlType="submit"
              type="primary"
              label="Kirim Email"
              className="self-center"
              loading={isLoading}
            />
          </div>
          <div className="mt-5 text-center">
            <StyledButton
              type="text"
              label="Kembali Ke Beranda"
              className="self-center"
              icon={<ArrowLeftOutlined />}
              loading={isLoading}
              onClick={async () => {
                await router.push('/');
              }}
            />
          </div>
        </Form>
      </div>
    </>
  );
}
