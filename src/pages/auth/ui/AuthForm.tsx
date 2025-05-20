import { Button, Form } from 'antd';
import { FormikValues, FormikProps } from 'formik';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { InputWithLabel } from 'shared/ui';

import styles from './Auth.module.scss';

type Field = {
  name: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
};

type AuthFormProps<T extends FormikValues> = {
  fields: Field[];
  formik: FormikProps<T>;
  submitLabel: string;
};

export const AuthForm = <T extends FormikValues>({ fields, formik, submitLabel }: AuthFormProps<T>) => {
  const { errors, touched, getFieldProps, isValid, dirty, handleSubmit } = formik;

  return (
    <Form className={styles.form} onFinish={handleSubmit}>
      {fields.map(({ name, type, placeholder }) => (
        <InputWithLabel
          key={name}
          type={type}
          placeholder={placeholder}
          fieldProps={getFieldProps(name)}
          error={errors[name as keyof T] as string}
          touched={touched[name as keyof T] as boolean}
        />
      ))}
      <Button type="primary" disabled={!isValid || !dirty} htmlType="submit">
        {submitLabel}
      </Button>
      <NavLink className={styles.restoreButton} to={ROUTES.RESTORE}>Забыл пароль?</NavLink>
    </Form>
  );
};
