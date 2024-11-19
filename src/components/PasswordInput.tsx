import { FC, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  setPassword: (password: string) => void;
  password: string;
  // error?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({
  setPassword,
  password,
  // error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
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
            href="/forgot-password"
            className="font-semibold text-primary hover:text-secondary"
          >
            Forgot password?
          </a>
        </div>
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          id="password"
          placeholder="••••••••"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {/* {error && <p className="mt-1 text-sm text-red-500">{error}</p>} */}
    </div>
  );
};

export default PasswordInput;
