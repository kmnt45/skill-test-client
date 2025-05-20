import { FC, ReactNode, useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { LeftSideBar } from 'widgets/leftSideBar';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isPublicPage = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER || pathname === ROUTES.RESTORE;

  return (
    <div className={styles.layout}>
      {!isPublicPage && !isMobile && <LeftSideBar />}
      <main className={styles.main}>{children}</main>
    </div>
  );
};
