import { verifyEmail } from '@/api';
import { useAuth } from '@/hooks/AuthProvider';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const { refreshUserData } = useAuth();

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          console.log('token invalid');
          setStatus('error');
          return;
        }
        const verified = await verifyEmail(token);

        if (verified) {
          await refreshUserData();
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    verify();
  }, [refreshUserData, searchParams]);

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Verifying your email...
            </h2>
            <p className="mt-2 text-gray-600">This will only take a moment</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Email Verified Successfully!
            </h2>
            <p className="mt-2 text-gray-600">
              Thank you for verifying your email address
            </p>
            <Link
              to="/dashboard"
              className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Go to Dashboard
            </Link>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Verification Failed
            </h2>
            <p className="mt-2 text-gray-600">
              There was an error verifying your email. Please try again.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
}

export default EmailVerification;
