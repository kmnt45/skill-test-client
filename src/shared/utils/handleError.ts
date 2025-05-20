import { AxiosError } from 'axios'
import { useError } from 'shared/hooks/useError.ts';
import { ErrorMessageType } from 'shared/models';


export const HandleError = (error: unknown) => {
  const { status, message } = useError(error as AxiosError<ErrorMessageType>)

  if (status !== 498 && status !== 401) {
    if (Array.isArray(message)) {
      message.map((nameError) => console.log(nameError))
    } else {
      console.log(message)
    }
  }

  return {
    status,
    message,
  }
}