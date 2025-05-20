import { FC, ReactNode } from 'react';

import { useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import {LeftSideBar} from "widgets/leftSideBar";

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  const isPublicPage = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER || pathname === ROUTES.RESTORE;

  return (
    <div className={styles.layout}>
      {!isPublicPage && <LeftSideBar />}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};