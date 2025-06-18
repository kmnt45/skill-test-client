import { createAsyncThunk } from '@reduxjs/toolkit';
import { appAxios } from 'shared/api/appAxios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

import { Category, Topic } from '../types';

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: ErrorMessageType }
>('categories/getCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.get('/categories');
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const getTopics = createAsyncThunk<
  Topic[],
  { categoryId: string; basePath: string },
  { rejectValue: ErrorMessageType }
>('topics/getTests', async ({ categoryId, basePath }, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.get(`/${categoryId}/${basePath}`);
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

