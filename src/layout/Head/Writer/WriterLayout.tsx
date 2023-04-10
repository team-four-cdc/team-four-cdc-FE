import DrawerList from './DrawerList';

export default function WriterLayout({ children }: any) {
  return (
    <div className="flex">
      <DrawerList />
      {children}
    </div>
  );
}
