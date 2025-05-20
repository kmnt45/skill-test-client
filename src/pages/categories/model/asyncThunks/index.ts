import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorMessageType } from 'shared/models';
import { configuredAxios } from 'shared/utils/axios.utils.ts';
import { HandleError } from 'shared/utils/handleError.ts';

export const getCategories = createAsyncThunk<
  string[],
  void,
  { rejectValue: ErrorMessageType }
>('categories/getCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get('/categories');
    return data;
  } catch (error) {
    return rejectWithValue(HandleError(error));
  }
});
