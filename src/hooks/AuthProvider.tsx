// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { auth } from '../firebase.config.ts';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  firebaseCurrentUser: User | null;
  userData: unknown;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const initialUserData = {
  isReady: false,
  displayName: '',
  formattedAffiliation: '',
  affiliation: '',
  faculty: '',
  image: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    const data = sessionStorage.getItem('userData');
    return data ? JSON.parse(data) : initialUserData;
  });

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to login:', error);
      // Handle error appropriately (e.g., show error message)
      if (error instanceof Error) {
        // Example: You can extract and handle specific Firebase error codes
        switch (error.cause) {
          case 'auth/wrong-password':
            console.error('Wrong password');
            break;
          case 'auth/user-not-found':
            console.error('User not found');
            break;
          // Add other cases as needed
          default:
            console.error('Login error:', error.message);
        }
      }
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to login with Google:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to signup:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUserData(initialUserData);
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  useEffect(() => {
    const authObserver = auth.onAuthStateChanged((user) =>
      setCurrentUser(user),
    );

    return authObserver;
  }, []);

  const value: AuthContextType = {
    userData,
    firebaseCurrentUser: currentUser,
    loginWithGoogle,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
