import { FC } from 'react';

import { Input, Typography } from 'antd';

import styles from './Auth.module.scss';

export const Restore: FC = () => (
  <div className={styles.restore}>
    <Typography.Title className={styles.title}>Восстановление пароля</Typography.Title>
    <Input></Input>
    <p>На указанную почту придёт код для восстановления доступа</p>
  </div>
);
