import { registerUser } from 'entities/user/model/asyncThunks';

import { useAuthForm } from './useAuthForm';
import { registrationInitialValues, validationRegistrationSchema } from './validation';

export const useRegisterForm = () => {
  return useAuthForm({
    initialValues: registrationInitialValues,
    validationSchema: validationRegistrationSchema,
    //@ts-expect-error
    asyncThunk: registerUser,
    successMessage: 'Регистрация прошла успешно',
    errorMessage: 'Ошибка регистрации',
  });
};
