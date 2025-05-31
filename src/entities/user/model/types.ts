export type User = {
  id: string;
  nickName: string;
  email: string;
  password?: string;
  avatar?: string;
  about?: string;
  createdAt?: string;
  points?: number;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type RegisterUser = Omit<User, 'id'>;

export type LoginUser = Pick<User, 'email' | 'password'>;

