import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthProvider';
import { useUserStore } from '@/hooks/useUser';
import { useEffect, useState } from 'react';

const PrivateRoute = () => {
  const { currentUser, isAuthReady } = useAuth();
  const { userData, fetchUserData } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser && !userData) {
        try {
          await fetchUserData(await currentUser.getIdToken());
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
      setIsLoading(false);
    };

    if (isAuthReady) {
      loadUserData();
    }
  }, [currentUser, isAuthReady, userData, fetchUserData]);

  // Show nothing while either auth is initializing or we're loading user data
  // This prevents any unwanted flashes or redirects
  if (!isAuthReady || isLoading) {
    return null;
  }

  // Only redirect once we're sure about both auth and user data states
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // We can now safely check userData since we've waited for it to load
  if (!userData?.isVerified) {
    return <Navigate to="/verify-email-notice" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
