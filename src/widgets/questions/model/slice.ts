import { createSlice } from '@reduxjs/toolkit';
import { LOADING_STAGE } from 'shared/constants';
import { ApiStatusState } from 'shared/models';

import { getQuestionsList, getQuestionContent, Question } from './asyncThunks';

interface QuestionsState {
  questionsList: ApiStatusState<Question[]>;
  answers: {
    [questionSlug: string]: ApiStatusState<string>;
  };
}

const initialState: QuestionsState = {
  questionsList: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
  answers: {},
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export default categoriesSlice.reducer;
