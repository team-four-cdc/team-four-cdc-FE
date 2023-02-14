import { Modal, ModalProps, Typography } from 'antd';
import TextInput from '@/components/TextInput';
import StyledButton from '@/components/Button';
import Link from 'next/link';

export type UserRole = 'pembaca' | 'penulis';

interface Props extends ModalProps {
  visible: boolean;
  role: UserRole;
}

const LoginModal = (props: Props) => {
  const { visible, role, ...modalProps } = props;

  const text = {
    pembaca: 'Login dulu yuk, agar dapat membaca lebih menyenangkan dengan',
    penulis: 'Bagikan tulisanmu untuk pembaca, ayo gabung sebagai penulis',
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
      <TextInput
        label="Email"
        className="mt-10px mb-35px"
        placeholder="Silakan tulis email"
      />
      <TextInput
        type="password"
        label="Password"
        className="mt-10px mb-35px"
        placeholder="Silakan tulis email"
      />
      <div className="text-center">
        <StyledButton type="primary" label="Login" className="mb-10px" />
        <Typography.Paragraph className="mb-0 text-12px">
          Anda belum punya akun ?
          <Link href="/registrasi-pembaca"> Registrasi </Link>
        </Typography.Paragraph>
      </div>
    </Modal>
  );
};

export default LoginModal;
