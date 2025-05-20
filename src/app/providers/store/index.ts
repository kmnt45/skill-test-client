  import { configureStore } from '@reduxjs/toolkit'
  import themeReducer from 'entities/theme/model/slice'
  import authSlice from 'pages/auth/model/slice'
  import categoriesReducer from 'pages/categories/model/slice'
  import userReducer from 'pages/profile/model/slice'
  import ratingReducer from 'pages/rating/model/slice'
  import questionsReducer from 'widgets/questions/model/slice'
  import testReducer from 'widgets/test/model/slice'
  import topicsReducer from 'widgets/topics/model/slice'

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