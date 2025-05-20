import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export const registrationInitialValues = {
  nickName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const validationRegistrationSchema = yup.object({
  nickName: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .max(10, 'Слишком длинное имя')
    .matches(/^[a-zA-Z0-9_]+$/, 'Только латиница, цифры и _'),

  email: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .email('Неверный формат почты'),

  password: yup
    .string()
    .required('Обязательное поле')
    .matches(PASSWORD_REGEX, 'Пароль должен содержать минимум 8 символов, включая заглавные буквы и цифры'),

  confirmPassword: yup
    .string()
    .required('Обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const loginInitialValues = {
  email: '',
  password: '',
};

export const validationLoginSchema = yup.object({
  email: yup.string().trim().required('Обязательное поле').email('Неверный формат почты'),
  password: yup
    .string()
    .required('Обязательное поле')
    .matches(PASSWORD_REGEX, 'Пароль должен содержать минимум 8 символов, включая заглавные буквы и цифры'),
});