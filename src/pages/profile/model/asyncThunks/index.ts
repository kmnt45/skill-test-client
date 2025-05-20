import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorMessageType } from 'shared/models';
import { User } from 'shared/models';
import { configuredAxios } from 'shared/utils/axios.utils.ts';
import { HandleError } from 'shared/utils/handleError.ts';

export const getUser = createAsyncThunk<
  User,
  { id?: string },
  { rejectValue: ErrorMessageType }
>('user/getUser', async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await configuredAxios.get(`/users/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(HandleError(error));
  }
});

export const updateUserProfile = createAsyncThunk<
  User,
  { data: Partial<{ nickName: string; about: string; email?: string; password?: string }> },
  { rejectValue: ErrorMessageType }
>(
  'user/updateUserProfile',
  async ({ data }, { rejectWithValue }) => {
    try {
      const { data: response } = await configuredAxios.patch(`/users/me`, data);
      return response;
    } catch (error) {
      return rejectWithValue(HandleError(error));
    }
  },
);


export const updateUserAvatar = createAsyncThunk<
  User,
  { avatarFile: File },
  { rejectValue: ErrorMessageType }
>(
  'user/updateUserAvatar',
  async ({ avatarFile }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const { data: response } = await configuredAxios.patch(`/users/me/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      return rejectWithValue(HandleError(error));
    }
  },
);

