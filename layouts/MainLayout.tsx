import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode
  title: string
}

const Navbar = dynamic(import('@/components/Navbar'), {ssr: false})

const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Somos un centro psicoterapéutico altamente especializado en promover el bienestar de la salud mental." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className='grid grid-rows-[auto_1fr_auto] min-h-screen w-full'>
        <Navbar />
        <main className='w-full max-w-[1280px] mx-auto'>
          {
            children
          }
        </main>
        <Footer />
      </div>
    </>
  );
}
export default MainLayout;