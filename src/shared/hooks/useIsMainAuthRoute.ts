import { useLocation } from 'react-router-dom';
import { MAIN_AUTH_ROUTES,  type RoutePath } from 'shared/constants/routes';

export const useIsMainAuthRoute = (): boolean => {
  const { pathname } = useLocation();
  return MAIN_AUTH_ROUTES.includes(pathname as RoutePath);
};
