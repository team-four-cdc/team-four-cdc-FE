import StyledButton from '@/components/Button';
import TextInput from '@/components/TextInput';
import Heads from '@/layout/Head/Head';
import { Form, Typography } from 'antd';
import { useState, ChangeEvent } from 'react';

export default function UbahPassword() {
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'password') {
      setPassword(event.target.value);
    }
  }

  function handleChangeNewPassword(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'newPassword') {
      setNewPassword(event.target.value);
    }
  }

  const onFinish = (values: any) => {
    console.log(values);
  };

  // placeholder function
  function sendEmail() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }

  return (
    <>
      <Heads title="Ubah Password" showNavbar={true} showWrappOption={false} />
      <div>
        <div className="flex flex-row justify-center">
          <div className="inline-block mt-5 text-center align-top ">
            <Typography.Title className="mb-2.5">
              Ubah Password
            </Typography.Title>
            <Typography.Text className="text-secondary-color">
              Silakan masukan password baru anda
            </Typography.Text>
          </div>
        </div>
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            className="px-20 mt-5"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <TextInput
              id="password"
              type="password"
              label="Password Baru"
              placeholder="Password Baru anda"
              onChange={handleChange}
              value={password}
            />
          </Form.Item>
          <Form.Item
            className="px-20 mt-5"
            name="newPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <TextInput
              id="newPassword"
              type="password"
              label="Konfirmasi Password Baru"
              placeholder="Mohon untuk periksa kembali password anda"
              onChange={handleChangeNewPassword}
              value={newPassword}
            />
          </Form.Item>
          <div className="text-center mt-7">
            <StyledButton
              htmlType="submit"
              type="primary"
              label="Ganti Password"
              className="self-center"
              loading={isLoading}
              onClick={() => {
                sendEmail();
              }}
            />
          </div>
        </Form>
      </div>
    </>
  );
}
