import React from 'react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} | Your Store</title>
        <meta name="description" content={`${title} page for our e-commerce store`} />
      </Head>
      <Header />
      <main className="static-page-container">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;