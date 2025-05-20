// entities/user/model/asyncThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { appAxios } from 'shared/api/appAxios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

import { User } from '../types';

export const getMe = createAsyncThunk<
  User,
  { id?: string } | void,
  { rejectValue: ErrorMessageType }
>('user/getMe', async ({ id } = {}, { rejectWithValue }) => {
  try {
    const url = id ? `/users/${id}` : '/users/me';
    const { data } = await appAxios.get(url);
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
