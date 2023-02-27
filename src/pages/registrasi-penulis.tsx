import StyledButton from '@/components/Button';
import TextInput from '@/components/TextInput';
import { EditFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import Illustration from '../../public/register-illustration-creator.svg';

export default function RegistrasiPenulis() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

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

  // placeholder function
  function register() {
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
            ingin mendapat hasil dari menulis? Gabung yuk sebagai penulis
          </Typography.Text>
        </div>

        <div className="mt-6">
          <TextInput
            id="fullName"
            type="text"
            label="Nama Penulis"
            placeholder="Silahkan tulis nama"
            onChange={handleChange}
            value={fullName}
            required
          />
          <div className="h-5" />
          <TextInput
            id="email"
            type="email"
            label="Email"
            placeholder="Silahkan tulis email"
            onChange={handleChange}
            value={email}
            required
          />
          <div className="h-5" />
          <TextInput
            id="password"
            type="password"
            label="Password"
            placeholder="Silahkan tulis password"
            onChange={handleChange}
            value={password}
            required
          />
          <div className="h-5" />
          <div className="text-center">
            <StyledButton
              type="primary"
              label="Daftarkan Akun"
              className="self-center"
              icon={<EditFilled />}
              loading={isLoading}
              onClick={() => {
                register();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
