import { createAsyncThunk } from '@reduxjs/toolkit';
import { appAxios } from 'shared/api/appAxios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

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
      const { data } = await appAxios.get(`${categoryId}/questions`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
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
      return rejectWithValue(handleError(error));
    }
  }
);
