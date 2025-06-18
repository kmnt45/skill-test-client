import { FC, useCallback } from 'react';

import { Flex, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';

import styles from './AuthLeftPanel.module.scss';
import { Logo } from 'shared/ui';

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
          <Title style={{ marginTop: 20 }}>{title}</Title>
        </div>
        <Link onClick={handleToggle}>{subtitle}</Link>
      </div>
      <Flex align={'center'} gap={20}>
        <Logo size={'large'}/>
        <Title style={{margin: '0'}}>СкиллТест</Title>
      </Flex>
    </div>
  );
};