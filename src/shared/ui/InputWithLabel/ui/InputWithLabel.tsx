import { FC } from 'react';

import { Form, Input } from 'antd';
import { FieldInputProps } from 'formik';

type InputWithLabelProps = {
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  fieldProps: FieldInputProps<string>;
  error?: string;
  touched?: boolean;
};

export const InputWithLabel: FC<InputWithLabelProps> = ({
  type,
  placeholder,
  fieldProps,
  error,
  touched,
}) => {
  const hasError = touched && error;

  return (
    <Form.Item
      name={fieldProps.name}
      validateStatus={hasError ? 'error' : ''}
      help={hasError ? error : ''}
    >
      {type === 'password' ? (
        <Input.Password
          type={type}
          placeholder={placeholder}
          autoComplete="current-password"
          {...fieldProps}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          autoComplete={
            type === 'email'
              ? 'email'
              : type === 'text'
                ? 'username'
                : undefined
          }
          {...fieldProps}
        />
      )}
    </Form.Item>
  );
};
