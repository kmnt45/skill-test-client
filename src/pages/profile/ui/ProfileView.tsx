import { FC } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Typography, Avatar, Button } from 'antd';

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
    <div className={styles.userDataContainer}>
      <div className={styles.container}>
        <div className={styles.userTextData}>
          <Title level={4} style={{ marginBottom: 0, marginTop: 0 }}>
            {apiData.nickName}
          </Title>
          <Text>{apiData.about}</Text>
          <Text>Очки: {apiData.points}</Text>
          <Text>
            Дней на СкиллТест: {daysOnService}{' '}
            {daysOnService === 1 ? 'день' : daysOnService < 5 ? 'дня' : 'дней'}
          </Text>
        </div>
        <div className={styles.avatarSection}>
          <Avatar
            size={80}
            src={apiData.avatarUrl ? `http://localhost:5000${apiData.avatarUrl}` : undefined}
            alt={apiData.nickName}
          />
          {isOwnProfile && (
            <Button icon={<EditOutlined />} size="small" style={{ marginTop: 8 }} onClick={onEditClick}>
              Редактировать профиль
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
