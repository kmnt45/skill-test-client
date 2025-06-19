import { Button, Checkbox, Form, Typography } from 'antd';
import { FormikValues, FormikProps } from 'formik';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { InputWithLabel, TermsModal } from 'shared/ui';

import styles from './Auth.module.scss';
import { useState } from 'react';

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
  const { pathname } = useLocation();
  const { errors, touched, getFieldProps, isValid, dirty, handleSubmit } = formik;

  const [agree, setAgree] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const isRegister = pathname === ROUTES.REGISTER;

  const isSubmitDisabled = !isValid || !dirty || (isRegister && !agree);

  return (
    <>
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

        {isRegister && (
          <Checkbox checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginBottom: '20px' }}>
            Я принимаю{' '}
            <Typography.Text onClick={() => setModalOpen(true)} style={{ color: '#09def6', cursor: 'pointer', marginBottom: '20px' }}>
              условия использования и политику конфиденциальности
            </Typography.Text>
          </Checkbox>
        )}

        <Button type="primary" disabled={isSubmitDisabled} htmlType="submit">
          {submitLabel}
        </Button>

        {pathname === ROUTES.LOGIN && (
          <NavLink className={styles.restoreButton} to={ROUTES.RESTORE}>
            Забыли пароль?
          </NavLink>
        )}
      </Form>

      <TermsModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
