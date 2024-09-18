import React, { ReactNode } from 'react';
import Background from './ui/components/Background';
import { Toaster } from './ui/Toaster';
import Header from './ui/components/Header';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const omitHeader = ['/login'];
  const pickBG = ['/', '/login'];
  return (
    <>
      {pickBG.includes(location.pathname) && <Background />}
      {!omitHeader.includes(location.pathname) && <Header />}
      <div
        style={{ position: 'relative', zIndex: 2 }}
        className={`${!pickBG.includes(location.pathname) ? 'bg-background-dark' : ''}`}
      >
        {children}
      </div>
      <Toaster richColors closeButton duration={4000} />
    </>
  );
};

export default Layout;
