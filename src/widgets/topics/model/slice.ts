import { createSlice } from '@reduxjs/toolkit';
import { LOADING_STAGE } from 'shared/constants';
import { ApiStatusState } from 'shared/models';

import { getTopics, Topic } from './asyncThunks';

interface TopicsState {
  topics: ApiStatusState<Topic[]>;
}

const initialState: TopicsState = {
  topics: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default topicsSlice.reducer;
