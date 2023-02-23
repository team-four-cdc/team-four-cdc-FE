import Navbar from '@/components/Navbar';
import Head from 'next/head';

interface HeadsProps {
  title: string;
  showNavbar: boolean;
}
export default function Heads(props: HeadsProps) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {props.showNavbar && <Navbar />}
    </>
  );
}
