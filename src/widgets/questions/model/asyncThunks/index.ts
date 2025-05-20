import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorMessageType } from 'shared/models';
import { configuredAxios } from 'shared/utils/axios.utils.ts';
import { HandleError } from 'shared/utils/handleError.ts';

export type Question = {
  slug: string;
  title: string;
};

export const getQuestionsList = createAsyncThunk<
  Question[],
  string,
  { rejectValue: ErrorMessageType }
>(
  'categories/getQuestionsList',
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await configuredAxios.get(`${categoryId}/questions`);
      return data;
    } catch (error) {
      return rejectWithValue(HandleError(error));
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
      const { data } = await configuredAxios.get(`${categoryId}/questions/${questionSlug}`);
      return { question: questionSlug, answer: data.content };
    } catch (error) {
      return rejectWithValue(HandleError(error));
    }
  }
);
