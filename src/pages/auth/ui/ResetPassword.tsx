import { FC, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';

import { AuthForm } from './AuthForm';
import { useResetPasswordForm } from '../lib/useResetPasswordForm';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = (location.state as { email?: string })?.email || '';

  useEffect(() => {
    if (!email) {
      navigate(ROUTES.RESTORE);
    }
  }, [email, navigate]);

  const formik = useResetPasswordForm(email);

  useEffect(() => {
    if (formik.status === 'success') {
      navigate(ROUTES.LOGIN);
    }
  }, [formik.status, navigate]);

  return (
    <AuthForm
      submitLabel="Сменить пароль"
      formik={formik}
      fields={[
        { name: 'code', type: 'text', placeholder: 'Введите код из письма' },
        { name: 'password', type: 'password', placeholder: 'Новый пароль' },
        { name: 'confirmPassword', type: 'password', placeholder: 'Подтвердите пароль' },
      ]}
    />
  );
};
