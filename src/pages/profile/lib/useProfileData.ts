import { useState, useEffect, useMemo } from 'react';

import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import { useGlobalMessage } from 'app/providers/message/MessageProvider';
import { getMe, getUser, updateUserAvatar, updateUserProfile } from 'entities/user/model/asyncThunks';
import { useParams } from 'react-router-dom';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch, useAppSelector } from 'shared/hooks';

export const useProfileData = () => {
  const dispatch = useAppDispatch();
  const { profileId } = useParams<{ profileId: string }>();
  const message = useGlobalMessage();

  const me = useAppSelector((state) => state.user.me.apiData);
  const meStatus = useAppSelector((state) => state.user.me.apiStatus);
  const meError = useAppSelector((state) => state.user.me.apiError);

  const user = useAppSelector((state) => state.user.user.apiData);
  const userStatus = useAppSelector((state) => state.user.user.apiStatus);
  const userError = useAppSelector((state) => state.user.user.apiError);

  const isOwnProfile = !profileId || (me && profileId === me.id);

  const apiData = isOwnProfile ? me : user;
  const apiStatus = isOwnProfile ? meStatus : userStatus;
  const apiError = isOwnProfile ? meError : userError;

  const [nickName, setNickName] = useState('');
  const [about, setAbout] = useState('');
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);

  const daysOnService = useMemo(() => {
    if (!apiData?.createdAt) return 0;
    const createdDate = new Date(apiData.createdAt);
    const diff = Date.now() - createdDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, [apiData]);

  useEffect(() => {
    if (!profileId) {
      if (!me && meStatus !== LOADING_STAGE.LOADING) dispatch(getMe());
    } else {
      if (me && profileId === me.id) {
        if (!me && meStatus !== LOADING_STAGE.LOADING) dispatch(getMe());
      } else if (!user || user.id !== profileId) {
        dispatch(getUser(profileId));
      }
    }
  }, [profileId, me, user, dispatch, meStatus]);

  useEffect(() => {
    if (apiData) {
      setNickName(apiData.nickName ?? '');
      setAbout(apiData.about ?? '');
      setUploadFileList([]);
      setAvatarFile(null);
    }
  }, [apiData]);

  useEffect(() => {
    if (apiError) {
      message.error(`Ошибка: ${apiError}`);
    }
  }, [apiError, message]);

  const handleSave = async () => {
    if (nickName.trim().length === 0) {
      message.error('Никнейм не может быть пустым');
      return false;
    }

    try {
      await dispatch(updateUserProfile({ data: { nickName: nickName.trim(), about } })).unwrap();

      if (avatarFile) {
        await dispatch(updateUserAvatar({ avatarFile })).unwrap();
      }

      message.success('Профиль успешно обновлен');
      setAvatarFile(null);
      setUploadFileList([]);
      return true;
    } catch {
      message.error('Ошибка при обновлении профиля');
      return false;
    }
  };

  const handleUploadChange = (info: { fileList: UploadFile[] }) => {
    let fileList = [...info.fileList].slice(-1);
    fileList = fileList.filter((file) => {
      const isImage = file.type?.startsWith('image/');
      if (!isImage) {
        message.error('Можно загружать только изображения');
      }
      return isImage;
    });
    setUploadFileList(fileList);

    if (fileList.length === 0) {
      setAvatarFile(null);
    } else {
      const lastFile = fileList[0];
      if (lastFile.originFileObj) {
        setAvatarFile(lastFile.originFileObj as RcFile);
      }
    }
  };

  return {
    apiData,
    apiStatus,
    isOwnProfile,
    nickName,
    setNickName,
    about,
    setAbout,
    avatarFile,
    uploadFileList,
    setUploadFileList,
    setAvatarFile,
    daysOnService,
    handleSave,
    handleUploadChange,
  };
};
