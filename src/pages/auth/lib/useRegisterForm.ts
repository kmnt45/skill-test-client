import { registerUser } from 'pages/auth/model/asyncThunks';

import { useAuthForm } from './useAuthForm';
import { registrationInitialValues, validationRegistrationSchema } from './validation';

export const useRegisterForm = () => {
  return useAuthForm({
    initialValues: registrationInitialValues,
    validationSchema: validationRegistrationSchema,
    asyncThunk: registerUser,
    successMessage: 'Регистрация прошла успешно',
    errorMessage: 'Ошибка регистрации',
  });
};
