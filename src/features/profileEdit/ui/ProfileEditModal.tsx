import { FC } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Modal, Input, Upload, Button } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';

const { TextArea } = Input;

type ProfileEditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nickName: string;
  setNickName: (value: string) => void;
  about: string;
  setAbout: (value: string) => void;
  uploadFileList: UploadFile[];
  onUploadChange: (info: { fileList: UploadFile[] }) => void;
  onSave: () => Promise<boolean>;
};

export const ProfileEditModal: FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  nickName,
  setNickName,
  about,
  setAbout,
  uploadFileList,
  onUploadChange,
  onSave,
}) => {
  const handleOk = async () => {
    const success = await onSave();
    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      title="Редактировать профиль"
      open={isOpen}
      onCancel={onClose}
      onOk={handleOk}
      okText="Сохранить"
      cancelText="Отмена"
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
        onChange={onUploadChange}
        onRemove={() => onUploadChange({ fileList: [] })}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
      </Upload>
    </Modal>
  );
};
