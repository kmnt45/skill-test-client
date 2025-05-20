import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, CreateUser } from 'pages/auth/model/types';
import { appAxios } from 'shared/api/appAxios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

export const registerUser = createAsyncThunk<
  AuthResponse,
  CreateUser,
  { rejectValue: ErrorMessageType }
>('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.post('/auth/register', userData);
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: ErrorMessageType }
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.post('/auth/login', credentials);
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});