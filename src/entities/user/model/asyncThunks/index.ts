import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { appAxios } from 'shared/api/appAxios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

import { AuthResponse, LoginUser, RegisterUser } from '../types';
import { User } from '../types';

export const getMe = createAsyncThunk<
  User,
  void,
  { rejectValue: ErrorMessageType }
>('user/getMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.get('/users/me');
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const getUser = createAsyncThunk<
  User,
  string,
  { rejectValue: ErrorMessageType }
>('user/getUser', async (id, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.get(`/users/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const getUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: ErrorMessageType }
>('user/getUsers', async (_, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.get('/users');
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const updateUserProfile = createAsyncThunk<
  User,
  { data: Partial<{ nickName: string; about: string; email?: string; password?: string }> },
  { rejectValue: ErrorMessageType }
>('user/updateUserProfile', async ({ data }, { rejectWithValue }) => {
  try {
    const { data: response } = await appAxios.patch('/users/me', data);
    return response;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const updateUserAvatar = createAsyncThunk<
  User,
  { avatarFile: File },
  { rejectValue: ErrorMessageType }
>('user/updateUserAvatar', async ({ avatarFile }, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const { data: response } = await appAxios.patch('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterUser,
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
  LoginUser,
  { rejectValue: ErrorMessageType }
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.post('/auth/login', credentials);
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const initAuth = createAsyncThunk(
  'user/initAuth',
  async (_, { dispatch }) => {
    const userId = Cookies.get('user_id');
    if (!userId) return null;

    const result = await dispatch(getMe());
    if (getMe.fulfilled.match(result)) {
      return result.payload;
    }

    return null;
  }
);

export const restorePassword = createAsyncThunk<
  { message: string },
  { email: string },
  { rejectValue: ErrorMessageType }
>('auth/restorePassword', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await appAxios.post('/auth/restore', payload);
    return data;
  } catch (error) {
    return rejectWithValue(handleError(error));
  }
});

export const resetPassword = createAsyncThunk<
  { message: string },
  { token: string; newPassword: string },
  { rejectValue: ErrorMessageType }
>(
  'auth/resetPassword',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await appAxios.post('/auth/reset-password', payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);


