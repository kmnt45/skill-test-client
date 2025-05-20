import { FC } from 'react';

import { Button, Form } from 'antd';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { InputWithLabel } from 'shared/ui';

import styles from './Auth.module.scss';

type AuthFormProps = {
  fields: {
    name: string;
    type: 'text' | 'email' | 'password';
    placeholder: string;
  }[];
  formik: ReturnType<typeof import('formik').useFormik<any>>;
  submitLabel: string;
};

export const AuthForm: FC<AuthFormProps> = ({ fields, formik, submitLabel }) => {
  const { errors, touched, getFieldProps, isValid, dirty, handleSubmit } = formik;

  return (
    <Form className={styles.form} onFinish={handleSubmit}>
      {fields.map(({ name, type, placeholder }) => (
        <InputWithLabel
          key={name}
          type={type}
          placeholder={placeholder}
          fieldProps={getFieldProps(name)}
          error={errors[name]}
          touched={touched[name]}
        />
      ))}
      <Button
        type="primary"
        className={styles.submitButton}
        disabled={!isValid || !dirty}
        htmlType="submit"
      >
        {submitLabel}
      </Button>
      <NavLink to={ROUTES.RESTORE} className={styles.restoreButton}>
        Забыл пароль?
      </NavLink>
    </Form>
  );
};
