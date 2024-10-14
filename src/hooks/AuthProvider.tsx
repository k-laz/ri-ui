// src/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  AuthError,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import {
  createUserProfile,
  updateUserFilter,
  fetchUserData,
  syncUserProfile,
} from '../api';
import { RawUserData, UserData, UserFilter } from '../types';

interface AuthContextType {
  firebaseCurrentUser: User | null;
  userData: UserData;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userId: string, filter: UserFilter) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  refreshUser: unknown;
  notificationModalOpen: unknown;
  setNotificationModalOpen: unknown;
  notificationTitle: unknown;
  setNotificationTitle: unknown;
  firstTimeSignUp: boolean;
}

const initialUserData = {};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [refreshUser, setRefreshUser] = useState(Math.random());
  const [firstTimeSignUp, setFirstTimeSignUp] = useState(false);
  const [userData, setUserData] = useState(() => {
    const data = sessionStorage.getItem('userData');
    return data ? JSON.parse(data) : initialUserData;
  });
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const user_credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // TODO: is this really necessary?
      await syncUserProfile(
        await user_credentials.user.getIdToken(),
        email,
        user_credentials.user.uid,
      );
      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const firebaseError = error as AuthError;
        const errorMessage = getErrorMessage(firebaseError.code);
        console.error('Failed to login:', errorMessage);
        throw new Error(errorMessage);
      } else {
        console.error('Unexpected error:', error);
        throw new Error(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
  };

  const sendPasswordResetEmail = async (email: string): Promise<void> => {
    try {
      await firebaseSendPasswordResetEmail(auth, email);
      console.log('Password reset email sent');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const firebaseError = error as AuthError;
        const errorMessage = getErrorMessage(firebaseError.code);
        console.error('Failed to send password reset email:', errorMessage);
        throw new Error(errorMessage);
      } else {
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
        console.error('Unexpected error:', error);
        throw new Error(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
  };

  const signup = async (email: string, password: string): Promise<void> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUId = userCredential.user.uid;
      await createUserProfile(firebaseUId, email);
      setFirstTimeSignUp(true);
      navigate('/filter/setup');
    } catch (error: unknown) {
      if (error instanceof Error) {
        const firebaseError = error as AuthError;
        const errorMessage = getErrorMessage(firebaseError.code);
        console.error('Failed to sign up:', errorMessage);
        throw new Error(errorMessage);
      } else {
        console.error('Unexpected error:', error);
        throw new Error(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
  };

  const updateProfile = async (
    userId: string,
    filter: UserFilter,
  ): Promise<void> => {
    try {
      await updateUserFilter(userId, filter);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to update profile:', error.message);
        throw new Error('Failed to update profile');
      } else {
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
        console.error('Unexpected error:', error);
        throw new Error(
          'An unexpected error occurred. Please try again later.',
        );
      }
    }
  };

  useEffect(() => {
    const authObserver = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return authObserver;
  }, []);

  useEffect(() => {
    const userDataCache = JSON.parse(
      sessionStorage.getItem('userData') || '{}',
    );

    if (currentUser && !(userDataCache?.isReady ?? false)) {
      currentUser.getIdToken().then(async (token) => {
        await fetchUserData(token)
          .then((data: RawUserData) => {
            setUserData({
              isReady: true,
              filter: data.UserFilter,
              listings: data.Listings,
              email: data.email,
              id: data.id,
            });

            if (firstTimeSignUp) {
              setNotificationModalOpen(true);
              setNotificationTitle('Sign up successful!');
            }
          })
          .catch((error) => {
            console.error('Failed to fetch user data:', error);
          });
      });
    }
  }, [currentUser, firstTimeSignUp, refreshUser]);

  useEffect(() => {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const value: AuthContextType = {
    userData,
    firebaseCurrentUser: currentUser,
    loginWithGoogle,
    login,
    signup,
    logout,
    updateProfile,
    refreshUser: () => setRefreshUser(Math.random()),
    notificationModalOpen,
    setNotificationModalOpen,
    firstTimeSignUp,
    sendPasswordResetEmail,

    notificationTitle,
    setNotificationTitle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
