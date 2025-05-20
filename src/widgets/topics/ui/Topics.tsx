import { FC, useEffect, useMemo } from 'react';

import { Spin } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { CATEGORY_LABELS } from 'shared/constants/categoryLabels';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { Header, TopicsCards } from 'shared/ui';
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

  const pageTitle = useMemo(() => {
    return CATEGORY_LABELS[categoryId ?? ''] || 'Темы';
  }, [categoryId]);

  const topicsData = useMemo(() => {
    if (!topics) return [];
    return topics.map(test => ({
      title: test.title,
      path: `/${basePath}/${categoryId}/${test.slug}`,
    }));
  }, [topics, basePath, categoryId]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getTopics({ categoryId, basePath }));
    }
  }, [categoryId, dispatch]);

  return (
    <>
      <Header>{pageTitle}</Header>
      <Spin spinning={isLoading}>
        {!isLoading && topics && topics.length > 0 && (
          <TopicsCards data={topicsData} />
        )}
      </Spin>
    </>
  );
};
