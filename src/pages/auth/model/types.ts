import { User } from 'shared/model/types';

export type AuthResponse = {
  token: string;
  user: User;
};

export type CreateUser = Omit<User, 'id'>;
