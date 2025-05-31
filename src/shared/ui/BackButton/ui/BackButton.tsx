import { FC } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

type BackButtonProps = {
  text?: string;
  className?: string;
};

export const BackButton: FC<BackButtonProps> = ({ text = 'Назад', className }) => {
  const navigate = useNavigate();

  return (
    <Button style={{padding: 0}}
      onClick={() => navigate(-1)}
      icon={<ArrowLeftOutlined />}
      className={className}
      type="link"
    >
      {text}
    </Button>
  );
};
