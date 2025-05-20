import { createContext, ReactNode, useContext } from 'react';

import { notification } from 'antd';

const NotificationContext = createContext<ReturnType<typeof notification.useNotification> | null>(null);

export const useGlobalNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useGlobalNotification must be used within <NotificationProvider>');
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const notificationApi = notification.useNotification();

  return (
    <NotificationContext.Provider value={notificationApi}>
      {notificationApi[1]}
      {children}
    </NotificationContext.Provider>
  );
};
