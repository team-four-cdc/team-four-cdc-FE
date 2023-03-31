import DrawerNavigation from '@/components/DrawerNavigation';

export default function CheckComponent() {
  const data = [
    {
      id: 1,
      label: 'Dashboard Overview',
      url: '/',
    },
    {
      id: 2,
      label: 'Daftar Artikel',
      url: '/',
    },
    {
      id: 3,
      label: 'Buat Artikel',
      url: '/',
    },
    {
      id: 4,
      label: 'Profil Penulis',
      url: '/',
    },
    {
      id: 5,
      label: 'Log Out',
      url: '/',
    },
  ];

  return <DrawerNavigation items={data} />;
}
