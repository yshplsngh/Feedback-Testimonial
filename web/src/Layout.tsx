import React, { ReactNode } from 'react';
import Background from './ui/components/Background';
import { Toaster } from './ui/Toaster';
import Header from './ui/components/Header';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const omitHeader = ['/login'];
  const pickBG = ['/', '/login'];

  const shouldOmitHeader = () => {
    return omitHeader.some(
      (path) =>
        location.pathname === path || location.pathname.startsWith(`${path}/`),
    );
  };

  return (
    <>
      {/*show bg only for pickBG arrays endpoints*/}
      {pickBG.includes(location.pathname) && <Background />}

      {/*remove header only for omitHeader arrays endpoint*/}
      {!shouldOmitHeader() && <Header />}
      <div
        style={{ position: 'relative', zIndex: 2 }}
        // show black bg for all endpoints other than pickBG arrays one
        className={`${!pickBG.includes(location.pathname) ? 'bg-whitish' : ''} flex justify-center`}
      >
        <div className={'min-h-[45rem] w-[80rem]'}>{children}</div>
      </div>
      <Toaster richColors closeButton duration={4000} />
    </>
  );
};

export default Layout;
