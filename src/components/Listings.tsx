// Listings.tsx
import { useUserStore } from '@/hooks/useUser';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/components/ui/alert_message';
import { Listing } from '@/types';

const Listings = () => {
  const { userData } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      if (!userData) return;

      setIsLoading(true);
      setError(null);

      try {
        // Construct the query parameters based on user filters
        const queryParams = new URLSearchParams();

        if (userData.filter) {
          // Add each filter to query params
          Object.entries(userData.filter).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
              queryParams.append(key, String(value));
            }
          });
        }

        // Make the API call
        const response = await fetch(`/api/listings?${queryParams.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json();
        setListings(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while fetching listings',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [userData]); // Re-fetch when userData (including filters) changes

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!userData) {
    return (
      <Alert>
        <AlertTitle>No User Data</AlertTitle>
        <AlertDescription>Please log in to view listings</AlertDescription>
      </Alert>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-8 text-center">
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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default Listings;
