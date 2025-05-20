import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorMessageType } from 'shared/models';
import { configuredAxios } from 'shared/utils/axios.utils.ts';
import { HandleError } from 'shared/utils/handleError.ts';

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
    return rejectWithValue(HandleError(error));
  }
});
