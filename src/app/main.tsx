import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { router } from 'app/providers/router';
import { AppThemeProvider } from 'app/providers/theme';
import { AppMessageProvider } from 'app/providers/message';
import { store } from 'app/store';

import 'shared/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <AppMessageProvider>
          <RouterProvider router={router} />
        </AppMessageProvider>
      </AppThemeProvider>
    </Provider>
  </StrictMode>,
);
