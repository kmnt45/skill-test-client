import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from 'entities/category/model/slice';
import { contentReducer } from 'entities/content/model/slice';
import { userReducer } from 'entities/user/model/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoriesReducer,
    content: contentReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
