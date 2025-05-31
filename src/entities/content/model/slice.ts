import { createSlice } from '@reduxjs/toolkit';
import {
  CheckAnswerResponse,
  Question,
  SubmitSolutionResponse,
  Task,
  TestQuestion,
  TestResult,
} from 'entities/content/model/types';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { ApiStatusState } from 'shared/model/types';

import {
  getTask,
  submitSolution,
  getTestQuestion,
  checkTestAnswer,
  submitTest, getQuestionsList, getQuestionContent,
} from './asyncThunks';

interface TaskState {
  currentTask: ApiStatusState<Task>;
  submitResult: ApiStatusState<SubmitSolutionResponse>;
  currentQuestion: ApiStatusState<TestQuestion>
  checkResult: ApiStatusState<CheckAnswerResponse>;
  testResult: ApiStatusState<TestResult>;
  questionsList: ApiStatusState<Question[]>;
  answers: Record<string, ApiStatusState<string>>;
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
  questionsList: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
  answers: {},
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearSubmitResult(state) {
      state.submitResult = initialState.submitResult;
    },
    resetCheckResult(state) {
      state.checkResult.apiData = null;
    },
    resetTestResult(state) {
      state.testResult.apiData = null;
      state.testResult.apiStatus = LOADING_STAGE.LOAD;
      state.testResult.apiError = null;
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
      })
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
      })
      .addCase(getQuestionsList.pending, (state) => {
        state.questionsList.apiStatus = LOADING_STAGE.LOADING;
        state.questionsList.apiError = null;
      })
      .addCase(getQuestionsList.fulfilled, (state, { payload }) => {
        state.questionsList.apiStatus = LOADING_STAGE.LOAD;
        state.questionsList.apiData = payload;
      })
      .addCase(getQuestionsList.rejected, (state, { payload }) => {
        state.questionsList.apiStatus = LOADING_STAGE.LOAD;
        state.questionsList.apiError = payload || null;
      })
      .addCase(getQuestionContent.pending, (state, { meta }) => {
        const questionSlug = meta.arg.questionSlug;
        if (!state.answers[questionSlug]) {
          state.answers[questionSlug] = {
            apiData: null,
            apiStatus: LOADING_STAGE.LOADING,
            apiError: null,
          };
        } else {
          state.answers[questionSlug].apiStatus = LOADING_STAGE.LOADING;
          state.answers[questionSlug].apiError = null;
        }
      })
      .addCase(getQuestionContent.fulfilled, (state, { payload }) => {
        const { question, answer } = payload;
        state.answers[question] = {
          apiData: answer,
          apiStatus: LOADING_STAGE.LOAD,
          apiError: null,
        };
      })
      .addCase(getQuestionContent.rejected, (state, { payload, meta }) => {
        const questionSlug = meta.arg.questionSlug;
        state.answers[questionSlug] = {
          apiData: null,
          apiStatus: LOADING_STAGE.LOAD,
          apiError: payload || null,
        };
      });
  },
});

export const { clearSubmitResult, resetCheckResult, resetTestResult } = contentSlice.actions;
export const contentReducer = contentSlice.reducer;
