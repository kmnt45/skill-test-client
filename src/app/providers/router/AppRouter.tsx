import { useEffect } from 'react';

import { initAuth } from 'entities/user/model/asyncThunks';
import { Outlet, Navigate } from 'react-router-dom';
import { ROUTES } from 'shared/constants';
import { useAppDispatch, useAppSelector, useIsPublicRoute } from 'shared/hooks';
import { Layout } from 'widgets/layout';

export const AppRouter = () => {
  const dispatch = useAppDispatch();

  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked);
  const user = useAppSelector((state) => state.user.me.apiData);
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  if (!isAuthChecked) return null;

  const isPublicRoute = useIsPublicRoute();

  if (isPublicRoute && isLoggedIn) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  if (!isPublicRoute && !isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
