// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  AuthError,
} from 'firebase/auth';
import { auth } from '../firebase.config.ts';
import { useNavigate } from 'react-router-dom';

// Define a type for the context value
interface AuthContextType {
  firebaseCurrentUser: User | null;
  userData: unknown;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Initial user data structure
const initialUserData = {
  isReady: false,
  displayName: '',
  formattedAffiliation: '',
  affiliation: '',
  faculty: '',
  image: null,
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the context
export const useAuth = () => useContext(AuthContext);

// Error mapping function
const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No user found with this email address.';
    case 'auth/invalid-credential':
      return 'Invalid credentials, check your email or password';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please check and try again.';
    case 'auth/email-already-in-use':
      return 'Email is already in use. Please use a different email.';
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection and try again.';
    default:
      return 'An error occurred. Please try again later.';
  }
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    const data = sessionStorage.getItem('userData');
    return data ? JSON.parse(data) : initialUserData;
  });

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const firebaseError = error as AuthError;
        const errorMessage = getErrorMessage(firebaseError.code);
        console.error('Failed to login:', errorMessage);
        throw new Error(errorMessage);
      } else {
        // Handle unexpected error types
        console.error('Unexpected error:', error);
        throw new Error(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const firebaseError = error as AuthError;
        const errorMessage = getErrorMessage(firebaseError.code);
        console.error('Failed to login with google:', errorMessage);
        throw new Error(errorMessage);
      } else {
        // Handle unexpected error types
        console.error('Unexpected error:', error);
        throw new Error(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
  };

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const firebaseError = error as AuthError;
        const errorMessage = getErrorMessage(firebaseError.code);
        console.error('Failed to sign up:', errorMessage);
        throw new Error(errorMessage);
      } else {
        // Handle unexpected error types
        console.error('Unexpected error:', error);
        throw new Error(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUserData(initialUserData);
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const firebaseError = error as AuthError;
        const errorMessage = getErrorMessage(firebaseError.code);
        console.error('Failed to log out:', errorMessage);
        throw new Error(errorMessage);
      } else {
        // Handle unexpected error types
        console.error('Unexpected error:', error);
        throw new Error(
          'An unexpected error occurred. Please try again later.',
        );
      }
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
