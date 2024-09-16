import { selectUser, selectUserStatus } from './authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from '../ui/components/LoadingSpinner';

const ProtectedRoute = () => {
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectUserStatus);

  if (userStatus === 'pending') {
    return <LoadingSpinner />;
  } else if (userStatus === 'fulfilled') {
    if (user.id) {
      return <Outlet />;
    }
  }
  return <Navigate to="/login" replace />;
};
export default ProtectedRoute;
