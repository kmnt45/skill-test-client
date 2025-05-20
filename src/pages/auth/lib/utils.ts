import * as yup from 'yup';

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/;

export const registrationInitialValues = {
  nickName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const validationRegistrationSchema = yup.object({
  nickName: yup
    .string()
    .required('Обязательное поле')
    .max(10, 'Слишком длинное имя'),

  email: yup
    .string()
    .required('Обязательное поле')
    .email('Неверный формат почты'),

  password: yup
    .string()
    .required('Обязательное поле')
    .matches(PASSWORD_REGEX, 'Неверный формат пароля'),

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
  email: yup.string().required('Обязательное поле').email('Неверный формат почты'),
  password: yup.string().required('Обязательное поле').matches(PASSWORD_REGEX, 'Неверный формат пароля'),
});