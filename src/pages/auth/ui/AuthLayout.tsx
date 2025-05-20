import { FC } from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { AuthLeftPanel } from 'widgets/authLeftPanel';

import styles from './Auth.module.scss';


export const AuthLayout: FC = () => {
  const { pathname } = useLocation();
  const isRestorePage = pathname === ROUTES.RESTORE;

  return (
    <div className={styles.authLayout}>
      {!isRestorePage && <AuthLeftPanel />}
      <div className={styles.rightPanel}>
        <Outlet />
      </div>
    </div>
  );
};
