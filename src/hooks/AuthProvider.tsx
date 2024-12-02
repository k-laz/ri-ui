// src/AuthProvider.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
import { RawUserData, UserData, UserFilter } from '../types';

interface AuthContextType {
  firebaseCurrentUser: User | null;
  userData: UserData;
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
  const [userData, setUserData] = useState(() => {
    const data = sessionStorage.getItem('userData');
    return data ? JSON.parse(data) : initialUserData;
  });
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshUserData = useCallback(async () => {
    if (!currentUser) return;

    try {
      const token = await currentUser.getIdToken();
      const data: RawUserData = await fetchUserData(token);
      setUserData(data);
      sessionStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Error refreshing user data:', error);
      throw error;
    }
  }, [currentUser]);

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

  // Watch for Auth User Change
  useEffect(() => {
    const authObserver = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      refreshUserData();
    });
    return authObserver;
  }, [refreshUserData]);

  // Initial data load on auth state change
  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      if (!currentUser) {
        sessionStorage.removeItem('userData');
        setUserData(initialUserData);
        return;
      }

      if (isMounted) {
        await refreshUserData();
      }
    };

    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, [currentUser, refreshUserData]);

  const value: AuthContextType = {
    userData,
    firebaseCurrentUser: currentUser,
    loginWithGoogle,
    login,
    signup,
    logout,
    updateFilter,
    notificationModalOpen,
    setNotificationModalOpen,
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
