import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  );
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    fetch(`/api/unsubscribe/${token}`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        setStatus('error');
      });
  }, [token]);

  if (status === 'loading') {
    return <div>Processing your unsubscribe request...</div>;
  }

  if (status === 'error') {
    return (
      <div>
        Sorry, we could not process your unsubscribe request. Please try again
        or contact support.
      </div>
    );
  }

  return (
    <div>
      <h1>Successfully Unsubscribed</h1>
      <p>You have been unsubscribed from rental listing notifications.</p>
      <p>
        Want to resubscribe? <a href="/settings">Update your preferences</a>
      </p>
    </div>
  );
}
