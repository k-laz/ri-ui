import { useAuth } from '@/hooks/AuthProvider';
import { useState } from 'react';

export default function ForgotPassword() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { sendPasswordResetEmail } = auth;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await sendPasswordResetEmail(email);
      setMessage('Password reset email has been sent! Check your inbox.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Display a user-friendly error message
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center py-8 sm:mt-16 sm:px-6">
      <div className="w-full sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>

          {message && (
            <div className="text-center text-sm text-green-500">{message}</div>
          )}

          {error && (
            <div className="text-center text-sm text-red-500">{error}</div>
          )}

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-transparent"
            >
              Send Password Reset Email
            </button>
            <p className="text-sm font-light text-gray-500">
              Remembered your password?{' '}
              <a
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
