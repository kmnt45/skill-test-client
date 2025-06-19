import { createAsyncThunk } from '@reduxjs/toolkit';
import { appAxios } from 'shared/api/appAxios';
import { useHandleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

import {
  CheckAnswerResponse,
  Question,
  Task, TestQuestion,
  TestResult,
} from '../types';


export const getTestQuestion = createAsyncThunk<
  TestQuestion,
  { categoryId: string; testId: string; index: number },
  { rejectValue: ErrorMessageType }
>('test/getTestQuestion', async (params, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.get(
      `/${params.categoryId}/tests/${params.testId}/${params.index}`,
    );
    console.log(params.categoryId, params.testId, params.index)
    return data;
  } catch (error) {
    return rejectWithValue(useHandleError(error));
  }
});

export const checkTestAnswer = createAsyncThunk<
  CheckAnswerResponse,
  { categoryId: string; testId: string; index: number; answerIndex: number },
  { rejectValue: ErrorMessageType }
>('test/checkAnswer', async (params, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.post(
      `/${params.categoryId}/tests/${params.testId}/${params.index}/check`,
      { answerIndex: params.answerIndex },
    );
    return data;
  } catch (error) {
    return rejectWithValue(useHandleError(error));
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
      const { data } = await appAxios.post(
        `/${params.categoryId}/tests/${params.testId}/complete`,
        { answers: params.answers }
      );
      return data;
    } catch (error) {
      return rejectWithValue(useHandleError(error));
    }
  }
);

export const getTask = createAsyncThunk<
  Task,
  { categoryId: string; taskId: string },
  { rejectValue: ErrorMessageType }
>(
  'task/getTask',
  async ({ categoryId, taskId }, { rejectWithValue }) => {
    try {
      const { data } = await appAxios.get(`/${categoryId}/tasks/${taskId}`);
      return data;
    } catch (error) {
      return rejectWithValue(useHandleError(error));
    }
  }
);

export const submitSolution = createAsyncThunk<
  { success: boolean; message: string; pointsEarned?: number },
  { categoryId: string; taskId: string; solution: string; language: string },
  { rejectValue: ErrorMessageType }
>(
  'content/submitSolution',
  async ({ categoryId, taskId, solution, language }, { rejectWithValue }) => {
    try {
      const response = await appAxios.post(
        `/${categoryId}/tasks/${taskId}/submit`,
        { solution, language }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(useHandleError(error));
    }
  }
);

export const getQuestionsList = createAsyncThunk<
  Question[],
  string,
  { rejectValue: ErrorMessageType }
>(
  'categories/getQuestionsList',
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await appAxios.get(`${categoryId}/questions`);
      return data;
    } catch (error) {
      return rejectWithValue(useHandleError(error));
    }
  }
);

export const getQuestionContent = createAsyncThunk<
  { question: string; answer: string },
  { categoryId: string; questionSlug: string },
  { rejectValue: ErrorMessageType }
>(
  'categories/getQuestionContent',
  async ({ categoryId, questionSlug }, { rejectWithValue }) => {
    try {
      const { data } = await appAxios.get(`${categoryId}/questions/${questionSlug}`);
      return { question: questionSlug, answer: data.content };
    } catch (error) {
      return rejectWithValue(useHandleError(error));
    }
  }
);