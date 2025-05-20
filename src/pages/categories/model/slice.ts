import { createSlice } from '@reduxjs/toolkit';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { ApiStatusState } from 'shared/model/types';

import { getCategories } from './asyncThunks';

interface CategoriesState {
  categories: ApiStatusState<string[]>;
}

const initialState: CategoriesState = {
  categories: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
};

const categoriesSlice = createSlice({
  name: 'categories',
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
      });
  },
});

export default categoriesSlice.reducer;
