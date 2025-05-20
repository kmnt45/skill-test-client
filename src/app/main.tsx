import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { NotificationProvider } from './providers/notification/NotificationProvider';
import { AppRouter } from './providers/router';
import { rootStore } from './providers/store';
import { AppThemeProvider } from './providers/theme';

import 'shared/styles/index.scss';

const store = rootStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <NotificationProvider>
          <AppRouter />
        </NotificationProvider>
      </AppThemeProvider>
    </Provider>
  </StrictMode>
);
