import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';

interface HeadsProps {
  title: string;
  showNavbar: boolean;
  showWrappOption?: boolean;
}
export default function Heads({
  showNavbar,
  title,
  showWrappOption = true,
}: HeadsProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showNavbar && <Navbar showWrapperOption={showWrappOption} />}
    </>
  );
}
