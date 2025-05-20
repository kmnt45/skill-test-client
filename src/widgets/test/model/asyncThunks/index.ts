import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorMessageType } from 'shared/models';
import { configuredAxios } from 'shared/utils/axios.utils.ts';
import { HandleError } from 'shared/utils/handleError.ts';

export interface Question {
  question: string;
  progress: {total: number; current: number};
  code: string | null;
  answers: string[];
}

export interface CheckAnswerResponse {
  correct: boolean;
}

export interface TestResult {
  correctAnswers: number;
  totalQuestions: number;
  pointsEarned: number;
}
export const getTestQuestion = createAsyncThunk<
  Question,
  { categoryId: string; testId: string; index: number },
  { rejectValue: ErrorMessageType }
>('test/getTestQuestion', async (params, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get(
      `/${params.categoryId}/tests/${params.testId}/${params.index}`,
    );
    console.log(params.categoryId, params.testId, params.index)
    return data;
  } catch (error) {
    return rejectWithValue(HandleError(error));
  }
});

export const checkTestAnswer = createAsyncThunk<
  CheckAnswerResponse,
  { categoryId: string; testId: string; index: number; answerIndex: number },
  { rejectValue: ErrorMessageType }
>('test/checkAnswer', async (params, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.post(
      `/${params.categoryId}/tests/${params.testId}/${params.index}/check`,
      { answerIndex: params.answerIndex },
    );
    return data;
  } catch (error) {
    return rejectWithValue(HandleError(error));
  }
});

export const submitTest = createAsyncThunk<
  TestResult,
  { categoryId: string; testId: string; answers: number[] },
  { rejectValue: ErrorMessageType }
>(
  'test/submitTest',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await configuredAxios.post(
        `/${params.categoryId}/tests/${params.testId}/complete`,
        { answers: params.answers }
      );
      return data;
    } catch (error) {
      return rejectWithValue(HandleError(error));
    }
  }
);
