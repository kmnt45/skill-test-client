import { FC } from 'react';

import styles from 'pages/auth/ui/Auth.module.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { useIsMainAuthRoute } from 'shared/hooks';
import { AuthLeftPanel } from 'widgets/authLeftPanel';
import { BackButton } from 'shared/ui';
import { ROUTES } from 'shared/constants';
import { Flex, Typography } from 'antd';


export const AuthLayout: FC = () => {
  const isMainAuthPage = useIsMainAuthRoute();

  const { pathname } = useLocation();

  const isRestorePage = pathname === ROUTES.RESTORE;

  const isResetPage = pathname === ROUTES.RESET_PASSWORD;

  const isResetOrRestorePage = isRestorePage || isResetPage;
  
  return (
    <div className={styles.authLayout} style={{ width: isResetOrRestorePage ? 'auto' : 800 }}>
      {isMainAuthPage && <AuthLeftPanel />}
      <div className={styles.rightPanel} style={{ height: isResetOrRestorePage ? 'auto' : 400}}>
        {isRestorePage && <BackButton />}
        <Flex style={{ marginBottom: 20 }} gap={10}>
          <Typography.Title style={{ margin: 0 }}>
            {isRestorePage && 'Восстановление пароля'}
            {isResetPage && 'Смена пароля'}
          </Typography.Title>
        </Flex>
        <Outlet />
      </div>
    </div>
  );
};
