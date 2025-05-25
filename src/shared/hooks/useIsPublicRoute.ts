import { useLocation } from 'react-router-dom';
import { PUBLIC_ROUTES, type RoutePath } from 'shared/constants/routes';

export const useIsPublicRoute = (): boolean => {
  const { pathname } = useLocation();
  return PUBLIC_ROUTES.includes(pathname as RoutePath);
};
