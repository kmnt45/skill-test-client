import { useEffect } from 'react';

import { ConfigProvider, App, theme as antdTheme } from 'antd';
import { useAppSelector } from 'shared/hooks/useAppSelector';

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};
