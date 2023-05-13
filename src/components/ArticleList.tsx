import React, { useEffect } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import StyledButton from './Button';
import { Typography, Col, Row, notification } from 'antd';
import Image from 'next/image';
import { useDeleteArticleMutation } from '@/services';

interface Item {
  id: number;
  preview: string;
  title: string;
  desc: string;
}

interface Props {
  items: Item[];
}

const ArticleList: React.FC<Props> = ({ items }) => {
  const [deleteArticle, { isLoading }] = useDeleteArticleMutation();

  useEffect(() => {

    return () => {

    }
  }, []);

  async function onDelete() {
    deleteArticle({
      id: 1,
    })
      .unwrap()
      .then((res) => {
        notification.success({ message: res?.message || 'Success' });
        // TODO: refetch the article list
      })
      .catch((err) => {
        notification.error({ message: err?.data?.message || 'Error' });
      });
  }

  return (
    <div className="px-4 py-4 text-center">
      <div className="mb-20px">
        <StyledButton
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
                src={item.preview}
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
                  onClick={() => onDelete()}
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
