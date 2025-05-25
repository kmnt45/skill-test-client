import { ReactNode } from 'react';

import { ConfigProvider, App, theme as antdTheme } from 'antd';

const customThemeConfig = {
  'token': {
    'colorPrimary': '#09def6',
    'colorInfo': '#09def6',
    'fontSize': 16,
  },
  'components': {
    'Input': {
      'paddingBlock': 15,
      'paddingInline': 15,
      'borderRadius': 20,
    },
    'Button': {
      'controlHeight': 55,
      'paddingInline': 15,
      'borderRadius': 20,
    },
    'List': {
      'borderRadiusLG': 20,
      'itemPadding': '20px',
    },
  },
};

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {

  return (
    <ConfigProvider
      theme={{
        algorithm:
        antdTheme.darkAlgorithm,
        ...customThemeConfig,
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};
