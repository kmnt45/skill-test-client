import { FC, useEffect } from 'react';

import { useResetPasswordForm } from 'pages/auth/lib/useResetPasswordForm';
import { AuthForm } from 'pages/auth/ui/AuthForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from 'shared/constants';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token') || '';

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.RESTORE);
    }
  }, [token, navigate]);

  const formik = useResetPasswordForm(token);

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
        { name: 'newPassword', type: 'password', placeholder: 'Новый пароль' },
        { name: 'confirmNewPassword', type: 'password', placeholder: 'Подтвердите пароль' },
      ]}
    />
  );
};

