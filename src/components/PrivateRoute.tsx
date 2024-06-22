import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth?.userData) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
