import { FC } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Typography, Avatar, Button, Tooltip, Flex } from 'antd';
import { Logout } from 'features/logout/ui/Logout';
import { Cards, Header } from 'shared/ui';
import { EmptyPlaceholder } from 'shared/ui';

import styles from './Profile.module.scss';

const { Title, Text } = Typography;

type ProfileViewProps = {
  apiData: any;
  daysOnService: number;
  isOwnProfile: boolean;
  onEditClick: () => void;
};

export const ProfileView: FC<ProfileViewProps> = ({ apiData, daysOnService, isOwnProfile, onEditClick }) => {
  const history = apiData?.progressHistory ?? [];

  return (
    <Flex flex={1} gap={20}>
      <Flex vertical justify={'space-between'} flex={1} gap={20} className={styles.container}>
        <Flex vertical gap={20}>
          <Flex vertical align={'center'} style={{ position: 'relative' }}>
            {isOwnProfile && (
              <Tooltip title={'Редактировать профиль'} placement="right">
                <Button
                  icon={<SettingOutlined />}
                  shape="circle"
                  size="middle"
                  onClick={onEditClick}
                  className={styles.edit}
                />
              </Tooltip>
            )}
            <Avatar src={apiData?.avatar || undefined} size={250} alt={apiData?.nickName}>{apiData?.nickName[0]}</Avatar>
          </Flex>
          <Title level={3} style={{ margin: 0 }}>
            {apiData?.nickName}
          </Title>
          <Text>{apiData?.about}</Text>
          <Title level={4} style={{ margin: 0 }}>Статистика</Title>
          <Flex vertical gap={10}>
            <Text>Очки: {apiData?.points}🔥</Text>
            <Text>
              Дней на СкиллТест: {daysOnService}{' '}
              {daysOnService === 0
                ? 'дней'
                : daysOnService === 1
                  ? 'день'
                  : daysOnService < 5
                    ? 'дня'
                    : 'дней'}
            </Text>
          </Flex>
        </Flex>
        {isOwnProfile && <Logout />}
      </Flex>
      <Flex vertical flex={3} gap={20}>
        <Header>История решений</Header>
        {history.length === 0 ? (
          <EmptyPlaceholder />
        ) : (
          <Cards type="topics" data={history} noLinks />
        )}
      </Flex>
    </Flex>
  );
};
