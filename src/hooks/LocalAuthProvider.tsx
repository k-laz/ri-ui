import {
  useContext,
  createContext,
  useState,
  ReactNode,
  ReactElement,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContextType, User } from '../types';

const defaultAuthContext: AuthContextType = {
  user: null,
  loginAction: async () => Promise.resolve(),
  logOut: () => {
    console.log(
      'logOut called from defaultAuthContext, but no operation is performed.',
    );
  },
  token: '',
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem('site') || '',
  );
  const navigate = useNavigate();

  const loginAction = async (data: { username: string; password: string }) => {
    try {
      const response = await fetch('your-api-endpoint/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem('site', res.token);
        navigate('/dashboard');
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('site');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};
