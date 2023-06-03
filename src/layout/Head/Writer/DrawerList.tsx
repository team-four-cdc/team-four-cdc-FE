import DrawerNavigation from '@/components/DrawerNavigation';

export default function DrawerList() {
  const url = `/dashboard-penulis`;
  const data = [
    {
      id: 1,
      label: 'Dashboard Overview',
      url: `${url}`,
    },
    {
      id: 2,
      label: 'Daftar Artikel',
      url: `${url}/daftar-artikel`,
    },
    {
      id: 3,
      label: 'Buat Artikel',
      url: `${url}/buat-artikel`,
    },
    {
      id: 4,
      label: 'Profil Penulis',
      url: '',
    },
    {
      id: 5,
      label: 'Log Out',
      url: '',
    },
  ];

  return (
    <>
      <DrawerNavigation items={data} />
    </>
  );
}
