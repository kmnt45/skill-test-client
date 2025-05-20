import { FC, useCallback, useEffect, useState } from 'react';

import {
  HomeOutlined,
  FileTextOutlined,
  StockOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Tooltip, Typography } from 'antd';
import { setTheme } from 'entities/theme/model/slice';
import { logout } from 'entities/user/model/slice';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';

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

  const apiData = useAppSelector((state) => state.user.me.apiData);
  const theme = useAppSelector((state) => state.theme.theme);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsCollapsed(width >= 768 && width < 1024);
      if (width >= 768) setMobileMenuOpen(false);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
        <div
          onClick={() => {
            navigate(`/profile/${apiData?.id}`);
            setMobileMenuOpen(false);
          }}
          className={styles.dropdownItem}
        >
          Профиль
        </div>
      ),
    },
    {
      key: 'theme',
      label: (
        <div
          onClick={() => {
            toggleTheme();
            setMobileMenuOpen(false);
          }}
          className={styles.dropdownItem}
        >
          Сменить тему
        </div>
      ),
    },
    {
      key: 'logout',
      label: (
        <div
          onClick={() => {
            handleLogout();
            setMobileMenuOpen(false);
          }}
          className={`${styles.dropdownItem} ${styles.logout}`}
        >
          Выйти
        </div>
      ),
    },
  ];

  return (
    <>
      {isMobile && (
        <button
          className={styles.mobileBurger}
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Меню"
          type="button"
        >
          {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      )}

      <aside
        className={`${styles.sidebar} ${
          isCollapsed ? styles.collapsed : ''
        } ${mobileMenuOpen ? styles.mobileOpen : ''}`}
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        <div className={styles.topSection}>
          <NavLink
            to={ROUTES.HOME}
            className={`${styles.logo} ${isCollapsed ? styles.logoCollapsed : ''}`}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          >
            <HomeOutlined className={styles.logoIcon} />
            {!isCollapsed && <Text className={styles.logoText}>СкиллТест</Text>}
          </NavLink>

          <nav className={styles.nav}>
            {NAV_ITEMS.map(({ title, icon, path, disable }) => (
              <div className={styles.navLink} key={title}>
                <NavLink
                  to={disable ? '#' : path}
                  className={({ isActive }) =>
                    `${styles.navLinkInner} ${
                      disable ? styles.disabledNavLink : ''
                    } ${isActive && !disable ? styles.activeNavLink : ''}`
                  }
                  onClick={() => isMobile && setMobileMenuOpen(false)}
                >
                  <Tooltip title={isCollapsed ? title : ''} placement="right" className={styles.tooltip}>
                    {icon}
                  </Tooltip>
                  {!isCollapsed && (
                    <span className={styles.linkTextWrapper}>
                      <Text className={styles.linkText}>{title}</Text>
                    </span>
                  )}
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
              {!isCollapsed && (
                <Text className={styles.profileName} title={apiData.nickName}>
                  {apiData.nickName}
                </Text>
              )}
            </div>
          </Dropdown>
        )}
      </aside>
    </>
  );
};
