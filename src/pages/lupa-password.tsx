import StyledButton from '@/components/Button';
import TextInput from '@/components/TextInput';
import Heads from '@/layout/Head/Head';
import { useForgotPasswordMutation } from '@/services';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Form, Typography, notification } from 'antd';
import { useRouter } from 'next/router';
import { useState, ChangeEvent } from 'react';

export default function LupaPassword() {
  const [email, setEmail] = useState<string>('');
  const [_isLoading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const router = useRouter()
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'email') {
      setEmail(event.target.value);
    }
  }

  const onFinish = (values: any) => {
    const { email } = values
    sendEmail()
    forgotPassword({
      email,
      // TODO: placeholder
      role: 'creator'
    })
      .unwrap()
      .then(() => {
        notification.success({ message: 'Success' });
      })
      .catch((err) => {
        notification.error({ message: err?.message });
      });
  };

  // placeholder function
  function sendEmail() {
    setLoading(true);
    setTimeout(() => {
      // alert('Not implemented');
      setLoading(false);
    }, 100);
  }

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
                message: 'Please input your email!',
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
              onClick={() => {
                router.push('/')
              }}
            />
          </div>
        </Form>
      </div>
    </>
  );
}
