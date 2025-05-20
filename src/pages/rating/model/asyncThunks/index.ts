import { createAsyncThunk } from '@reduxjs/toolkit';
import { configuredAxios } from 'shared/api/axios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';
import { User } from 'shared/model/types';

export const getUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: ErrorMessageType }
>('rating/getUsers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get('/users');
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});
