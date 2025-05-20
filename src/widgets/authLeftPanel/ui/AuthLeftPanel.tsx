import { FC, useCallback } from 'react';

import { Typography } from 'antd';
import { ToggleTheme } from 'entities/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';

import styles from './AuthLeftPanel.module.scss';

const {Title, Link} = Typography;

export const AuthLeftPanel: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const isLoginPage = pathname === ROUTES.LOGIN;

  const title = isLoginPage ? 'Вход' : 'Регистрация'

  const subtitle = isLoginPage ? 'или регистрация' : 'или вход'

  const handleToggle = useCallback(() => {
    navigate(isLoginPage ? ROUTES.REGISTER : ROUTES.LOGIN);
  }, [isLoginPage, navigate]);

  return (
    <div className={styles.leftPanel}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title>{title}</Title>
          <ToggleTheme />
        </div>
        <Link onClick={handleToggle}>{subtitle}</Link>
      </div>
      <Title>СкиллТест</Title>
    </div>
  );
};