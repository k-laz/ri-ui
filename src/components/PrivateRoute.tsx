import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthProvider';
import { useUserStore } from '@/hooks/useUser';

const PrivateRoute = () => {
  const { currentUser, isAuthReady } = useAuth();
  const { userData } = useUserStore();

  // Show nothing while auth is initializing to prevent flash
  if (!isAuthReady) {
    return null;
  }

  // Only redirect once we're sure about the auth state
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!userData?.isVerified) {
    return <Navigate to="/verify-email-notice" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
