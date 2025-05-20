import { configureStore } from '@reduxjs/toolkit';
import themeReducer from 'entities/theme/model/slice';
import userReducer from 'entities/user/model/slice';
import authSlice from 'pages/auth/model/slice';
import categoriesReducer from 'pages/categories/model/slice';
import questionsReducer from 'widgets/questions/model/slice';
import testReducer from 'widgets/test/model/slice';
import topicsReducer from 'widgets/topics/model/slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authSlice,
    user: userReducer,
    categories: categoriesReducer,
    questions: questionsReducer,
    topics: topicsReducer,
    test: testReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
