import { selectUser, selectStatusLoading } from './authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import LoLoadingSpinner from '../ui/components/LoLoadingSpinner';

const ProtectedRoute = () => {
  const user = useSelector(selectUser);
  const statusLoading = useSelector(selectStatusLoading);

  if (statusLoading) {
    return <LoLoadingSpinner />;
  } else {
    if (user.id) {
      return <Outlet />;
    }
  }
  return <Navigate to="/login" replace />;
};
export default ProtectedRoute;
