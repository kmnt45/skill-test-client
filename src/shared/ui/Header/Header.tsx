import { FC, ReactNode } from 'react';

import { Typography } from 'antd';

import styles from './Header.module.scss';

type TitleParams = {
  children: ReactNode;
}

export const Header: FC<TitleParams> = ({ children }) => {
  return (
    <div className={styles.header}>
      <Typography.Title level={3} style={{ marginBottom: 0, marginTop: 0 }}>
        {children}
      </Typography.Title>
    </div>
  );
};
