import React from 'react';
import DrawerList from './DrawerList';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <DrawerList />
      {children}
    </div>
  );
}
