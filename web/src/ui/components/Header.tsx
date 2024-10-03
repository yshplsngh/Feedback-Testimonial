import Button from './Button';
import { Activity, SquarePlus, PackageCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectStatusLoading } from '../../auth/authSlice';
import LoadingSpinner from './LoadingSpinner';
import { AppDispatch } from '../../app/store';
import { useState } from 'react';
import { logoutUser } from '../../auth/authApi';
import { FetchResponseError } from '../../lib/manageFetch/api';
import { toast } from 'sonner';

function Header() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const statusLoading = useSelector(selectStatusLoading);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (err) {
      const errorMessage =
        (err as FetchResponseError).message ||
        'An error occurred while sending feedback';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
        text={'Sign out'}
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
  const testingBtn = (
    <Link to={'http://localhost:5000'} target={'_blank'}>
      <Button
        type={'button'}
        variant={'secondary'}
        text={'testing page'}
        icon={<PackageCheck className={'h-4 w-4'} />}
      />
    </Link>
  );
  const loginBtn = (
    <Link to="/login">
      <Button type={'button'} variant={'outlineB'} text={'Login'} />
    </Link>
  );

  return (
    <div
      className={
        'sticky top-0 z-50 mx-auto max-w-[100rem] items-center justify-between border-b-2 border-zinc-800 bg-zinc-900 bg-opacity-30 bg-clip-padding px-6 py-1 backdrop-blur-sm backdrop-filter md:px-16'
      }
    >
      <div className="flex items-center justify-between px-9 py-2">
        <div className="px-4 py-2 text-xl md:text-3xl">
          <Link to={'/'} className="flex items-center space-x-1">
            <span className="text-orange font-bold">Chuck</span>
            <Activity className="h-6 w-6" />
          </Link>
        </div>

        {/*remove all button on feedback page*/}
        {!location.pathname.startsWith('/feedback/') && (
          <div className="flex items-center gap-x-2">
            {statusLoading ? (
              <LoadingSpinner />
            ) : !user.id ? (
              loginBtn
            ) : (
              <>
                {location.pathname === '/dashboard' && createSpaceBtn}
                {dashboardBtn}
                {logoutBtn}
              </>
            )}
            {testingBtn}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
