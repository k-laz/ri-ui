import { API_URL } from './constants';
import { UserFilter, UserData } from './types';
import { User, getAuth, deleteUser } from 'firebase/auth';
const auth = getAuth();

export const resendVerificationEmail = async (email: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to sync user with backend.');
    }
    console.log('User successfully synced with backend.');
  } catch (error) {
    console.error('Error syncing user with backend:', error);
    throw error;
  }
};

export const createOrSyncUserWithBackend = async (
  user: User,
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/users/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
      body: JSON.stringify({
        firebaseUId: user.uid,
        email: user.email,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to sync user with backend.');
    }
    console.log('User successfully synced with backend.');
  } catch (error) {
    console.error('Error syncing user with backend:', error);
    throw error;
  }
};

export const fetchUserData = async (token: string): Promise<UserData> => {
  try {
    const response = await fetch(`${API_URL}/users/me/data`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// export const fetchUserFilter = async (token: string): Promise<UserFilter> => {
//   try {
//     const response = await fetch(`${API_URL}/users/me/data`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw error;
//   }
// };

export const createUserProfile = async (firebaseUId: string, email: string) => {
  const response = await fetch(`${API_URL}/users/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firebaseUId, email }),
  });
  if (!response.ok) {
    throw new Error('Failed to create user profile');
  }
  return response.json();
};

export const updateUserFilter = async (
  token: string,
  filter: Partial<UserFilter>,
) => {
  const response = await fetch(`${API_URL}/filters/update`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter }),
  });
  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }
  return response.json();
};

export const deleteUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user is signed in');
  }

  try {
    // First call your backend API
    await fetch(`/users/${user.uid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await user.getIdToken()}`,
      },
    });

    // Then delete from Firebase Auth
    await deleteUser(user);

    // Handle successful deletion (e.g., redirect to login)
  } catch (error) {
    // Handle errors
    console.error('Error deleting account:', error);
    throw error;
  }
};
