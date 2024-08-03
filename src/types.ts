// src/types.ts

export type UserData = {
  id: string; // Assuming an ID field
  email: string;
  filter: UserFilter;
  listings: Listing[];
};

// Define the AuthContextType with the User type
export type AuthContextType = {
  user: UserData | null; // Use the User type here
  loginAction: (data: { username: string; password: string }) => Promise<void>;
  logOut: () => void;
  token: string;
};

export type UserFilter = {
  id: number;
  userid: number;
  price_limit: number;
  move_in_date: Date;
  length_of_stay: 4 | 8 | 12;
  num_baths: (0 | 1 | 2 | 3 | 4)[];
  num_beds: (0 | 1 | 2 | 3 | 4)[];
  num_parking: (0 | 1 | 2 | 3 | 4)[];
  furnished: boolean;
  gender_preference: 'male' | 'female' | 'any';
};

export type Listing = {
  id: number;
  title: string;
  link: string;
  pub_date: string;
};
