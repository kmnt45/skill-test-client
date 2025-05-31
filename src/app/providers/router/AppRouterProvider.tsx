import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { initAuth, selectIsAuthChecked, selectMeData } from 'entities/user';
import { ROUTES } from 'shared/constants';
import { useAppDispatch, useAppSelector, useIsPublicRoute } from 'shared/hooks';
import { Layout } from 'widgets/layout';

export const AppRouterProvider = () => {
  const dispatch = useAppDispatch();

  const isAuthChecked = useAppSelector(selectIsAuthChecked);

  const user = useAppSelector(selectMeData);

  const isLoggedIn = Boolean(user);

  const isPublicRoute = useIsPublicRoute();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  if (!isAuthChecked) return null;

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
