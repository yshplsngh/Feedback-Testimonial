import React, { ReactNode } from 'react';
import Background from './ui/components/Background';
import { Toaster } from './ui/Toaster';
import Header from './ui/components/Header';
import { useLocation } from 'react-router-dom';
import Footer from './ui/components/Footer';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const footerOnly = ['/', 'privacy-policy'];
  return (
    <>
      <Background />
      <Toaster richColors closeButton duration={4000} />
      {location.pathname !== '/login' && <Header />}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
        {footerOnly.includes(location.pathname) && <Footer />}
      </div>
    </>
  );
};

export default Layout;
