import { FC, useCallback } from 'react';

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { setTheme } from 'entities/theme/model/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';

import styles from './AuthLeftPanel.module.scss';

export const AuthLeftPanel: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useAppSelector((state) => state.theme.theme);
  const isLoginPage = location.pathname === ROUTES.LOGIN;

  const handleToggle = useCallback(() => {
    navigate(isLoginPage ? ROUTES.REGISTER : ROUTES.LOGIN);
  }, [isLoginPage, navigate]);

  const toggleTheme = useCallback(() => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  }, [dispatch, theme]);

  return (
    <div className={styles.leftPanel}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Typography.Title className={styles.title}>
            {isLoginPage ? 'Вход' : 'Регистрация'}
          </Typography.Title>
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={theme === 'light' ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
          />
        </div>
        <Typography.Text className={styles.subtitle} onClick={handleToggle}>
          {isLoginPage ? 'или регистрация' : 'или вход'}
        </Typography.Text>
      </div>
      <Typography.Title>СкиллТест</Typography.Title>
    </div>
  );
};