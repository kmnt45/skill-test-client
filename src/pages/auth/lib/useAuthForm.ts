import { unwrapResult } from '@reduxjs/toolkit';
import type { AsyncThunk } from '@reduxjs/toolkit';
import { useGlobalMessage } from 'app/providers/message/MessageProvider';
import { useFormik, FormikHelpers, FormikConfig } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { ObjectSchema } from 'yup';

type AuthResponse = {
  user?: { id?: string | number };
  error?: string;
  message?: string;
};

type UseAuthFormParams<T extends Record<string, unknown>> = {
  initialValues: T;
  validationSchema: ObjectSchema<T>;
  asyncThunk: AsyncThunk<AuthResponse, T, any>;
  successMessage: string;
  errorMessage?: string;
};

export function useAuthForm<T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  asyncThunk,
  successMessage,
  errorMessage = 'Произошла ошибка. Попробуйте снова.',
}: UseAuthFormParams<T>) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const message = useGlobalMessage();

  const formikConfig: FormikConfig<T> = {
    initialValues,
    validationSchema,
    onSubmit: async (values: T, formikHelpers: FormikHelpers<T>) => {
      try {
        const resultAction = await dispatch(asyncThunk(values));
        const payload: AuthResponse = unwrapResult(resultAction);

        if (payload?.error) {
          message.error(payload.error);
        } else if (payload?.user?.id) {
          console.log(payload?.user?.id)
          message.success(successMessage);
          navigate(ROUTES.HOME);
        } else {
          message.error(payload?.message || errorMessage);
        }
      } catch {
        message.error(errorMessage);
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  };

  return useFormik<T>(formikConfig);
}
