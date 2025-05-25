import { FC, useEffect } from 'react';

import { Flex, Spin } from 'antd';
import { getCategories } from 'pages/categories/model/asyncThunks';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { CategoriesCards, Header, EmptyPlaceholder } from 'shared/ui';

export const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { apiData: categories, apiStatus } = useAppSelector(state => state.categories.categories);
  const isLoading = apiStatus === LOADING_STAGE.LOADING;

  const pageTitle =
    location.pathname.startsWith(ROUTES.QUESTIONS) ? 'Вопросы' :
      location.pathname.startsWith(ROUTES.TESTS) ? 'Тесты' :
        location.pathname.startsWith(ROUTES.TASKS) ? 'Задачи' :
          'Категории';

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <Header>{pageTitle}</Header>
      {isLoading ?
        (<Flex align={'center'} justify={'center'} style={{ height: '100%' }}>
          <Spin size="large" />
        </Flex>) :
        categories?.length ?
          <CategoriesCards data={categories} /> :
          <EmptyPlaceholder />
      }
    </>
  );
};
