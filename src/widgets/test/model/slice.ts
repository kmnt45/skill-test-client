import { createSlice } from '@reduxjs/toolkit';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { ApiStatusState } from 'shared/model/types';

import { getTestQuestion, checkTestAnswer, Question, CheckAnswerResponse, submitTest, TestResult } from './asyncThunks';

interface TestState {
  currentQuestion: ApiStatusState<Question>
  checkResult: ApiStatusState<CheckAnswerResponse>;
  testResult: ApiStatusState<TestResult>;
}

const initialState: TestState = {
  currentQuestion: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
  checkResult: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
  testResult: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    resetCheckResult(state) {
      state.checkResult.apiData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestQuestion.pending, (state) => {
        state.currentQuestion.apiStatus = LOADING_STAGE.LOADING;
        state.currentQuestion.apiError = null;
      })
      .addCase(getTestQuestion.fulfilled, (state, { payload }) => {
        state.currentQuestion.apiStatus = LOADING_STAGE.LOAD;
        state.currentQuestion.apiData = payload;
      })
      .addCase(getTestQuestion.rejected, (state, { payload }) => {
        state.currentQuestion.apiStatus = LOADING_STAGE.LOAD;
        state.currentQuestion.apiError = payload || null;
        state.currentQuestion.apiData = null;
      })
      .addCase(checkTestAnswer.fulfilled, (state, { payload }) => {
        state.checkResult.apiData = payload;
      })
      .addCase(submitTest.pending, (state) => {
        state.testResult.apiStatus = LOADING_STAGE.LOADING;
        state.testResult.apiError = null;
      })
      .addCase(submitTest.fulfilled, (state, { payload }) => {
        state.testResult.apiStatus = LOADING_STAGE.LOAD;
        state.testResult.apiData = payload;
      })
      .addCase(submitTest.rejected, (state, { payload }) => {
        state.testResult.apiStatus = LOADING_STAGE.LOAD;
        state.testResult.apiError = payload || null;
      });
  },
});

export const { resetCheckResult } = testSlice.actions;
export default testSlice.reducer;
