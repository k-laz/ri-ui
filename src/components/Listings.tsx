// Listings.tsx
import { useUserStore } from '@/hooks/useUser';
import { useState } from 'react';
import { AlertMessage, AlertState } from '@/components/ui/alert_message';

const Listings = () => {
  const { userData } = useUserStore();
  const [alertState, setAlertState] = useState<AlertState>({
    show: false,
    message: '',
    type: 'success',
  });

  const handleCloseAlert = () => {
    setAlertState((prev) => ({ ...prev, show: false }));
  };

  if (!userData) {
    return null;
  }

  if (userData.listings.length === 0) {
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
