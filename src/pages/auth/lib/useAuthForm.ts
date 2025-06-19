import { unwrapResult } from '@reduxjs/toolkit';
import type { AsyncThunk } from '@reduxjs/toolkit';
import { useFormik, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ObjectSchema } from 'yup';

import { useAppMessage } from 'app/providers/message';
import { ROUTES } from 'shared/constants';
import { useAppDispatch } from 'shared/hooks';
import { ThunkConfig } from 'shared/model';

type AuthResponse = {
  user?: { id?: string | number };
  error?: string;
  message?: string;
};

type UseAuthFormParams<T extends Record<string, unknown>> = {
  initialValues: T;
  validationSchema: ObjectSchema<T>;
  asyncThunk: AsyncThunk<AuthResponse, T, ThunkConfig>;
  successMessage: string;
  errorMessage?: string;
  extraData?: Partial<T>;
};

export function useAuthForm<T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  asyncThunk,
  successMessage,
  errorMessage = 'Произошла ошибка. Попробуйте снова.',
  extraData,
}: UseAuthFormParams<T>) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const message = useAppMessage();

  const onSubmit = async (values: T, formikHelpers: FormikHelpers<T>) => {
    try {
      const payloadToSend = extraData ? { ...values, ...extraData } : values;
      //@ts-expect-error refactor
      const resultAction = await dispatch(asyncThunk(payloadToSend));

      const payload = unwrapResult(resultAction);

      if (payload.error) {
        message.error(payload.error);
      } else if (payload.user?.id) {
        message.success(successMessage);
        navigate(ROUTES.HOME);
      } else if (payload.message) {
        message.success(successMessage);
      } else {
        message.error(payload.message ?? errorMessage);
      }
    } catch {
      message.error(errorMessage);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  return useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit,
  });
}
