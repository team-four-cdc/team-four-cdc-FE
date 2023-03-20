import StyledButton from '@/components/Button';
import TextInput from '@/components/TextInput';
import { EditFilled } from '@ant-design/icons';
import { Form, notification, Typography } from 'antd';
import Image from 'next/image';
import Illustration from '../../public/register-illustration-reader.svg';
import Heads from '@/layout/Head/Head';
import { useRegisterMutation } from '@/services';

export default function RegistrasiPembaca() {
  const [creatorRegForm] = Form.useForm();
  const [register, result] = useRegisterMutation();

  function onFinish(values: any) {
    register({ ...values, role: 'reader', full_name: 'test', author: 'test' })
      .unwrap()
      .then((res) => {
        notification.success({ message: res?.data?.message });
      })
      .catch((err) => {
        notification.error({ message: err?.data?.message });
      });
  }

  return (
    <>
      <Heads title="Registrasi Pembaca" showNavbar={true} />
      <div className="flex flex-wrap justify-center px-2 py-8 gap-14">
        <Image
          src={Illustration}
          alt="Registrasi sebagai pembaca"
          className="hidden align-top sm:inline-block"
          width={400}
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
                loading={result.isLoading}
              />
              <div className="h-5" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
