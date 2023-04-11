import Heads from '@/layout/Head/Head';
import WriterLayout from '@/layout/Head/Writer/WriterLayout';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Layout,
  Row,
  Typography,
  message,
  Upload,
  Input,
  Select,
  Divider,
} from 'antd';
import type { UploadProps } from 'antd';
import React from 'react';

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
        <Layout style={{ padding: '2em 4em' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              style={{
                marginTop: '-20px',
                marginRight: '1em',
                border: 'none',
                background: 'none',
              }}
              icon={<MenuOutlined style={{ fontSize: '28px' }} />}
            />
            <Title>Tuliskan Artikel Anda</Title>
          </div>
          <Row>
            <Col xs={24}>
              <Title level={3}>Photo Artikel</Title>
            </Col>
            <Col xs={24}>
              <Dragger
                style={{
                  border: '1px solid black',
                  borderRadius: '8px',
                  minHeight: '200px',
                }}
                {...props}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PlusOutlined
                    style={{
                      fontSize: '28px',
                      marginTop: '-4px',
                      marginRight: '1em',
                    }}
                  />
                  <p className="ant-upload-text">Upload Foto</p>
                </div>
              </Dragger>
            </Col>
            <Col xs={24}>
              <p style={{ textAlign: 'right', color: '#ca3143' }}>
                jpg, jpeg, png. max 1mb
              </p>
            </Col>
          </Row>
          <Row style={{ marginTop: '1em' }}>
            <Col xs={24}>
              <Title level={3}>Judul Artikel</Title>
            </Col>
            <Col xs={24}>
              <Input
                placeholder="Tuliskan Judul Artikel Anda"
                style={{ border: '1px solid black', borderRadius: '9999px' }}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '1em' }}>
            <Col xs={24}>
              <Title level={3}>Kategori</Title>
            </Col>
            <Col xs={24}>
              <Select
                defaultValue="lucy"
                style={{
                  width: '100%',
                  border: '1px solid black',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}
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
            </Col>
          </Row>
          <Row style={{ marginTop: '1em' }}>
            <Col xs={24}>
              <Title level={3}>Deskripsi Singkat Artikel</Title>
            </Col>
            <Col xs={24}>
              <TextArea
                rows={10}
                style={{ border: '1px solid black', borderRadius: '8px' }}
                placeholder="Tuliskan deskripsi singkat, minimal 2 paragraph"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: '1em' }}>
            <Col xs={24}>
              <Title level={3}>File Artikel</Title>
            </Col>
            <Col xs={24}>
              <Dragger
                style={{
                  border: '1px solid black',
                  borderRadius: '8px',
                  minHeight: '200px',
                }}
                {...props}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PlusOutlined
                    style={{
                      fontSize: '28px',
                      marginTop: '-4px',
                      marginRight: '1em',
                    }}
                  />
                  <p className="ant-upload-text">Upload File Artikel</p>
                </div>
              </Dragger>
            </Col>
            <Col xs={24}>
              <p style={{ textAlign: 'right', color: '#ca3143' }}>
                pdf. max 1mb
              </p>
            </Col>
          </Row>
          <Divider />
          <Row style={{ marginTop: '1em' }} justify="center" gutter={16}>
            <Col
              xs={24}
              md={12}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button href="/dashboard-penulis" type="link">
                Kembali ke dashboard
              </Button>
            </Col>
            <Col
              xs={24}
              md={12}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button style={{ borderRadius: '8px' }} type="primary">
                Buat Artikel
              </Button>
            </Col>
          </Row>
        </Layout>
      </WriterLayout>
    </>
  );
}
