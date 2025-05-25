import { LoadingStage } from 'shared/model/loadingStage';

export type ErrorMessageType = { status: number | null; message: string };

export type ApiStatusState<T> = {
  apiData: T | null;
  apiStatus: LoadingStage;
  apiError: ErrorMessageType | null;
};