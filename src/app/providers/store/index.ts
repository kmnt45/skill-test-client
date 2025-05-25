import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'entities/user/model/slice';
import { categoriesReducer } from 'pages/categories/model/slice';
import { questionsReducer } from 'widgets/questions/model/slice';
import { taskReducer } from 'widgets/task/model/slice';
import { testReducer } from 'widgets/test/model/slice';
import { topicsReducer } from 'widgets/topics/model/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    questions: questionsReducer,
    topics: topicsReducer,
    test: testReducer,
    task: taskReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
