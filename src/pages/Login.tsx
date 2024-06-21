import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider'; // Update with the correct path
import { useNavigate } from 'react-router-dom';

export default function LogIn() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { login, loginWithGoogle } = auth;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        'Failed to log in. Please check your credentials and try again.',
      );
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center py-8 sm:mt-16 sm:px-6">
      <div className="w-full sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
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
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="flex flex-row justify-between">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-primary hover:text-secondary"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-transparent"
            >
              Log in
            </button>
            <p className="text-sm font-light text-gray-500">
              Not a member?{' '}
              <a
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Become a member
              </a>
            </p>
          </form>
          <div className="mt-4 text-center">
            <div>Or continue with</div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={async () => {
                  try {
                    await loginWithGoogle();
                    navigate('/dashboard');
                  } catch (err) {
                    setError('Failed to log in with Google.');
                  }
                }}
                className="w-1/2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100"
              >
                Google
              </button>
              {/* Add other social login buttons here if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
