import { FC } from 'react';

import { AuthForm } from './AuthForm';
import { useLoginForm } from '../lib/useLoginForm';


export const Login: FC = () => {
  const formik = useLoginForm();

  return (
    <AuthForm
      submitLabel="Войти"
      formik={formik}
      fields={[
        { name: 'email', type: 'email', placeholder: 'Введите почту' },
        { name: 'password', type: 'password', placeholder: 'Введите пароль' },
      ]}
    />
  );
};
