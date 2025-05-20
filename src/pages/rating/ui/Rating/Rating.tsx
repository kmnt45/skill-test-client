import { FC, useEffect } from 'react';

import { Avatar } from 'antd';
import { getUsers } from 'entities/user/model/asyncThunks';
import { selectUsers } from 'entities/user/model/selectors';
import { NavLink } from 'react-router-dom';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { Header } from 'shared/ui';

import styles from './Rating.module.scss';

export const Rating: FC = () => {
  const dispatch = useAppDispatch();

  const { apiData: users, apiStatus, apiError } = useAppSelector(selectUsers);
  const me = useAppSelector((state) => state.user.me.apiData);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (apiStatus === LOADING_STAGE.LOADING) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  if (apiError) {
    return <div className={styles.error}>Ошибка: {apiError.message}</div>;
  }

  if (!users) {
    return <div className={styles.error}>Данные отсутствуют</div>;
  }

  return (
    <>
      <Header>Рейтинг пользователей</Header>
      <div className={styles.items}>
        {users.map((user) => {
          const isMe = me && user.id === me.id;
          return (
            <div key={user.id} className={styles.item}>
              <Avatar
                src={user.avatarUrl ? `http://localhost:5000${user.avatarUrl}` : undefined}
                alt={user.nickName}
                className={styles.avatar}
              />
              <NavLink to={`/profile/${user.id}`} className={styles.name}>
                {user.nickName} {isMe && <span className={styles.youLabel}>(Вы)</span>}
              </NavLink>
              <div className={styles.points}>{user.points} очков</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
