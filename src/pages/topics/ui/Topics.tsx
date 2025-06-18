import { FC, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getTopics, selectTopics, selectTopicsStatus } from 'entities/category';
import { CATEGORY_LABELS, LOADING_STAGE } from 'shared/constants';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { EmptyPlaceholder, Header, Cards, Loader } from 'shared/ui';

export const Topics: FC = () => {
  const dispatch = useAppDispatch();

  const { categoryId } = useParams<{ categoryId: string }>();

  const { pathname } = useLocation();

  const topics = useAppSelector(selectTopics);

  const topicsStatus = useAppSelector(selectTopicsStatus);

  const isLoading = topicsStatus === LOADING_STAGE.LOADING;

  const basePath = useMemo(() => {
    if (pathname.startsWith('/questions')) return 'questions';

    if (pathname.startsWith('/tasks')) return 'tasks';

    return 'tests';
  }, [pathname]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getTopics({ categoryId, basePath }));
    }
  }, [basePath, categoryId, dispatch]);

  return (
    <>
      <Header>{CATEGORY_LABELS[categoryId ?? ''] || 'Темы'}</Header>
      {isLoading
        ? <Loader/>
        : topics?.length
          ? <Cards type={'topics'} data={topics} />
          : <EmptyPlaceholder />
      }
    </>
  );
};
