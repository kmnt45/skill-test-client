import { AxiosError } from 'axios';
import { useError } from 'shared/hooks/useError';
import { ErrorMessageType } from 'shared/model/types';

export const useHandleError = (error: unknown) => {
  const { status, message } = useError(error as AxiosError<ErrorMessageType>);

  if (status !== 498 && status !== 401) {
    if (Array.isArray(message)) {
      message.forEach((e) => console.log(e));
    } else {
      console.log(message);
    }
  }

  return { status, message };
};
