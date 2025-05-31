import { FC, JSX, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FileTextOutlined,
  QuestionOutlined,
  TrophyOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { Avatar, Tooltip, Typography, Space, Flex } from 'antd';

import { ROUTES } from 'shared/constants';
import { useAppSelector } from 'shared/hooks';

import styles from './LeftSideBar.module.scss';

const { Text, Title } = Typography;

type NavItemType = {
  title: string;
  icon: JSX.Element;
  path: string;
};

const NavItem: FC<NavItemType> = ({ title, icon, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `${styles.navLinkInner} ${isActive ? styles.activeNavLink : ''}`
    }
  >
    <Tooltip title={title} placement="right" className={styles.tooltip}>
      {icon}
    </Tooltip>
    <Text strong>{title}</Text>
  </NavLink>
);

export const LeftSideBar: FC = () => {
  const apiData = useAppSelector((state) => state.user.me.apiData);

  const navItems = useMemo<NavItemType[]>(
    () => [
      {
        title: 'Вопросы',
        icon: <QuestionOutlined />,
        path: ROUTES.QUESTIONS,
      },
      {
        title: 'Тесты',
        icon: <FileTextOutlined />,
        path: ROUTES.TESTS,
      },
      {
        title: 'Задачи',
        icon: <FormOutlined />,
        path: ROUTES.TASKS,
      },
      {
        title: 'Рейтинг',
        icon: <TrophyOutlined />,
        path: ROUTES.RATING,
      },
    ],
    [],
  );

  return (
    <Flex vertical justify="space-between" className={styles.sidebar}>
      <Flex vertical gap={40}>
        <NavLink to={ROUTES.HOME} className={styles.logo}>
          <Title level={4} style={{ margin: 0 }}>
            СкиллТест
          </Title>
        </NavLink>

        <nav className={styles.nav}>
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            {navItems.map(({ title, icon, path }) => (
              <NavItem key={title} title={title} icon={icon} path={path} />
            ))}
          </Space>
        </nav>
      </Flex>

      {apiData?.nickName && (
        <NavLink to={`/profile/${apiData.id}`} className={styles.profile}>
          <Avatar size="small" src={apiData.avatar || undefined} alt={apiData.nickName}>
            {apiData.nickName[0]}
          </Avatar>
          <Text className={styles.profileName} title={apiData.nickName}>
            {apiData.nickName}
          </Text>
        </NavLink>
      )}
    </Flex>
  );
};
