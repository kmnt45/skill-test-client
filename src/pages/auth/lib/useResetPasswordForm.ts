import { resetPassword } from 'entities/user/model/asyncThunks';

import { useAuthForm } from './useAuthForm';
import { resetPasswordInitialValues, validationResetPasswordSchema } from './validation';

type ResetPasswordFormValues = typeof resetPasswordInitialValues & { email: string };

export const useResetPasswordForm = (email: string) => {
  return useAuthForm<ResetPasswordFormValues>({
    initialValues: { ...resetPasswordInitialValues, email },
    validationSchema: validationResetPasswordSchema,
    asyncThunk: resetPassword,
    successMessage: 'Пароль успешно изменён',
    errorMessage: 'Не удалось изменить пароль',
  });
};
