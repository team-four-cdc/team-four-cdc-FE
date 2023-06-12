import React, { useEffect } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Typography, Col, Row, notification,
} from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDeleteArticleMutation } from '@/services';
import StyledButton from './Button';
import { DbConcurrencyError, ErrorResponse, InternalServerError } from '@/utils/errorResponseHandler';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

interface Item {
  id: number;
  preview: string;
  title: string;
  desc: string;
}

interface Props {
  items: Item[];
  fetchArticle: () => void;
}

const ArticleList: React.FC<Props> = ({ items, fetchArticle }) => {
  const [deleteArticle, { isLoading }] = useDeleteArticleMutation();
  const route = useRouter();

  useEffect(() => () => { }, []);

  async function onDelete(id: number) {
    deleteArticle({
      id,
    })
      .unwrap()
      .then((res) => {
        notification.success({ message: res.message || 'Success' });
        fetchArticle();
      })
      .catch((err) => {
        if (err instanceof ErrorResponse || err instanceof DbConcurrencyError || err instanceof InternalServerError) {
          notification.error({ message: err.message });
        } else {
          notification.error({ message: 'Error pada sistem!' });
        }
      });
  }

  return (
    <div className="px-4 py-4 text-center w-full">
      <div className="mb-20px">
        <StyledButton
          onClick={() => route.push('/dashboard-penulis/buat-artikel')}
          type="default"
          size="large"
          block
          label="Tambah Artikel"
          className="self-center"
          icon={<PlusOutlined />}
        />
      </div>
      {/* List Component */}
      {items.map((item) => (
        <div key={item.id}>
          <Row className="mb-20px">
            <Col span={6}>
              <Image
                width={161}
                height={112}
                src={`${baseUrl}/media/${item.preview}`}
                alt={'Preview Articel Pics'}
              />
            </Col>
            <Col span={12} className="text-left">
              <div className="display-block pt-20px mb-20px">
                <Typography.Text className="text-14px !text-primary-color font-medium">
                  {item.title}
                </Typography.Text>
              </div>
              <div>
                <Typography.Text className="text-12px !text-secondary-color">
                  {item.desc}
                </Typography.Text>
              </div>
            </Col>
            <Col span={6} className="text-left">
              <div className="py-20px">
                <StyledButton
                  onClick={async () => {
                    await route.push(`/dashboard-penulis/edit-article/${item.id}`);
                  }}
                  type="primary"
                  ghost
                  size="large"
                  label="Ubah"
                  className="self-center"
                  icon={<EditOutlined />}
                />
              </div>
              <div className="mb-20px">
                <StyledButton
                  type="default"
                  onClick={() => onDelete(item.id)}
                  loading={isLoading}
                  danger
                  size="large"
                  label="Hapus"
                  className="self-center"
                  icon={<DeleteOutlined />}
                />
              </div>
            </Col>
          </Row>
        </div>
      ))}
      {/* List Component */}
    </div>
  );
};

export default ArticleList;
