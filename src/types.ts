// src/types.ts

// Define the type for a User object
export type User = {
  id: string; // Assuming an ID field
  username: string;
  email: string;
  // Add other fields relevant to your application
};

// Define the AuthContextType with the User type
export type AuthContextType = {
  user: User | null; // Use the User type here
  loginAction: (data: { username: string; password: string }) => Promise<void>;
  logOut: () => void;
  token: string;
};
