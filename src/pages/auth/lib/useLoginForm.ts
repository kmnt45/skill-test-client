import { useGlobalNotification } from 'app/providers/notification/NotificationProvider';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { loginInitialValues, validationLoginSchema } from 'pages/auth/lib/utils';
import { loginUser } from 'pages/auth/model/asyncThunks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';

export const useLoginForm = () => {
  const dispatch = useAppDispatch();
  const [api] = useGlobalNotification();
  const navigate = useNavigate();

  return useFormik({
    initialValues: loginInitialValues,
    validationSchema: validationLoginSchema,
    onSubmit: async ({ email, password }) => {
      try {
        const response = await dispatch(loginUser({ email, password }));

        if (response.payload?.token) {
          localStorage.setItem('token', response.payload.token);
          Cookies.set('user_id', response.payload.user.id);
          navigate(ROUTES.HOME);
          api.success({
            message: 'Успешный вход в аккаунт',
          });
        } else {
          throw new Error();
        }
      } catch {
        api.error({
          message: 'Ошибка входа',
          description: 'Неверные данные или ошибка сервера.',
        });
      }
    },
  });
};
