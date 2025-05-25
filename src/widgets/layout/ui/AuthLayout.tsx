import { FC } from 'react';

import styles from 'pages/auth/ui/Auth.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { AuthLeftPanel } from 'widgets/authLeftPanel';


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
