import StyledButton from '@/components/Button';
import TextInput from '@/components/TextInput';
import Heads from '@/layout/Head/Head';
import { useUbahPassMutation } from '@/services';
import { Form, Typography, notification } from 'antd';
import { useRouter } from 'next/router';

export default function UbahPassword() {
  const { query } = useRouter();
  const [form] = Form.useForm();
  const [UbahPassword, { isLoading }] = useUbahPassMutation();
  const onFinish = (values: any) => {
    UbahPassword({
      newPassword: values.newPassword,
      resetPasswordToken: query.token,
    })
      .unwrap()
      .then((res) => {
        notification.success({ message: res?.message || 'Success' });
        form.resetFields();
      })
      .catch((err) => {
        notification.error({ message: err?.data?.message || 'Error' });
      });
  };

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
            />
          </Form.Item>
          <div className="text-center mt-7">
            <StyledButton
              htmlType="submit"
              type="primary"
              label="Ganti Password"
              className="self-center"
              loading={isLoading}
            />
          </div>
        </Form>
      </div>
    </>
  );
}
