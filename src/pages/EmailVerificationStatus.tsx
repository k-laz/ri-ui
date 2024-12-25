// components/EmailVerificationStatus.tsx
import { useCallback, useEffect, useState } from 'react';
import { resendVerificationEmail } from '@/api';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/hooks/useUser';
import { useAuth } from '@/hooks/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

export const EmailVerificationStatus = () => {
  const { userData } = useUserStore();
  const { currentUser } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const checkTokenStatus = useCallback(() => {
    if (userData?.verificationTokenExpires) {
      setIsTokenExpired(
        new Date(userData.verificationTokenExpires) < new Date(),
      );
    }
  }, [userData]);

  useEffect(() => {
    checkTokenStatus();
  }, [userData, checkTokenStatus]);

  // If there's no currentUser, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If we're waiting for userData to load, show loading
  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (userData.isVerified) {
    return <Navigate to="/dashboard" />;
  }

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      await resendVerificationEmail(userData.email);
      setMessage('New verification email sent! Please check your inbox.');
    } catch (error) {
      setMessage('Failed to send verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  if (isTokenExpired) {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-red-50 p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-700">
          Verification Link Expired
        </h2>
        <p className="mb-6 text-gray-700">
          Your verification link has expired. Click below to receive a new
          verification email.
        </p>
        <button
          onClick={handleResendVerification}
          disabled={isResending}
          className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {isResending ? 'Sending...' : 'Get New Verification Link'}
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-lg bg-yellow-50 p-8 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-yellow-700">
        Please Verify Your Email
      </h2>
      <p className="mb-6 text-gray-700">
        We have sent a verification link to {userData.email}. Please check your
        inbox and verify your email to access all features.
      </p>
      <button
        onClick={handleResendVerification}
        disabled={isResending}
        className="w-full rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 disabled:opacity-50"
      >
        {isResending ? 'Sending...' : 'Resend Verification Email'}
      </button>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};
