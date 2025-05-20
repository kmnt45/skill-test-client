import { createAsyncThunk } from '@reduxjs/toolkit';

import { ErrorMessageType } from 'shared/models';
import { configuredAxios } from 'shared/utils/axios.utils.ts';
import { HandleError } from 'shared/utils/handleError.ts';
import { AuthResponse, CreateUser } from 'pages/auth/model/types.ts';

export const registerUser = createAsyncThunk<
  AuthResponse,
  CreateUser,
  { rejectValue: ErrorMessageType }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.post('/auth/register', userData);
    return data;
  } catch (error) {
    return rejectWithValue(HandleError(error));
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: ErrorMessageType }
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.post('/auth/login', credentials);
    return data;
  } catch (error) {
    return rejectWithValue(HandleError(error));
  }
});

