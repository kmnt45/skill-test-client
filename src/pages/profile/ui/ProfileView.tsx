import { FC } from 'react';

import { SettingOutlined } from '@ant-design/icons';
import { Typography, Avatar, Button, Tooltip, Flex } from 'antd';
import { Logout } from 'features/logout/ui/Logout';

import styles from './Profile.module.scss';

const { Title, Text } = Typography;

type ProfileViewProps = {
  apiData: any;
  daysOnService: number;
  isOwnProfile: boolean;
  onEditClick: () => void;
};

export const ProfileView: FC<ProfileViewProps> = ({ apiData, daysOnService, isOwnProfile, onEditClick }) => {
  if (!apiData) return null;

  return (
    <Flex vertical justify={'space-between'} flex={1} className={styles.container}>
      <Flex vertical gap={20}>
        <Flex vertical align={'center'} style={{position: 'relative'}}>
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
          <Avatar
            size={250}
            src={apiData.avatarUrl ? `http://localhost:5000${apiData.avatarUrl}` : undefined}
            alt={apiData.nickName}
          />
        </Flex>
        <Title level={3} style={{ marginBottom: 0, marginTop: 0 }}>
          {apiData.nickName}
        </Title>
        <Text>{apiData.about}</Text>
        <Title level={4}  style={{ marginBottom: 0, marginTop: 0 }}>Статистика</Title>
        <Flex vertical gap={10}>
          <Text>Очки: {apiData.points}</Text>
          <Text>Дней на СкиллТест: {daysOnService}{' '}{daysOnService === 1 ? 'день' : daysOnService < 5 ? 'дня' : 'дней'}</Text>
        </Flex>
      </Flex>
      <Logout/>
    </Flex>
  );
};
