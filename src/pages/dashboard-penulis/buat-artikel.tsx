import { TextEditor } from '@/components/TextEditor';
import Heads from '@/layout/Head/Head';
import WriterLayout from '@/layout/Head/Writer/WriterLayout';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Layout,
  Typography,
  message,
  Upload,
  Input,
  Select,
  Divider,
} from 'antd';
import type { UploadProps } from 'antd/es/upload';

const { Title } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

export default function BuatArtikel() {
  const props = {
    name: 'file',
    showUploadList: false,
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  } satisfies UploadProps;

  return (
    <>
      <Heads title="Buat Artikel" showNavbar={true} showWrappOption={true} />
      <WriterLayout>
        <Layout className="px-4 py-2">
          <div className="flex items-center">
            <Button
              className="mt-[-20px] mr-4 border-none bg-inherit"
              icon={<MenuOutlined style={{ fontSize: '28px' }} />}
            />
            <Title>Tuliskan Artikel Anda</Title>
          </div>
          <div className="grid grid-cols-1">
            <Title level={3}>Photo Artikel</Title>
            <Dragger
              listType="picture-card"
              className="border-2 border-black border-solid min-h-[200px] rounded-md"
              {...props}
            >
              <div className="flex items-center justify-center">
                <PlusOutlined className="text-[28px] mt-[-4px] mr-4" />
                <p className="ant-upload-text">Upload Foto</p>
              </div>
            </Dragger>
            <p style={{ textAlign: 'right', color: '#ca3143' }}>
              jpg, jpeg, png. max 1mb
            </p>
          </div>
          <div className="grid grid-cols-1 mt-4">
            <Title level={3}>Judul Artikel</Title>
            <Input
              className="border-2 border-black border-solid rounded-full"
              placeholder="Tuliskan Judul Artikel Anda"
            />
          </div>
          <div className="grid grid-cols-1 mt-4">
            <Title level={3}>Kategori</Title>
            <Select
              className="w-full overflow-hidden border-2 border-black border-solid rounded-full"
              defaultValue="lucy"
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'disabled',
                  disabled: true,
                  label: 'Disabled',
                },
                {
                  value: 'Yiminghe',
                  label: 'yiminghe',
                },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 mt-4">
            <Title level={3}>Deskripsi Singkat Artikel</Title>
            <TextArea
              className="border-2 border-black border-solid rounded-md"
              rows={10}
              placeholder="Tuliskan deskripsi singkat, minimal 2 paragraph"
            />
          </div>
          <div className="grid grid-cols-1 mt-4">
            <Title level={3}>Tulis Artikel</Title>
            <TextEditor className="overflow-hidden border-2 border-black border-solid rounded-md" />
            <Divider />
          </div>
          <div className="grid justify-center grid-cols-2 gap-4 mt-4">
            <Button href="/dashboard-penulis" type="link">
              Kembali ke dashboard
            </Button>
            <Button className="border-md" type="primary">
              Buat Artikel
            </Button>
          </div>
        </Layout>
      </WriterLayout>
    </>
  );
}
