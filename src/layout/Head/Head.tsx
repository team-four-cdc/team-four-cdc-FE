import React from 'react';
import Navbar from '@/components/Navbar';

interface HeadsProps {
  title: string;
  showNavbar: boolean;
  showWrappOption?: boolean;
}
export default function Heads({
  showNavbar,
  showWrappOption = true,
}: HeadsProps) {
  return (
    <>
      {showNavbar && <Navbar showWrapperOption={showWrappOption} />}
    </>
  );
}
