import { createAsyncThunk } from '@reduxjs/toolkit';
import { appAxios } from 'shared/api/appAxios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

export const getCategories = createAsyncThunk<
  string[],
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
