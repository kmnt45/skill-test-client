import { FC, useState } from 'react';

import { Spin } from 'antd';
import { ProfileEditModal } from 'features/profileEdit/ui/ProfileEditModal';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { Header, TopicsCards } from 'shared/ui';

import styles from './Profile.module.scss';
import { ProfileView } from './ProfileView';
import { useProfileData } from '../lib/useProfileData';

export const mockTopicsData = [
  {
    title: 'Алгоритмы',
    description: 'Темы по алгоритмам и структурам данных',
    path: '/topics/algorithms',
  },
  {
    title: 'Frontend',
    description: 'Разработка интерфейсов, React, HTML, CSS и др.',
    path: '/topics/frontend',
  },
  {
    title: 'Backend',
    description: 'Серверная разработка: Node.js, базы данных, API',
    path: '/topics/backend',
  },
  {
    title: 'DevOps',
    description: 'CI/CD, Docker, Kubernetes, облачные технологии',
    path: '/topics/devops',
  },
];

export const Profile: FC = () => {
  const {
    apiData,
    apiStatus,
    isOwnProfile,
    nickName,
    setNickName,
    about,
    setAbout,
    uploadFileList,
    handleUploadChange,
    daysOnService,
    handleSave,
  } = useProfileData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (apiStatus === LOADING_STAGE.LOADING || !apiData) {
    return (
      <div className={styles.loadingWrapper}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.profile}>
      <ProfileView
        apiData={apiData}
        daysOnService={daysOnService}
        isOwnProfile={!!isOwnProfile}
        onEditClick={() => setIsModalOpen(true)}
      />
      <div className={styles.history}>
        <Header>История решений</Header>
        <TopicsCards data={mockTopicsData}/>
      </div>
      {isOwnProfile && (
        <ProfileEditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          nickName={nickName}
          setNickName={setNickName}
          about={about}
          setAbout={setAbout}
          uploadFileList={uploadFileList}
          onUploadChange={handleUploadChange}
          onSave={handleSave}
          //@ts-ignore
          loading={apiStatus === LOADING_STAGE.LOADING}
        />
      )}
    </div>
  );
};
