import { FC, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { Header } from 'shared/ui';

import styles from './Rating.module.scss';
import { getUsers } from '../../model/asyncThunks';
import { selectUsers } from '../../model/selectors';



export const Rating: FC = () => {
  const dispatch = useAppDispatch();
  const { apiData: users, apiStatus } = useAppSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (apiStatus === LOADING_STAGE.LOADING) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  if (!users) {
    return <div className={styles.error}>Ошибка загрузки данных</div>;
  }

  return (
    <>
      <Header>Рейтинг пользователей</Header>
      <div className={styles.items}>
        {users.map((user) => (
          <li key={user.id} className={styles.item}>
            <img
              src={`http://localhost:5000${user.avatarUrl}`}
              alt={user.nickName}
              className={styles.avatar}
            />
            <Link to={`/profile/${user.id}`} className={styles.name}>
              {user.nickName}
            </Link>
            <div className={styles.points}>{user.points} очков</div>
          </li>
        ))}
      </div>
    </>
  );
};
