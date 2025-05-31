import { FC, useState } from 'react';
import { Flex } from 'antd';

import { ProfileEditModal } from 'features/profileEdit';
import { LOADING_STAGE } from 'shared/constants';
import { Loader } from 'shared/ui';

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

  const isLoading = apiStatus === LOADING_STAGE.LOADING;

  return isLoading ? (
    <Loader />
  ) : (
    <Flex flex={1}>
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
        />
      )}
    </Flex>
  );
};
