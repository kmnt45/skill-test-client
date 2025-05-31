import { createContext, ReactNode, useContext } from 'react';
import { message } from 'antd';

type MessageApi = ReturnType<typeof message.useMessage>[0];

const AppMessageContext = createContext<MessageApi | null>(null);

export const useAppMessage = (): MessageApi => {
  const context = useContext(AppMessageContext);
  if (!context) throw new Error('useAppMessage must be used within <AppMessageProvider>');
  return context;
};

export const AppMessageProvider = ({ children }: { children: ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <AppMessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </AppMessageContext.Provider>
  );
};
