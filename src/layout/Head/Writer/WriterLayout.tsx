import React from 'react';
import DrawerList from './DrawerList';

export default function WriterLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex">
      <DrawerList />
      {children}
    </div>
  );
}
