import { LoadingStage } from 'shared/model/loadingStage';

export type ErrorMessageType = { status: number | null; message: string };

export type ApiStatusState<T> = {
  apiData: T | null;
  apiStatus: LoadingStage | null;
  apiError: ErrorMessageType | null;
};

export type User = {
  id: string;
  nickName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  about?: string;
  createdAt: string;
  points: number;
};
