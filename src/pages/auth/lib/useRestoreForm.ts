import { restorePassword } from 'entities/user/model/asyncThunks';

import { useAuthForm } from './useAuthForm';
import { restoreInitialValues, validationRestoreSchema } from './validation';

export const useRestoreForm = () => {
  return useAuthForm({
    initialValues: restoreInitialValues,
    validationSchema: validationRestoreSchema,
    //@ts-expect-error refactor
    asyncThunk: restorePassword,
    successMessage: 'Код восстановления отправлен на почту',
    errorMessage: 'Не удалось отправить код восстановления',
  });
};
