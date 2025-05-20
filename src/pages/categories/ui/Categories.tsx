import { FC, useEffect, useMemo } from 'react';


import { Spin } from 'antd';
import { getCategories } from 'pages/categories/model/asyncThunks';
import { useLocation } from 'react-router-dom';
import { LOADING_STAGE } from 'shared/constants';
import { useAppDispatch } from 'shared/hooks/useAppDispatch.ts';
import { useAppSelector } from 'shared/hooks/useAppSelector.ts';
import { CategoriesCards, Header, EmptyPlaceholder } from 'shared/ui';

export const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { apiData: categories, apiStatus } = useAppSelector(state => state.categories.categories);
  const isLoading = apiStatus === LOADING_STAGE.LOADING;

  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith('/questions')) return 'Вопросы';
    if (location.pathname.startsWith('/tests')) return 'Тесты';
    if (location.pathname.startsWith('/tasks')) return 'Задачи';
    return 'Категории';
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <Header>{pageTitle}</Header>
      <Spin spinning={isLoading}>
        {categories && categories.length ? (
          <CategoriesCards data={categories} />
        ) : (
          !isLoading && <EmptyPlaceholder />
        )}
      </Spin>
    </>
  );
};
