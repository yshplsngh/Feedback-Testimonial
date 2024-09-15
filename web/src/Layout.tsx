import React, { ReactNode } from 'react';
import Background from './ui/components/Background';
import { Toaster } from './ui/Toaster';
// import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const location = useLocation();
  return (
    <>
      <Background />
      <Toaster richColors closeButton duration={4000} />
      {/*{location.pathname !== '/login' && <Header />}*/}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </>
  );
};

export default Layout;
