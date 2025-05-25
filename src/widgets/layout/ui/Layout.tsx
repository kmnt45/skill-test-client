import { FC, ReactNode } from 'react';

import { Flex } from 'antd';
import { useIsPublicRoute } from 'shared/hooks';
import { LeftSideBar } from 'widgets/leftSideBar';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const isPublicRoute = useIsPublicRoute();

  return (
    <div className={styles.layout}>
      {!isPublicRoute && <LeftSideBar />}
      <Flex vertical gap={20} flex={1}>{children}</Flex>
    </div>
  );
};
