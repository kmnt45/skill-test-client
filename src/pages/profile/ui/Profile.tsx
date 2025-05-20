import { FC, useEffect, useMemo, useState } from 'react';

import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import { Typography, Avatar, Modal, Input, Upload, Button, message, Spin } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { getUser, updateUserProfile, updateUserAvatar } from 'pages/profile/model/asyncThunks';
import { useParams } from 'react-router-dom';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';

import styles from './Profile.module.scss';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { profileId } = useParams<{ profileId: string }>();
  const apiData = useAppSelector((state) => state.user.user.apiData);
  const userLoadingStatus = useAppSelector((state) => state.user.user.apiStatus);
  const updateProfileStatus = useAppSelector((state) => state.user.updateProfileStatus);
  const updateAvatarStatus = useAppSelector((state) => state.user.updateAvatarStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickName, setNickName] = useState('');
  const [about, setAbout] = useState('');
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);

  const daysOnService = useMemo(() => {
    if (!apiData?.createdAt) return 0;
    const createdDate = new Date(apiData.createdAt);
    const today = new Date();
    const diff = today.getTime() - createdDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, [apiData]);

  useEffect(() => {
    if (profileId) {
      dispatch(getUser({ id: profileId }));
    }
  }, [profileId, dispatch]);

  useEffect(() => {
    if (apiData) {
      setNickName(apiData.nickName || '');
      setAbout(apiData.about || '');
      setAvatarFile(null);
      setUploadFileList([]);
    }
  }, [apiData]);

  const handleSave = async () => {
    if (!profileId) return;

    if (nickName.trim().length === 0) {
      message.error('Никнейм не может быть пустым');
      return;
    }

    try {
      await dispatch(updateUserProfile({ data: { nickName: nickName.trim(), about } })).unwrap();

      if (avatarFile) {
        await dispatch(updateUserAvatar({ avatarFile })).unwrap();
      }

      message.success('Профиль успешно обновлен');
      setIsModalOpen(false);
      setAvatarFile(null);
      setUploadFileList([]);
    } catch {
      message.error('Ошибка при обновлении профиля');
    }
  };

  const handleUploadChange = (info: UploadChangeParam) => {
    let fileList = [...info.fileList];

    fileList = fileList.slice(-1);

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

  if (userLoadingStatus === LOADING_STAGE.LOADING || !apiData) {
    return (
      <div className={styles.loadingWrapper}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.userDataContainer}>
        <div className={styles.container}>
          <div className={styles.userTextData}>
            <Title level={4} style={{ marginBottom: 0, marginTop: 0 }}>
              {apiData.nickName}
            </Title>
            <Text>{apiData.about}</Text>
            <Text>Очки: {apiData.points}</Text>
            <Text>Дней на СкиллТест: {apiData.createdAt}{daysOnService} {daysOnService === 1 ? 'день' : daysOnService < 5 ? 'дня' : 'дней'}</Text>
          </div>


          <div className={styles.avatarSection}>
            <Avatar
              size={80}
              src={apiData.avatarUrl ? `http://localhost:5000${apiData.avatarUrl}` : undefined}
              alt="Аватар пользователя"
            />
            <Button
              icon={<EditOutlined />}
              size="small"
              style={{ marginTop: 8 }}
              onClick={() => setIsModalOpen(true)}
            >
              Редактировать профиль
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="Редактировать профиль"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText="Сохранить"
        cancelText="Отмена"
        confirmLoading={updateProfileStatus === LOADING_STAGE.LOADING || updateAvatarStatus === LOADING_STAGE.LOADING}
        destroyOnClose
      >
        <Input
          placeholder="Никнейм"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          maxLength={50}
          style={{ marginBottom: 12 }}
          autoFocus
        />
        <TextArea
          placeholder="Описание"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={4}
          maxLength={200}
          style={{ marginBottom: 12 }}
        />
        <Upload
          accept="image/*"
          beforeUpload={() => false}
          fileList={uploadFileList}
          onChange={handleUploadChange}
          onRemove={() => setAvatarFile(null)}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
        </Upload>
      </Modal>
    </>
  );
};
