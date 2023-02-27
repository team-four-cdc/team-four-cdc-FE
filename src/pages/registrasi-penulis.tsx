import StyledButton from '@/components/Button';
import TextInput from '@/components/TextInput';
import { checkEmail } from '@/utils';
import { EditFilled } from '@ant-design/icons';
import { Form, Typography } from 'antd';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import Illustration from '../../public/register-illustration-creator.svg';

export default function RegistrasiPenulis() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [creatorRegForm] = Form.useForm();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.id === 'fullName') {
      setFullName(event.target.value);
    }
    if (event.target.id === 'email') {
      setEmail(event.target.value);
    }
    if (event.target.id === 'password') {
      setPassword(event.target.value);
    }
  }

  function checkRegistrationParams(
    name: string,
    email: string,
    password: string
  ): string[] {
    let out: string[] = [];
    if (name.length === 0) {
      out.push('Nama harus diisi');
    }
    if (email.length === 0) {
      out.push('Email harus diisi');
    } else if (!checkEmail(email)) {
      out.push('Email harus diisi dengan format ____@____.___');
    }
    if (password.length === 0) {
      out.push('Password harus diisi');
    } else if (password.length < 8) {
      out.push('Panjang password minimum 8 karakter');
    }
    return out;
  }

  // placeholder function
  function register() {
    const errors = checkRegistrationParams(fullName, email, password);
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      alert('Not implemented');
      setLoading(false);
    }, 100);
  }

  return (
    <div className="flex flex-wrap justify-center px-2 py-8 gap-14">
      <Image
        src={Illustration}
        alt="Registrasi sebagai pembaca"
        className="hidden align-top sm:inline-block"
        width={400}
      />

      <div className="inline-block ml-4 align-top align-center w-11/12 sm:w-4/5 lg:w-1/2">
        <div>
          <Typography.Title className="mb-1">Daftar</Typography.Title>
          <Typography.Text>
            Punya berita, cerita, atau ilmu menarik yang ingin kamu bagikan, dan
            ingin mendapat hasil dari menulis? Gabung yuk sebagai penulis!
          </Typography.Text>
        </div>

        <Form
          form={creatorRegForm}
          className="mt-6"
          onFinish={() => register()}
        >
          <Form.Item
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Nama harus diisi',
              },
            ]}
          >
            <TextInput
              id="fullName"
              type="text"
              autoComplete="name"
              label="Nama Penulis"
              placeholder="Silahkan tulis nama"
              onChange={handleChange}
              value={fullName}
            />
          </Form.Item>
          <div className="h-5" />
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
              },
            ]}
          >
            <TextInput
              id="password"
              type="password"
              label="Password"
              placeholder="Silahkan tulis password"
              onChange={handleChange}
              value={password}
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
          </div>
        </Form>
      </div>
    </div>
  );
}
