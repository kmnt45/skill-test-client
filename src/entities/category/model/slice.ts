import { createSlice } from '@reduxjs/toolkit';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { ApiStatusState } from 'shared/model/types';

import { getCategories, getTopics } from './asyncThunks';
import { Topic } from './types';

interface CategoriesState {
  categories: ApiStatusState<string[]>;
  topics: ApiStatusState<Topic[]>;
}

const initialState: CategoriesState = {
  categories: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
  topics: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, { payload }) => {
        state.categories.apiStatus = LOADING_STAGE.LOADING;
        state.categories.apiError = payload || null;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories.apiStatus = LOADING_STAGE.LOAD;
        state.categories.apiData = payload;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.categories.apiStatus = LOADING_STAGE.LOAD;
        state.categories.apiError = payload || null;
      })
      .addCase(getTopics.pending, (state) => {
        state.topics.apiStatus = LOADING_STAGE.LOADING;
        state.topics.apiError = null;
      })
      .addCase(getTopics.fulfilled, (state, { payload }) => {
        state.topics.apiStatus = LOADING_STAGE.LOAD;
        state.topics.apiData = payload;
      })
      .addCase(getTopics.rejected, (state, { payload }) => {
        state.topics.apiStatus = LOADING_STAGE.LOAD;
        state.topics.apiError = payload || null;
      });
  },
});

export const categoriesReducer = categorySlice.reducer;
