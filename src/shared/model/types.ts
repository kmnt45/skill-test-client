import { AppDispatch, RootState } from 'app/store';

export type LoadingStage = 'LOAD' | 'LOADING'

export type ErrorMessageType = { status: number | null; message: string };

export type ApiStatusState<T> = {
  apiData: T | null;
  apiStatus: LoadingStage;
  apiError: ErrorMessageType | null;
};

export type ThunkConfig = {
  rejectValue: ErrorMessageType;
  state: RootState;
  dispatch: AppDispatch;
};