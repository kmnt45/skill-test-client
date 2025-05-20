import { createAsyncThunk } from '@reduxjs/toolkit';
import { configuredAxios } from 'shared/api/axios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

export interface Topic {
  title: string;
  slug: string;
}

export const getTopics = createAsyncThunk<
  Topic[],
  { categoryId: string; basePath: string },
  { rejectValue: ErrorMessageType }
>('topics/getTests', async ({ categoryId, basePath }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get(`/${categoryId}/${basePath}`);
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});
