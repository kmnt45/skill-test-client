import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import { MessageProvider } from 'app/providers/message/MessageProvider';
import { Provider } from 'react-redux';

import { router } from './providers/router';
import { store } from './providers/store';
import { AppThemeProvider } from './providers/theme';

import 'shared/styles/index.scss';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <MessageProvider>
          <RouterProvider router={router} />
        </MessageProvider>
      </AppThemeProvider>
    </Provider>
  </StrictMode>
);
