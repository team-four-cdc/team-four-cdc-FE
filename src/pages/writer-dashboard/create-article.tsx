import { TextEditor } from '@/components/TextEditor';
import Heads from '@/layout/Head/Head';
import WriterLayout from '@/layout/Head/Writer/WriterLayout';
import DOMPurify from 'dompurify';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Layout,
  Typography,
  Upload,
  Input,
  Select,
  Divider,
  notification,
} from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { useEffect, useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import Image from 'next/image';
import { useCreateArticleMutation, useGetCategoriesMutation } from '@/services';

const { Title } = Typography;
const { TextArea } = Input;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function CreateArticle() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const [createArticle] = useCreateArticleMutation();
  const [getAllCategories] = useGetCategoriesMutation();
  const [categories, setCategories] = useState<any>([]);
  const [articleData, setArticleData] = useState({
    body: '',
    price: 1,
    title: '',
    picture: null,
    authorId: 2,
    categoryId: 1,
    description: '',
  });

  useEffect(() => {
    getCategories();

    return () => { };
    // eslint-disable-next-line
  }, []);

  function getCategories() {
    getAllCategories()
      .unwrap()
      .then((res) => {
        setCategories(res.data);
      });
  }

  function handleBodyChange(content: string) {
    const temp = { ...articleData };
    temp.body = content;
    setArticleData(temp);
  }

  const handleChange: UploadProps['onChange'] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    if (!!newFileList && newFileList.length > 0) {
      if (!newFileList[0].url && !newFileList[0].preview) {
        newFileList[0].preview = await getBase64(
          newFileList[0].originFileObj as RcFile
        );
      }
      setPreviewImage(newFileList[0].url || (newFileList[0].preview as string));
    }
  };

  function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  async function handleSubmitArticle() {
    const formData = new FormData();
    const file = !!previewImage ? DataURIToBlob(previewImage) : null;
    formData.append('body', DOMPurify.sanitize(articleData.body));
    formData.append('price', articleData.price.toString());
    formData.append('title', articleData.title);
    if (!!previewImage) {
      // @ts-ignore
      formData.append('picture', file, `${fileList[0].name}`);
    }
    formData.append('authorId', articleData.authorId.toString());
    formData.append('categoryId', articleData.categoryId.toString());
    formData.append('description', articleData.description);

    createArticle(formData)
      .then((res: any) => {
        notification.success({ message: res?.message || 'Success' });
      })
      .catch((err) => {
        notification.error({ message: err?.data?.message || 'Error' });
      });
  }

  const uploadButton = (
    <div className="flex items-center justify-center gap-2">
      <PlusOutlined className="mt-2" />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const imgPreview = (
    <Image
      src={previewImage}
      width={350}
      height={200}
      alt="Image Preview"
      className="object-contain"
    />
  );

  return (
    <>
      <Heads title="Buat Artikel" showNavbar={true} showWrappOption={true} />
      <WriterLayout>
        <Layout className="py-2 px-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitArticle();
            }}
          >
            <div className="flex items-center">
              <Button
                className="mt-[-20px] mr-4 border-none bg-inherit"
                icon={<MenuOutlined style={{ fontSize: '28px' }} />}
              />
              <Title>Tuliskan Artikel Anda</Title>
            </div>
            <div className="grid grid-cols-1">
              <Title level={3}>Photo Artikel</Title>
              <Upload
                accept="image/png, image/jpeg, image/jpg"
                className="border-2 border-black border-solid rounded-md flex flex-col justify-center items-center min-h-[300px]"
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
                beforeUpload={(file) => {
                  const isNotImage =
                    file.type !== 'image/png' &&
                    file.type !== 'image/jpg' &&
                    file.type !== 'image/jpeg';
                  if (isNotImage) {
                    notification.error({
                      message: 'The file must be an image!',
                    });
                  }

                  return !isNotImage || Upload.LIST_IGNORE;
                }}
              >
                {fileList.length >= 1 ? imgPreview : uploadButton}
              </Upload>
              <p style={{ textAlign: 'right', color: '#ca3143' }}>
                jpg, jpeg, png. max 1mb
              </p>
            </div>
            <div className="grid grid-cols-1 mt-4">
              <Title level={3}>Judul Artikel</Title>
              <Input
                value={articleData.title}
                onChange={(e) => {
                  const temp = { ...articleData };
                  temp.title = e.target.value;
                  setArticleData(temp);
                }}
                className="border-2 border-black border-solid rounded-full"
                placeholder="Tuliskan Judul Artikel Anda"
              />
            </div>
            <div className="grid grid-cols-1 mt-4">
              <Title level={3}>Kategori</Title>
              <Select
                value={articleData.categoryId}
                onChange={(e) => {
                  const temp = { ...articleData };
                  temp.categoryId = e;
                  setArticleData(temp);
                }}
                className="border-2 border-black border-solid w-full rounded-full overflow-hidden"
                defaultValue={categories.length > 0 ? categories[0].name : null}
                options={categories.map((val: any) => {
                  return {
                    value: val.id,
                    label: val.name.charAt(0).toUpperCase() + val.name.slice(1),
                  };
                })}
              />
            </div>
            <div className="grid grid-cols-1 mt-4">
              <Title level={3}>Deskripsi Singkat Artikel</Title>
              <TextArea
                value={articleData.description}
                onChange={(e) => {
                  const temp = { ...articleData };
                  temp.description = e.target.value;
                  setArticleData(temp);
                }}
                className="border-2 border-solid border-black rounded-md"
                rows={10}
                placeholder="Tuliskan deskripsi singkat, minimal 2 paragraph"
              />
            </div>
            <div className="grid grid-cols-1 mt-4">
              <Title level={3}>Tulis Artikel</Title>
              <TextEditor
                currentValue={articleData.body}
                handleBodyChange={handleBodyChange}
                className="border-2 border-black border-solid rounded-md overflow-hidden"
              />
              <Divider />
            </div>
            <div className="grid grid-cols-2 mt-4 justify-center gap-4">
              <Button htmlType="reset" href="/dashboard-penulis" type="link">
                Kembali ke dashboard
              </Button>
              <Button htmlType="submit" className="border-md" type="primary">
                Buat Artikel
              </Button>
            </div>
          </form>
        </Layout>
      </WriterLayout>
    </>
  );
}
