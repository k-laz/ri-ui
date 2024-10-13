// src/api.ts
import { API_URL } from './constants';
import { UserFilter, RawUserData } from './types';

export const syncUserProfile = async (
  token: string,
  firebaseUId: string,
  email: string,
) => {
  try {
    const response = await fetch(`${API_URL}/users/sync`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firebaseUId, email }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error syncing user data:', error);
    throw error;
  }
};

export const fetchUserData = async (token: string): Promise<RawUserData> => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
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

export const createUserProfile = async (firebaseUId: string, email: string) => {
  const response = await fetch(`${API_URL}/users/add`, {
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

export const updateUserFilter = async (userId: string, filter: UserFilter) => {
  const response = await fetch(`${API_URL}/users/${userId}/filter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter }),
  });
  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }
  return response.json();
};
