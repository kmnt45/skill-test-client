import { resetPassword } from 'entities/user/model/asyncThunks';

import { useAuthForm } from './useAuthForm';
import { resetPasswordInitialValues, validationResetPasswordSchema } from './validation';

type ResetPasswordFormValues = typeof resetPasswordInitialValues;

export const useResetPasswordForm = (token: string) => {
  return useAuthForm<ResetPasswordFormValues>({
    initialValues: resetPasswordInitialValues,
    validationSchema: validationResetPasswordSchema,
    //@ts-expect-error refactor
    asyncThunk: resetPassword,
    successMessage: 'Пароль успешно изменён',
    errorMessage: 'Не удалось изменить пароль',
    //@ts-expect-error refactor
    extraData: { token },
  });
};

