import { unsubscribe } from '@/api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Gets '?token=' from URL
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  useEffect(() => {
    const processUnsubscribe = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('No unsubscribe token provided');
        return;
      }

      try {
        setStatus('loading');
        await unsubscribe(token);
        setStatus('success');
      } catch (error) {
        setStatus('error');
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
        );
      }
    };

    processUnsubscribe();
  }, [token]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="mt-4 text-gray-600">
            Processing your unsubscribe request...
          </p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-lg bg-red-50 p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-700">Error</h2>
        <p className="mb-6 text-gray-700">
          {errorMessage ||
            'Sorry, we could not process your unsubscribe request. Please try again or contact support.'}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-lg bg-green-50 p-8 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-green-700">
        Successfully Unsubscribed
      </h2>
    </div>
  );
}
