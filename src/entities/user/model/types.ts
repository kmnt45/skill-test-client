import { LoadingStage } from 'shared/model/loadingStage';
import { ApiStatusState } from 'shared/model/types';

export type User = {
  id: string;
  nickName: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  about?: string;
  createdAt?: string;
  points?: number;
};

export interface UserState {
  user: ApiStatusState<User>;
  users: ApiStatusState<User[]>;
  updateProfileStatus: LoadingStage;
  updateAvatarStatus: LoadingStage;
  updateProfileError: string | null;
  updateAvatarError: string | null;
}
