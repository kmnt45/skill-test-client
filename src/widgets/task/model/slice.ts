import { createSlice } from '@reduxjs/toolkit';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { ApiStatusState } from 'shared/model/types';

import { getTask, Task, submitSolution, SubmitSolutionResponse } from './asyncThunks';

interface TaskState {
  currentTask: ApiStatusState<Task>;
  submitResult: ApiStatusState<SubmitSolutionResponse>;
}

const initialState: TaskState = {
  currentTask: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
  submitResult: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearSubmitResult(state) {
      state.submitResult = initialState.submitResult;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state) => {
        state.currentTask.apiStatus = LOADING_STAGE.LOADING;
        state.currentTask.apiError = null;
      })
      .addCase(getTask.fulfilled, (state, { payload }) => {
        state.currentTask.apiStatus = LOADING_STAGE.LOAD;
        state.currentTask.apiData = payload;
      })
      .addCase(getTask.rejected, (state, { payload }) => {
        state.currentTask.apiStatus = LOADING_STAGE.LOAD;
        state.currentTask.apiError = payload || null;
        state.currentTask.apiData = null;
      })

      .addCase(submitSolution.pending, (state) => {
        state.submitResult.apiStatus = LOADING_STAGE.LOADING;
        state.submitResult.apiError = null;
        state.submitResult.apiData = null;
      })
      .addCase(submitSolution.fulfilled, (state, { payload }) => {
        state.submitResult.apiStatus = LOADING_STAGE.LOAD;
        state.submitResult.apiData = payload;
      })
      .addCase(submitSolution.rejected, (state, { payload }) => {
        state.submitResult.apiStatus = LOADING_STAGE.LOAD;
        state.submitResult.apiError = payload || null;
        state.submitResult.apiData = null;
      });
  },
});

export const { clearSubmitResult } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
