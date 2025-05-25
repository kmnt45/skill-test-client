import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { logout } from 'entities/user/model/slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth', { replace: true });
  };

  return (
    <Button
      type="primary"
      danger
      icon={<LogoutOutlined />}
      onClick={handleLogout}
    >
      Выйти
    </Button>
  );
};
