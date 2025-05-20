import { LOADING_STAGE } from 'shared/constants';

export type LoadingStage = (typeof LOADING_STAGE)[keyof typeof LOADING_STAGE];

export type ErrorMessageType = {
  status: number | null
  message: string
}

export interface ApiStatusState<T> {
  apiData: T | null;
  apiStatus: LoadingStage | null;
  apiError: ErrorMessageType | null;
}

export type User = {
  id: string,
  nickName: string,
  email: string,
  password: string,
  avatarUrl?: string,
  about?: string,
  createdAt: string,
  points: number,
};
