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
  updateFilter: (filter: Partial<UserFilter>) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  notificationModalOpen: unknown;
  setNotificationModalOpen: unknown;
  notificationTitle: unknown;
  setNotificationTitle: unknown;
  firstTimeSignUp: boolean;
  // refreshUserData: () => Promise<void>;
  getUserFilter: () => Promise<void>;
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

  // const updateFilter = async (filter: Partial<UserFilter>): Promise<void> => {
  //   try {
  //     if (currentUser) {
  //       // Fetch token asynchronously
  //       const token = await currentUser.getIdToken();
  //       // Call updateUserFilter with the fetched token
  //       const response = await updateUserFilter(token, filter);
  //       // Optional: Check if the response is successful (based on your API)
  //       if (!response || response.error) {
  //         throw new Error('Failed to update profile: Invalid response');
  //       }
  //       // Refresh user data after successful update
  //       await refreshUserData();

  //       return response;
  //     } else {
  //       throw new Error('User is not logged in');
  //     }
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error('Failed to update profile:', error.message);
  //       throw new Error('Failed to update profile');
  //     } else {
  //       console.error('Unexpected error:', error);
  //       throw new Error(
  //         'An unexpected error occurred. Please try again later.',
  //       );
  //     }
  //   }
  // };

  const getUserFilter = async (): Promise<void> => {
    try {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        await fetchUserDataAndUpdate(token);
        // await fetchUserFilter(token).then((data: UserFilter) => {
        //   setUserData({ filter: data });
        // });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to get user filter:', error.message);
        throw new Error('Failed to get user filter');
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

  const fetchUserDataAndUpdate = useCallback(async (token: string) => {
    try {
      const data: RawUserData = await fetchUserData(token);
      const newUserData = {
        filter: data.filter,
        email: data.email,
        id: data.id,
      };
      setUserData(newUserData);

      // if (firstTimeSignUp) {
      //   setNotificationModalOpen(true);
      //   setNotificationTitle('Sign up successful!');
      // }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, []);

  // Memoized update filter function
  const updateFilter = useCallback(
    async (filter: Partial<UserFilter>) => {
      if (!currentUser) throw new Error('User is not logged in');

      const token = await currentUser.getIdToken();
      const response = await updateUserFilter(token, filter);

      if (!response || response.error) {
        throw new Error('Failed to update profile: Invalid response');
      }

      // Instead of calling refreshUserData, fetch and update directly
      await fetchUserDataAndUpdate(token);

      return response;
    },
    [currentUser, fetchUserDataAndUpdate],
  );

  useEffect(() => {
    const authObserver = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return authObserver;
  }, []);

  // Handle user data fetching
  useEffect(() => {
    let isMounted = true;

    const loadUserData = async () => {
      if (!currentUser) return;

      try {
        const token = await currentUser.getIdToken();
        if (isMounted) {
          await fetchUserDataAndUpdate(token);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, [currentUser, fetchUserDataAndUpdate]);

  // Function to refresh user data
  // const refreshUserData = useCallback(async () => {
  //   setRefreshTrigger((prev) => prev + 1);
  // }, []);

  const value: AuthContextType = {
    userData,
    firebaseCurrentUser: currentUser,
    loginWithGoogle,
    login,
    signup,
    logout,
    updateFilter,
    // refreshUserData,
    notificationModalOpen,
    setNotificationModalOpen,
    firstTimeSignUp,
    sendPasswordResetEmail,
    getUserFilter,

    notificationTitle,
    setNotificationTitle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
