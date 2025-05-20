import { FC } from 'react';

import { useRegisterForm } from 'pages/auth/lib/useRegisterForm';

import { AuthForm } from './AuthForm';

export const Register: FC = () => {
  const formik = useRegisterForm();

  return (
    <AuthForm
      submitLabel="Зарегистрироваться"
      formik={formik}
      fields={[
        { name: 'nickName', type: 'text', placeholder: 'Введите никнейм' },
        { name: 'email', type: 'email', placeholder: 'Введите почту' },
        { name: 'password', type: 'password', placeholder: 'Введите пароль' },
        { name: 'confirmPassword', type: 'password', placeholder: 'Подтвердите пароль' },
      ]}
    />
  );
};
