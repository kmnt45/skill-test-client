import { createAsyncThunk } from '@reduxjs/toolkit';
import { configuredAxios } from 'shared/api/axios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

export const getCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: ErrorMessageType }
>('categories/getCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get('/categories');
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});
