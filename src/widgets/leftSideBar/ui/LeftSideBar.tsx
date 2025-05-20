import { FC, useCallback } from 'react';

import {
  HomeOutlined,
  FileTextOutlined,
  StockOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Tooltip, Typography } from 'antd';
import { setTheme } from 'app/store/themeSlice.ts';
import { logout } from 'pages/profile/model/slice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { useAppDispatch } from 'shared/hooks/useAppDispatch.ts';
import { useAppSelector } from 'shared/hooks/useAppSelector.ts';

import styles from './LeftSideBar.module.scss';

const { Text } = Typography;

const NAV_ITEMS = [
  {
    title: 'Вопросы',
    icon: <FileTextOutlined />,
    path: ROUTES.QUESTIONS,
  },
  {
    title: 'Тесты',
    icon: <FileTextOutlined />,
    path: ROUTES.TESTS,
  },
  {
    title: 'Задачи',
    icon: <FileTextOutlined />,
    path: ROUTES.TASKS,
    disable: true,
  },
  {
    title: 'Рейтинг',
    icon: <StockOutlined />,
    path: ROUTES.RATING,
  },
];

export const LeftSideBar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const apiData = useAppSelector((state) => state.user.user.apiData);
  const theme = useAppSelector((state) => state.theme.theme);

  const toggleTheme = useCallback(() => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  }, [dispatch, theme]);

  const clearCookies = () => {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; Max-Age=0; path=/;`;
    });
  };

  const handleLogout = useCallback(() => {
    clearCookies();
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  }, [dispatch, navigate]);

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <div onClick={() => navigate(`/profile/${apiData?.id}`)} className={styles.dropdownItem}>
          Профиль
        </div>
      ),
    },
    {
      key: 'theme',
      label: (
        <div onClick={toggleTheme} className={styles.dropdownItem}>
          Сменить тему
        </div>
      ),
    },
    {
      key: 'logout',
      label: (
        <div onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logout}`}>
          Выйти
        </div>
      ),
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        <NavLink to={ROUTES.HOME} className={styles.logo}>
          <HomeOutlined className={styles.logoIcon} />
          <Text className={styles.logoText}>СкиллТест</Text>
        </NavLink>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ title, icon, path, disable }) => (
            <div className={styles.navLink} key={title}>
              <NavLink
                to={disable ? '#' : path}
                className={({ isActive }) =>
                  `${styles.navLinkInner} ${disable ? styles.disabledNavLink : ''} ${isActive && !disable ? styles.activeNavLink : ''}`
                }
              >
                <Tooltip title={title} placement="right" className={styles.tooltip}>
                  {icon}
                </Tooltip>
                <span className={styles.linkTextWrapper}>
                  <Text className={styles.linkText}>{title}</Text>
                </span>
              </NavLink>
            </div>
          ))}
        </nav>

      </div>

      {apiData?.nickName && (
        <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
          <div className={styles.profile}>
            <Avatar
              size="small"
              src={`http://localhost:5000${apiData.avatarUrl}`}
              alt={apiData.nickName}
            >
              {apiData.nickName[0]}
            </Avatar>
            <Text
              className={styles.profileName}
              title={apiData.nickName}
            >
              {apiData.nickName}
            </Text>
          </div>
        </Dropdown>
      )}
    </aside>
  );
};
