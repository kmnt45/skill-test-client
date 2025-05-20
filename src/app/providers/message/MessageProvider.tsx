import { createContext, ReactNode, useContext } from 'react';

import { message } from 'antd';

type MessageApi = ReturnType<typeof message.useMessage>[0];

const MessageContext = createContext<MessageApi | null>(null);

export const useGlobalMessage = (): MessageApi => {
  const context = useContext(MessageContext);
  if (!context) throw new Error('useGlobalMessage must be used within <MessageProvider>');
  return context;
};

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={messageApi}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};
