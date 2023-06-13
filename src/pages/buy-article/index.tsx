import React from 'react';
import {
  Button, Divider, Input, Layout, Typography,
} from 'antd';
import Image from 'next/image';
import { MenuOutlined } from '@ant-design/icons';
import Heads from '@/layout/Head/Head';

export default function BuyArticle() {
  return (
    <Layout>
      <Heads title="Beli Artikel" showNavbar showWrappOption />

      <section className="flex flex-col items-center">
        <div className="flex gap-2 mt-10">
          <Image
            src={'/image-preview.png'}
            alt="Article Preview"
            width={200}
            height={200}
            className="object-contain"
          />
          <div className="flex flex-col h-full justify-center gap-3">
            <div className="flex gap-2 items-center">
              <div className="rounded-full w-[25px] h-[25px] bg-[#DDD] p-2" />
              <Typography.Text className="text-md !text-primary-color">
                Ahmad Munasir
              </Typography.Text>
            </div>
            <Typography.Text className="text-lg !text-primary-color max-w-[350px] text-wrap">
              The 1619 Project, MLK, and the Subtle Indignity of a Lazy History
              Teacher’s Assignment
            </Typography.Text>
            <Typography.Text
              strong
              type="success"
              className="text-lg max-w-[350px]"
            >
              Harga Rp. 10.000.000
            </Typography.Text>
          </div>
        </div>
        <Divider />

        <section className="flex flex-col justify-center mt-10">
          <div className="flex gap-2 items-center justify-center">
            <Button
              className="mt-[-15px] mr-4 border-none bg-inherit"
              icon={<MenuOutlined style={{ fontSize: '28px' }} />}
            />
            <Typography.Title className="">Detail Pembayaran</Typography.Title>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-center gap-1">
              <Typography.Text className="">Nama Akun</Typography.Text>
              <Input
                className="border-2 border-black border-solid rounded-full"
                placeholder="Nama Akun Bank Anda"
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <Typography.Text className="">Nomor Rekening</Typography.Text>
              <Input
                className="border-2 border-black border-solid rounded-full"
                placeholder="Input Rekening Anda"
              />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <Typography.Text className="">Nama Bank</Typography.Text>
              <Input
                className="border-2 border-black border-solid rounded-full"
                placeholder="Sialahkan Input Nama Bank"
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 my-4">
            <Button htmlType="reset" href="/dashboard-penulis" type="link">
              Kembali ke dashboard
            </Button>
            <Button htmlType="submit" className="border-md" type="primary">
              Bayar Artikel
            </Button>
          </div>
        </section>
      </section>
    </Layout>
  );
}
