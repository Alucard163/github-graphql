export interface User {
  name: string;
  login: string;
  avatarUrl: string;
  createdAt: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: Error | unknown;
}