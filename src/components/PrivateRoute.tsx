import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthProvider';

const PrivateRoute = () => {
  const { firebaseCurrentUser, userData } = useAuth();

  if (!firebaseCurrentUser) return <Navigate to="/login" />;

  if (!userData?.isVerified) {
    return <Navigate to="/verify-email-notice" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
