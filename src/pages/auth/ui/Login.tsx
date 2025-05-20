import { FC } from 'react';

import { useLoginForm } from 'pages/auth/lib/useLoginForm';

import { AuthForm } from './AuthForm';

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
