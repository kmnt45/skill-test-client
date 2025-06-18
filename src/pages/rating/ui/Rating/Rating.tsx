import { FC, useEffect } from 'react';

import { getUsers } from 'entities/user/model/asyncThunks';
import { selectUsers, selectUsersStatus } from 'entities/user/model/selectors';

import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { Cards, EmptyPlaceholder, Header, Loader } from 'shared/ui';

import { LOADING_STAGE } from 'shared/constants';

export const Rating: FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);

  const usersStatus = useAppSelector(selectUsersStatus);

  const isLoading = usersStatus === LOADING_STAGE.LOADING;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Header>Рейтинг пользователей</Header>
      {isLoading ? <Loader/> :
      users?.length ? <Cards type={'users'} data={users}/> :
        <EmptyPlaceholder />
      }
    </>
  );
};
