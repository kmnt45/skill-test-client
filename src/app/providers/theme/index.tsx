import { useEffect } from 'react';

import { ConfigProvider, App, theme as antdTheme } from 'antd';
import { useAppSelector } from 'shared/hooks/useAppSelector';

const customThemeConfig = {
  "token": {
    "colorPrimary": "#09def6",
    "colorInfo": "#09def6",
    "fontSize": 16
  },
  "components": {
    "Input": {
      "paddingBlock": 15,
      "paddingInline": 15,
      "borderRadius": 20
    },
    "Button": {
      "controlHeight": 55,
      "paddingInline": 15,
      "borderRadius": 20,
    },
  }
}

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
        ...customThemeConfig,
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};
