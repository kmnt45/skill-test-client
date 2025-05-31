import { FC, ReactNode } from 'react';

import { Flex, Typography } from 'antd';

import styles from 'shared/ui/Header/ui/Header.module.scss';

type TitleParams = {
  children: ReactNode;
}

export const HeaderSec: FC<TitleParams> = ({ children }) => {
  return (
    <Flex justify={'space-between'} align={'center'} className={styles.header}>
      <Typography.Title level={3} style={{ marginBottom: 0, marginTop: 0 }}>
        {children}
      </Typography.Title>
    </Flex>
  );
};
