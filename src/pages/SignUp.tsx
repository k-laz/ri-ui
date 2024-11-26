import TermsModal from '@/components/TermsModal';
import { useAuth } from '@/hooks/AuthProvider';
import { useState } from 'react';

export default function SignUp() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { signup } = auth;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!acceptedTerms) {
      setError('Please accept the Terms and Conditions to continue');
      return;
    }

    try {
      await signup(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          'An unexpected error occurred during signup. Please try again later.',
        );
      }
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center py-8 sm:mt-16 sm:px-6">
      <div className="w-full  sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
          {error && (
            <div className="text-center text-sm text-red-500">{error}</div>
          )}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary "
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="h-4 w-4 rounded text-primary focus:ring-transparent"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 ">
                  I accept the <TermsModal />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary focus:outline-none focus:ring-4 focus:ring-transparent"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500 ">
              Already have an account?{' '}
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
