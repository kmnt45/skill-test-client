import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import { MessageProvider } from 'app/providers/message/MessageProvider';
import { Provider } from 'react-redux';

import { AppRouter } from './providers/router';
import { store } from './providers/store';
import { AppThemeProvider } from './providers/theme';

import 'shared/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <MessageProvider>
          <AppRouter />
        </MessageProvider>
      </AppThemeProvider>
    </Provider>
  </StrictMode>
);
