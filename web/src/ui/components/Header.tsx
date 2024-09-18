import Button from './Button';
import { FileText, SquarePlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  logoutUser,
  selectUser,
  selectStatusLoading,
} from '../../auth/authSlice';
import LoadingSpinner from './LoadingSpinner';
import { AppDispatch } from '../../app/store';
import { useState } from 'react';

function Header() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const statusLoading = useSelector(selectStatusLoading);
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);

  function handleLogout() {
    setLoading(true);
    dispatch(logoutUser());
    setLoading(false);
  }

  const dashboardBtn = (
    <Link to={`/dashboard`}>
      <Button type={'button'} variant={'outlineB'} text={'Dashboard'} />
    </Link>
  );
  const logoutBtn = (
    <Link to={'/'}>
      <Button
        type={'button'}
        variant={'danger'}
        text={'LogOut'}
        onClick={() => handleLogout()}
        loading={loading}
      />
    </Link>
  );
  const createSpaceBtn = (
    <Link to={'/new-space'}>
      <Button
        type={'button'}
        variant={'secondary'}
        text={`create Project`}
        icon={<SquarePlus className={'h-4 w-4'} />}
      />
    </Link>
  );
  const loginBtn = (
    <Link to="/login">
      <Button type={'button'} variant={'outlineB'} text={'Login'} />
    </Link>
  );
  //
  // if (mainLoading) {
  //   // coz header already contain mainLoading
  //   content = <div/>
  // } else {
  //   if (user.id) {
  //     content = <>{dashboardBtn}{LogoutBtn}</>
  //     if (location.pathname === '/dashboard') {
  //       content = <>{createSpaceBtn}{dashboardBtn}{LogoutBtn}</>;
  //     }
  //   } else {
  //     content = loginBtn;
  //   }
  // }

  const renderContent = () => {
    if (!user.id) {
      return <>{loginBtn}</>;
    }
    if (location.pathname === '/dashboard') {
      return (
        <>
          {createSpaceBtn}
          {dashboardBtn}
          {logoutBtn}
        </>
      );
    }
    return (
      <>
        {dashboardBtn}
        {logoutBtn}
      </>
    );
  };

  return (
    <div
      className={
        'sticky top-0 z-50 mx-auto items-center justify-between border-b-2 border-zinc-800 bg-zinc-900 bg-opacity-30 bg-clip-padding px-6 py-1 backdrop-blur-sm backdrop-filter md:px-16'
      }
    >
      <div className="flex items-center justify-between px-9 py-2">
        <div className="px-4 py-2 text-xl md:text-3xl">
          <Link to={'/'} className="flex items-center space-x-1">
            <span className="font-bold text-[#fe640b]">Soul Goodman</span>
            <FileText className="h-6 w-6" />
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          {statusLoading ? <LoadingSpinner /> : renderContent()}

          {/*<Link to={'/'}>*/}
          {/*  <Button variant={'primary'} className="md:block hidden" text={'Pro member'} />*/}
          {/*</Link>*/}
          {/*<Link to={'/'}>*/}
          {/*  <Button variant={'primary'} className="sm md:hidden flex" text={'pro member'} />*/}
          {/*</Link>*/}
        </div>
      </div>
    </div>
  );
}

export default Header;
