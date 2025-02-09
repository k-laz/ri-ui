import { useUserStore } from '@/hooks/useUser';
import { useState, useEffect } from 'react';
import { AlertMessage, AlertState } from '@/components/ui/alert_message';
import { useAuth } from '@/hooks/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

const Listings = () => {
  const { currentUser } = useAuth();
  const { userData, fetchUserData } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [alertState, setAlertState] = useState<AlertState>({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser && !userData) {
        try {
          const token = await currentUser.getIdToken();
          await fetchUserData(token);
        } catch (error) {
          setAlertState({
            show: true,
            message: 'Failed to load listings. Please try again.',
            type: 'error',
          });
        }
      }
      setIsLoading(false);
    };

    loadUserData();
  }, [currentUser, userData, fetchUserData]);

  const handleCloseAlert = () => {
    setAlertState((prev) => ({ ...prev, show: false }));
  };

  if (isLoading) {
    return (
      <div className="mt-12 flex min-h-[200px] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="mt-12 flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
        <div>
          <p className="text-lg font-medium text-gray-900">
            Error loading listings
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Please refresh the page to try again
          </p>
        </div>
      </div>
    );
  }

  if (!userData.listings || userData.listings.length === 0) {
    return (
      <div className="mt-12 flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
        <div>
          <p className="text-lg font-medium text-gray-900">No listings found</p>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters to see more results
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <AlertMessage
        message={alertState.message}
        type={alertState.type}
        isVisible={alertState.show}
        onClose={handleCloseAlert}
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ul>
          {userData.listings.map((listing) => (
            <li key={listing.id}>
              {listing.title} - {listing.link}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Listings;
