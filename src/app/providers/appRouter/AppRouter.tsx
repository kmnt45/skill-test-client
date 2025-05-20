import { type FC, useEffect } from 'react';

import { getMe } from 'entities/user/model/asyncThunks';
import Cookies from 'js-cookie';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES, ROUTES } from 'shared/constants/routes';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { Layout } from 'widgets/layout/ui/Layout';

export const AppRouter: FC = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const userId = Cookies.get('user_id');

  const isPublicRouter = PUBLIC_ROUTES.includes(
    pathname as (typeof PUBLIC_ROUTES)[number]
  );

  useEffect(() => {
    if (!userId) return;

    dispatch(getMe({ id: userId }));
  }, [userId, dispatch]);

  useEffect(() => {

    if (!userId && !isPublicRouter) {
      navigate(ROUTES.LOGIN);
    }

    if (userId && isPublicRouter) {
      navigate(ROUTES.HOME);
    }
  }, [isPublicRouter, navigate, userId]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
