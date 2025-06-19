import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { getCategories, selectCategories, selectCategoriesStatus } from 'entities/category';
import { ROUTES, LOADING_STAGE } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { Header, EmptyPlaceholder, Cards, Loader } from 'shared/ui';

export const Categories: FC = () => {
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const categories = useAppSelector(selectCategories);

  const categoriesStatus = useAppSelector(selectCategoriesStatus);

  const isLoading = categoriesStatus === LOADING_STAGE.LOADING;

  const pageTitle =
    pathname === ROUTES.QUESTIONS ? 'Вопросы' :
      pathname === ROUTES.TESTS ? 'Тесты' :
        pathname === ROUTES.TASKS ? 'Задачи' :
          'Категории';

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <Header>{pageTitle}</Header>
      {isLoading ?
        <Loader /> :
        categories?.length
          ? <Cards
            type={'categories'}
            data={categories}
          />
          : <EmptyPlaceholder />
      }
    </>
  );
};
