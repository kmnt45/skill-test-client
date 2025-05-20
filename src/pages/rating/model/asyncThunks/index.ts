import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorMessageType } from 'shared/models';
import { User } from 'shared/models';
import { configuredAxios } from 'shared/utils/axios.utils';
import { HandleError } from 'shared/utils/handleError';

export const getUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: ErrorMessageType }
>('rating/getUsers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get('/users');
    return data;
  } catch (error) {
    return rejectWithValue(HandleError(error));
  }
});
