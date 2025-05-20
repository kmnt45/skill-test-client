import { configureStore } from '@reduxjs/toolkit'
import authSlice from 'pages/auth/model/slice.ts'
import categoriesReducer from 'pages/categories/model/slice.ts'
import userReducer from 'pages/profile/model/slice.ts'
import ratingReducer from 'pages/rating/model/slice.ts'
import questionsReducer from 'widgets/questions/model/slice.ts'
import testReducer from 'widgets/test/model/slice.ts'
import topicsReducer from 'widgets/topics/model/slice.ts'

import themeReducer from './themeSlice.ts'

export const rootStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      auth: authSlice,
      user: userReducer,
      categories: categoriesReducer,
      questions: questionsReducer,
      topics: topicsReducer,
      test: testReducer,
      rating: ratingReducer,
    },
    devTools: true,
  })

export type RootState = ReturnType<ReturnType<typeof rootStore>['getState']>;
export type AppDispatch = ReturnType<typeof rootStore>['dispatch'];