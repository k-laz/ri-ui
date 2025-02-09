import { useCallback, useEffect, useState, useRef } from 'react';
import { resendVerificationEmail } from '@/api';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/hooks/useUser';
import { useAuth } from '@/hooks/AuthProvider';
import LoadingSpinner from '@/components/LoadingSpinner';

const COOLDOWN_DURATION = 60; // seconds
const COOLDOWN_KEY = 'emailVerification_lastSent';

export const EmailVerificationStatus = () => {
  const { userData } = useUserStore();
  const { currentUser } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCooldownTimer = (initialTime: number) => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setCooldownRemaining(initialTime);

    timerRef.current = setInterval(() => {
      setCooldownRemaining((prev) => {
        const newValue = Math.max(0, prev - 1);
        if (newValue === 0 && timerRef.current) {
          clearInterval(timerRef.current);
        }
        return newValue;
      });
    }, 1000);
  };

  const checkTokenStatus = useCallback(() => {
    if (userData?.verificationTokenExpires) {
      setIsTokenExpired(
        new Date(userData.verificationTokenExpires) < new Date(),
      );
    }
  }, [userData]);

  // Initial setup and localStorage check
  useEffect(() => {
    const lastSentStr = localStorage.getItem(COOLDOWN_KEY);
    if (lastSentStr) {
      const lastSent = parseInt(lastSentStr, 10);
      const now = Date.now();
      const elapsed = Math.floor((now - lastSent) / 1000);
      const remaining = Math.max(0, COOLDOWN_DURATION - elapsed);

      if (remaining > 0) {
        startCooldownTimer(remaining);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    checkTokenStatus();
  }, [userData, checkTokenStatus]);

  const handleResendVerification = async () => {
    if (cooldownRemaining > 0) return;

    try {
      setIsResending(true);
      await resendVerificationEmail(userData.email);
      setMessage('New verification email sent! Please check your inbox.');

      // Set cooldown in localStorage
      localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      // Start timer immediately
      startCooldownTimer(COOLDOWN_DURATION);
    } catch (error) {
      setMessage('Failed to send verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const getButtonText = () => {
    if (isResending) return 'Sending...';
    if (cooldownRemaining > 0) return `Wait ${cooldownRemaining}s`;
    return isTokenExpired
      ? 'Get New Verification Link'
      : 'Resend Verification Email';
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

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
          disabled={isResending || cooldownRemaining > 0}
          className="w-full rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {getButtonText()}
        </button>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 max-w-lg rounded-lg bg-yellow-50 p-8 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-yellow-700">
        Please Verify Your Email
      </h2>
      <p className="mb-6 text-gray-700">
        We have sent a verification link to {userData.email}. Please check your
        inbox and verify your email to access all features.
      </p>
      <button
        onClick={handleResendVerification}
        disabled={isResending || cooldownRemaining > 0}
        className="w-full rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700 disabled:opacity-50"
      >
        {getButtonText()}
      </button>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};
