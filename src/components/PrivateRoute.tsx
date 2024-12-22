import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthProvider';

const PrivateRoute = () => {
  const { firebaseCurrentUser, userData, isAuthReady } = useAuth();

  // Show nothing while auth is initializing to prevent flash
  if (!isAuthReady) {
    return null;
  }

  // Only redirect once we're sure about the auth state
  if (!firebaseCurrentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!userData?.isVerified) {
    return <Navigate to="/verify-email-notice" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
