import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { useGlobalNotification } from 'app/NotificationProvider.tsx';
import { ROUTES } from 'shared/constants';
import { useAppDispatch } from 'shared/hooks/useAppDispatch.ts';
import { registrationInitialValues, validationRegistrationSchema } from 'pages/auth/lib/utils.ts';
import { registerUser } from 'pages/auth/model/asyncThunks';

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
