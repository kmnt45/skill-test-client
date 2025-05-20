import { type FC, useEffect } from 'react';

import { Layout } from 'app/Layout';
import Cookies from 'js-cookie';
import { getUser } from 'pages/profile/model/asyncThunks';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTES, ROUTES } from 'shared/constants';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';

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

    dispatch(getUser({ id: userId }));
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
