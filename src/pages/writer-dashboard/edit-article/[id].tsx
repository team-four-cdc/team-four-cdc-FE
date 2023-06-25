import React, { useEffect, useState } from 'react';
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
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';
import { UploadProps } from 'antd/es/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import { GetCategoriesResponse, UpdateArticleRequest, useGetCategoriesMutation, useUpdateArticleMutation } from '@/services';
import { TextEditor } from '@/components/TextEditor';
import WriterLayout from '@/layout/Head/Writer/WriterLayout';
import Heads from '@/layout/Head/Head';
import { getTypedFormData } from '@/utils/formDataTyper';
import { DbConcurrencyError, ErrorResponse, InternalServerError } from '@/utils/errorResponseHandler';

interface TempArticleIF {
  body: string;
  price: string;
  title: string;
  preview: string;
  author_id: number;
  category_id: number;
  desc: string;
}

const getBase64 = (file: RcFile): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = (error) => reject(error);
});

const { Title } = Typography;
const { TextArea } = Input;

export default function EditArticle() {
  const [getAllCategories] = useGetCategoriesMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [categories, setCategories] = useState<GetCategoriesResponse["data"]>([]);
  const [previewImage, setPreviewImage] = useState('');
  const router = useRouter();
  const { id: articleId } = router.query;
  const [articleData, setArticleData] = useState({
    body: '',
    price: '',
    title: '',
    picture: '',
    authorId: 2,
    categoryId: 1,
    description: '',
  });

  useEffect(() => {
    const article: TempArticleIF = {
      category_id: 0,
      price: '',
      title: '',
      preview: '',
      body: '',
      desc: '',
      author_id: 0
    };
    if (article) {
      const temp = { ...articleData };
      temp.body = article.body;
      temp.price = article.price;
      temp.title = article.title;
      temp.picture = article.preview;
      temp.authorId = article.author_id;
      temp.categoryId = article.category_id;
      temp.description = article.desc;

      setArticleData(temp);
      getCategories();
    } else {
      router.back();
    }

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

  // eslint-disable-next-line
  const handleChange: UploadProps['onChange'] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    if (!!newFileList && newFileList.length > 0) {
      if (!newFileList[0].url && !newFileList[0].preview) {
        newFileList[0].preview = await getBase64(
          newFileList[0].originFileObj as RcFile,
        );
      }
      setPreviewImage(newFileList[0].url || (newFileList[0].preview as string));
    }
  };

  function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  async function handleSubmitArticle() {
    const formData = getTypedFormData<UpdateArticleRequest>();
    const file = previewImage ? DataURIToBlob(previewImage) : null;
    formData.append('body', DOMPurify.sanitize(articleData.body));
    formData.append('price', articleData.price.toString());
    formData.append('title', articleData.title);
    if (previewImage) {
      formData.append('picture', (file as File), `${fileList[0].name}`);
    }
    formData.append('authorId', articleData.authorId.toString());
    formData.append('categoryId', articleData.categoryId.toString());
    formData.append('description', articleData.description);
    formData.append('id', articleId as unknown as number);

    updateArticle(formData)
      .unwrap()
      .then((res) => {
        notification.success({ message: res?.message || 'Success' });
      })
      .catch((err) => {
        if (err instanceof ErrorResponse || err instanceof DbConcurrencyError || err instanceof InternalServerError) {
          notification.error({ message: err.message });
        } else {
          notification.error({ message: 'Error pada sistem!' });
        }
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
      <Heads title="Edit Artikel" showNavbar={true} showWrappOption={true} />
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
                  const isNotImage = file.type !== 'image/png'
                    && file.type !== 'image/jpg'
                    && file.type !== 'image/jpeg';
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
                onChange={(e: number) => {
                  const temp = { ...articleData };
                  temp.categoryId = e;
                  setArticleData(temp);
                }}
                className="border-2 border-black border-solid w-full rounded-full overflow-hidden"
                defaultValue={categories.length > 0 ? categories[0].id : undefined}
                options={categories.map((val) => ({
                  value: val.id,
                  label: val.name.charAt(0).toUpperCase() + val.name.slice(1),
                }))}
              />
            </div>
            <div className="grid grid-cols-1 mt-4">
              <Title level={3}>Deskripsi Singkat Artikel</Title>
              <TextArea
                onChange={(e) => {
                  const temp = { ...articleData };
                  temp.description = e.target.value;
                  setArticleData(temp);
                }}
                className="border-2 border-solid border-black rounded-md"
                rows={10}
                placeholder="Tuliskan deskripsi singkat, minimal 2 paragraph"
                value={articleData.description}
              ></TextArea>
            </div>
            <div className="grid grid-cols-1 mt-4">
              <Title level={3}>Tulis Artikel</Title>
              <TextEditor
                currentValue={DOMPurify.sanitize(articleData.body)}
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
                Edit Artikel
              </Button>
            </div>
          </form>
        </Layout>
      </WriterLayout>
    </>
  );
}
