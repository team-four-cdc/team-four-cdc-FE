import React from 'react';
import { EditFilled } from '@ant-design/icons';
import { Form, notification, Typography } from 'antd';
import Image from "next/legacy/image";
import TextInput from '@/components/TextInput';
import StyledButton from '@/components/Button';
import Heads from '@/layout/Head/Head';
import { useRegisterMutation } from '@/services';
import { DbConcurrencyError, ErrorResponse, InternalServerError } from '@/utils/errorResponseHandler';

export default function ReaderRegister() {
  const [creatorRegForm] = Form.useForm();
  const [register, { isLoading }] = useRegisterMutation();

  function onFinish(values: { role: string; email: string; password: string; author?: string; full_name?: string }) {
    register({ ...values, role: 'reader', full_name: values.email })
      .unwrap()
      .then((res) => {
        notification.success({ message: res?.message || 'Success' });
        creatorRegForm.resetFields();
      })
      .catch((err) => {
        if (err instanceof ErrorResponse || err instanceof DbConcurrencyError || err instanceof InternalServerError) {
          notification.error({ message: err.message });
        } else {
          notification.error({ message: 'Error pada sistem!' });
        }
      });
  }

  return (
    <>
      <Heads title="Registrasi Pembaca" showNavbar={true} />
      <div className="flex flex-wrap justify-center px-2 py-8 gap-14">
        <Image
          src={'/register-illustration-reader.svg'}
          alt="Registrasi sebagai pembaca"
          className="hidden align-top sm:inline-block"
          width={400}
          height={400}
        />

        <div className="inline-block w-11/12 ml-4 align-top align-center sm:w-4/5 lg:w-1/2">
          <div>
            <Typography.Title className="mb-1">Daftar</Typography.Title>
            <Typography.Text>
              Ingin baca artikel lebih lengkap? Daftar dulu agar kamu menikmati
              dalam membaca
            </Typography.Text>
          </div>

          <Form
            form={creatorRegForm}
            className="mt-6"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Email harus diisi',
                },
                {
                  type: 'email',
                  message: 'Email harus diisi dengan format ____@____.___',
                  validateTrigger: 'onBlur',
                },
              ]}
            >
              <TextInput
                type="email"
                label="Email"
                placeholder="Silahkan tulis email"
              />
            </Form.Item>
            <div className="h-5" />
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Password harus diisi',
                },
                {
                  min: 8,
                  message: 'Panjang password minimum 8 karakter',
                  validateTrigger: 'onBlur',
                },
              ]}
            >
              <TextInput
                type="password"
                label="Password"
                placeholder="Silahkan tulis password"
              />
            </Form.Item>
            <div className="h-5" />
            <div className="text-center">
              <StyledButton
                type="primary"
                htmlType="submit"
                label="Daftarkan Akun"
                className="self-center"
                icon={<EditFilled />}
                loading={isLoading}
              />
              <div className="h-5" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
