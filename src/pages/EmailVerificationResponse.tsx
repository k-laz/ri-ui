import { API_URL } from '@/constants';
import { useAuth } from '@/hooks/AuthProvider';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const { refreshUserData } = useAuth();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
        const response = await fetch(
          `${API_URL}/auth/verify-email?token=${token}`,
          {
            method: 'POST',
          },
        );

        if (response.ok) {
          refreshUserData();
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    verifyEmail();
  }, [refreshUserData, searchParams]);

  if (status === 'verifying') {
    return <div>Verifying your email...</div>;
  }

  if (status === 'success') {
    return <div>Your email has been verified successfully!</div>;
  }

  return <div>There was an error verifying your email. Please try again.</div>;
}

export default EmailVerification;
