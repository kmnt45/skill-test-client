import { loginUser } from 'entities/user/model/asyncThunks';

import { useAuthForm } from './useAuthForm';
import { loginInitialValues, validationLoginSchema } from './validation';

export const useLoginForm = () => {
  return useAuthForm({
    initialValues: loginInitialValues,
    validationSchema: validationLoginSchema,
    //@ts-expect-error
    asyncThunk: loginUser,
    successMessage: 'Успешный вход в аккаунт',
    errorMessage: 'Неверные данные или ошибка сервера.',
  });
};
