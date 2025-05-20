import { FC } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Typography, Avatar, Button, Tooltip } from 'antd';

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
    <div className={styles.container}>
      <div className={styles.userData}>
        <div className={styles.avatarSection}>
          {isOwnProfile && (
            <Tooltip title={'Редактировать профиль'} placement="right">
              <Button
                icon={<EditOutlined />}
                shape="circle"
                size="middle"
                onClick={onEditClick}
                className={styles.editButton}
              />
            </Tooltip>
          )}
          <Avatar
            size={250}
            src={apiData.avatarUrl ? `http://localhost:5000${apiData.avatarUrl}` : undefined}
            alt={apiData.nickName}
          />
        </div>
        <Title level={3} style={{ marginBottom: 0, marginTop: 0 }}>
          {apiData.nickName}
        </Title>
        <Text>{apiData.about}</Text>
      </div>
      <div className={styles.stats}>
        <Title level={4} style={{ marginBottom: 0, marginTop: 0 }}>Статистика</Title>
        <div className={styles.statsBlock}>
          <Text>Очки: {apiData.points}</Text>
        </div>
        <div className={styles.statsBlock}>
          <Text>
            Дней на СкиллТест: {daysOnService}{' '}
            {daysOnService === 1 ? 'день' : daysOnService < 5 ? 'дня' : 'дней'}
          </Text>
        </div>
      </div>
    </div>
  );
};
