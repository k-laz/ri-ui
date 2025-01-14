// src/AuthProvider.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  createOrSyncUserWithBackend,
} from '../api';
import { UserFilter } from '../types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUserStore } from './useUser';
import { debounce, DebouncedFunc } from 'lodash';

interface AuthContextType {
  currentUser: User | null;

  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateFilter: (filter: Partial<UserFilter>) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  notificationModalOpen: unknown;
  setNotificationModalOpen: unknown;
  notificationTitle: unknown;
  setNotificationTitle: unknown;
  isAuthReady: boolean;
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: (value: boolean) => void;
  refreshUserData: DebouncedFunc<() => Promise<void>>;
}

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
  const { setUserData, clearUserData, lastFetched } = useUserStore();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const refreshTimeoutRef = useRef<NodeJS.Timeout>();

  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(false);

  const refreshUserData = useCallback(async () => {
    if (!currentUser) return;
    try {
      const token = await currentUser.getIdToken();
      const data = await fetchUserData(token);
      setUserData(data);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  }, [currentUser, setUserData]);

  // Create the debounced version outside of useCallback
  const debouncedRefresh = useMemo(
    () => debounce(refreshUserData, 2000),
    [refreshUserData],
  );

  // Cleanup the debounced function when the component unmounts
  useEffect(() => {
    return () => {
      debouncedRefresh.cancel();
    };
  }, [debouncedRefresh]);

  // Auth state observer
  useEffect(() => {
    const timeoutRef: NodeJS.Timeout | undefined = refreshTimeoutRef.current;

    const stopAuthListener = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setIsAuthReady(true);

      if (!user) {
        clearUserData();
        return;
      }

      // Only refresh if data is stale (older than 5 minutes)
      const isStale = !lastFetched || Date.now() - lastFetched > 5 * 60 * 1000;
      if (isStale) {
        refreshUserData();
      }
    });

    return () => {
      stopAuthListener();
      if (timeoutRef) {
        clearTimeout(timeoutRef);
      }
    };
  }, [clearUserData, lastFetched, refreshUserData]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const user_credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      // TODO: is this really necessary?
      await createOrSyncUserWithBackend(user_credentials.user);
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
    try {
      // Sign in using a popup.
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      await createOrSyncUserWithBackend(userCredential.user);

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
      setIsFirstTimeUser(true);

      navigate('/dashboard');
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

  // Remove the sessionStorage setItem since we're using Zustand now
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      clearUserData(); // Use clearUserData instead of setUserData(initialUserData)
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

  // Update Filter
  const updateFilter = useCallback(
    async (filter: Partial<UserFilter>) => {
      if (!currentUser) throw new Error('User not logged in');

      const token = await currentUser.getIdToken();
      const response = await updateUserFilter(token, filter);
      await refreshUserData(); // Refresh entire user data after update

      return response;
    },
    [currentUser, refreshUserData],
  );

  // TODO: I am not sure where I was going with it
  // INVESTIGATE if ther is a use to putting unsbubscirbe behavior in account preferences
  // const updateEmailPreferences = useCallback(
  //   async (isSubscribed: boolean) => {
  //     if (!currentUser) throw new Error('User not logged in');

  //     try {
  //       const authToken = await currentUser.getIdToken();
  //       isSubscribed ? resubscribe(authToken) : unsubscribe();
  //       await refreshUserData();
  //     } catch (error) {
  //       console.error('Error updating email preferences:', error);
  //       throw error;
  //     }
  //   },
  //   [currentUser, refreshUserData],
  // );

  // TODO: confirm this function
  // const deleteAccount = useCallback(async () => {
  //   if (!currentUser) throw new Error('User not logged in');

  //   try {
  //     const token = await currentUser.getIdToken();

  //     // Delete user data from your backend
  //     const response = await fetch('/api/delete-account', {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to delete account data');
  //     }

  //     // Delete Firebase account
  //     await currentUser.delete();

  //     // Clear local data
  //     clearUserData();

  //     // Navigate to home
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error deleting account:', error);
  //     throw error;
  //   }
  // }, [currentUser, clearUserData, navigate]);

  // Only render children once auth is ready
  if (!isAuthReady) {
    return <LoadingSpinner />;
  }

  const value: AuthContextType = {
    currentUser,
    loginWithGoogle,
    login,
    signup,
    logout,
    updateFilter,
    notificationModalOpen,
    setNotificationModalOpen,
    sendPasswordResetEmail,
    isAuthReady,
    refreshUserData: debouncedRefresh,
    isFirstTimeUser,
    setIsFirstTimeUser,

    notificationTitle,
    setNotificationTitle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
