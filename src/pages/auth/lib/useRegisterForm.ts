import { useGlobalNotification } from 'app/providers/notification/NotificationProvider';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { registrationInitialValues, validationRegistrationSchema } from 'pages/auth/lib/utils';
import { registerUser } from 'pages/auth/model/asyncThunks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';

export const useRegisterForm = () => {
  const dispatch = useAppDispatch();
  const [api] = useGlobalNotification();
  const navigate = useNavigate();

  return useFormik({
    initialValues: registrationInitialValues,
    validationSchema: validationRegistrationSchema,
    onSubmit: async ({ nickName, email, password }) => {
      try {
        const { payload, error } = await dispatch(registerUser({ nickName, email, password }));

        if (error) {
          const message = error.message.includes('username')
            ? 'Пользователь с таким именем уже существует.'
            : error.message.includes('email')
              ? 'Пользователь с таким email уже существует.'
              : 'Произошла ошибка. Попробуйте снова.';
          api.error({ message: 'Ошибка регистрации', description: message });
          return;
        }

        if (payload?.token && payload.user) {
          localStorage.setItem('token', payload.token);
          Cookies.set('user_id', payload.user.id || '', { expires: 7 });
          navigate(ROUTES.HOME);
          api.success({
            message: 'Регистрация прошла успешно',
            description: 'Вы успешно зарегистрированы.',
          });
        }
      } catch {
        api.error({
          message: 'Ошибка регистрации',
          description: 'Произошла ошибка. Попробуйте снова.',
        });
      }
    },
  });
};
