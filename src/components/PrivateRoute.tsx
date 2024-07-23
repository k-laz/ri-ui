import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthProvider';

const PrivateRoute = () => {
  const { firebaseCurrentUser } = useAuth();

  if (!firebaseCurrentUser) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
