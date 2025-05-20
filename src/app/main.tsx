import { StrictMode, useEffect } from 'react';

import ReactDOM from 'react-dom/client';

import { App, ConfigProvider, theme as antdTheme } from 'antd';
import 'shared/styles/index.scss';

import { NotificationProvider } from 'app/NotificationProvider';
import { router } from 'app/router/routes';
import { rootStore } from 'app/store';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { useAppSelector } from 'shared/hooks/useAppSelector';

const store = rootStore();

const ThemedApp = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <App>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </App>
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </StrictMode>,
);
