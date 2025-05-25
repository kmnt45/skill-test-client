import { FC, useEffect, useMemo } from 'react';

import { Flex, Spin } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { CATEGORY_LABELS } from 'shared/constants/categoryLabels';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { EmptyPlaceholder, Header, TopicsCards } from 'shared/ui';
import { getTopics } from 'widgets/topics/model/asyncThunks';

export const Topics: FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();

  const { apiData: topics, apiStatus } = useAppSelector(state => state.topics.topics);
  const isLoading = apiStatus === LOADING_STAGE.LOADING;

  const basePath = useMemo(() => {
    if (location.pathname.startsWith('/questions')) return 'questions';
    if (location.pathname.startsWith('/tasks')) return 'tasks';
    return 'tests';
  }, [location.pathname]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getTopics({ categoryId, basePath }));
    }
  }, [categoryId, dispatch]);

  return (
    <>
      <Header>{CATEGORY_LABELS[categoryId ?? ''] || 'Темы'}</Header>
      {isLoading ?
        (<Flex align={'center'} justify={'center'} flex={1}>
          <Spin size="large" />
        </Flex>) :
        topics?.length ?
          <TopicsCards data={topics} /> :
          <EmptyPlaceholder />
      }
    </>
  );
};
