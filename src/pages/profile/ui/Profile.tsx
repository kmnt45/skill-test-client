import { FC, useState } from 'react';

import { Flex, Spin } from 'antd';
import { ProfileEditModal } from 'features/profileEdit/ui/ProfileEditModal';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { Header } from 'shared/ui';

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

  if (apiStatus === LOADING_STAGE.LOADING) {
    return (
      <Flex align={'center'} justify={'center'} style={{ height: '100%' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <Flex flex={1} gap={20} wrap>
      <ProfileView
        apiData={apiData}
        daysOnService={daysOnService}
        isOwnProfile={!!isOwnProfile}
        onEditClick={() => setIsModalOpen(true)}
      />
      <Flex vertical flex={3}>
        <Header>История решений</Header>
      </Flex>
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
        />
      )}
    </Flex>
  );
};
