import { FC, useState } from 'react';

import { Spin } from 'antd';
import { ProfileEditModal } from 'features/profileEdit/ui/ProfileEditModal';
import { LOADING_STAGE } from 'shared/constants/loadingStage';

import styles from './Profile.module.scss';
import { ProfileView } from './ProfileView';
import { useProfileData } from '../lib/useProfileData';

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
    <>
      <ProfileView
        apiData={apiData}
        daysOnService={daysOnService}
        isOwnProfile={!!isOwnProfile}
        onEditClick={() => setIsModalOpen(true)}
      />
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
    </>
  );
};
