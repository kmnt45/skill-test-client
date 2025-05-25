import { FC } from 'react';

import { AuthForm } from './AuthForm';
import { useRestoreForm } from '../lib/useRestoreForm';

export const Restore: FC = () => {
  const formik = useRestoreForm();

  return (
    <AuthForm
      submitLabel="Отправить код"
      formik={formik}
      fields={[{ name: 'email', type: 'email', placeholder: 'Введите почту' }]}
    />
  );
};
