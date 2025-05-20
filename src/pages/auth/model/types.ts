import { User } from 'shared/models';

export type AuthResponse = {
  token: string;
  user: User;
};

export type CreateUser = Omit<User, 'id'>;
