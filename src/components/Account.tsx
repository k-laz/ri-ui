// Account.tsx
import { useState } from 'react';
import { useAuth } from '@/hooks/AuthProvider';
import { useUserStore } from '@/hooks/useUser';
import { AlertMessage } from './ui/alert_message';

const Account = () => {
  const auth = useAuth();
  const { userData } = useUserStore();
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const showAlert = (
    message: string,
    type: 'success' | 'error' = 'success',
  ) => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = () => {
    setAlert((prev) => ({ ...prev, show: false }));
  };

  const handleUnsubscribe = async () => {
    try {
      await auth.updateEmailPreferences(false);
      showAlert('Successfully unsubscribed from emails');
    } catch (error) {
      showAlert('Failed to unsubscribe from emails', 'error');
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.',
      )
    ) {
      try {
        await auth.deleteAccount();
        // Redirect will be handled by AuthProvider
      } catch (error) {
        showAlert('Failed to delete account', 'error');
      }
    }
  };

  return (
    <div className="space-y-8 p-10">
      <AlertMessage
        message={alert.message}
        type={alert.type}
        isVisible={alert.show}
        onClose={hideAlert}
      />

      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome, {userData?.email || 'User'}
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings and preferences here.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900">
            Email Preferences
          </h2>
          <p className="mt-2 text-gray-600">
            You are currently{' '}
            {userData?.isSubscribed ? 'subscribed to' : 'unsubscribed from'}{' '}
            email notifications.
          </p>
          {userData?.isSubscribed && (
            <button
              onClick={handleUnsubscribe}
              className="mt-4 rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Unsubscribe from emails
            </button>
          )}
        </div>

        <div className="rounded-lg border border-red-200 p-6">
          <h2 className="text-lg font-medium text-gray-900">Danger Zone</h2>
          <p className="mt-2 text-gray-600">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
