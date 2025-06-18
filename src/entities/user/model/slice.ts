import { createSlice } from '@reduxjs/toolkit';
import {
  getMe,
  loginUser,
  registerUser,
  updateUserAvatar,
  updateUserProfile,
  getUser,
  getUsers, initAuth,
} from 'entities/user/model/asyncThunks';
import { User, AuthResponse } from 'entities/user/model/types';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { ApiStatusState } from 'shared/model/types';

interface UserState {
  me: ApiStatusState<User>;
  user: ApiStatusState<User>;
  users: ApiStatusState<User[]>;
  auth: ApiStatusState<AuthResponse>;
  isAuthChecked: boolean;
}

const initialState: UserState = {
  me: { apiData: null, apiStatus: LOADING_STAGE.LOAD, apiError: null },
  user: { apiData: null, apiStatus: LOADING_STAGE.LOAD, apiError: null },
  users: { apiData: null, apiStatus: LOADING_STAGE.LOAD, apiError: null },
  auth: { apiData: null, apiStatus: LOADING_STAGE.LOAD, apiError: null },
  isAuthChecked: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.me.apiData = null;
      state.auth.apiData = null;
      state.isAuthChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuth.fulfilled, (state, { payload }) => {
        state.me.apiData = payload;
        state.isAuthChecked = true;
      })
      .addCase(initAuth.rejected, (state) => {
        state.me.apiData = null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.auth.apiStatus = LOADING_STAGE.LOADING;
        state.auth.apiError = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.auth.apiData = payload;
        state.auth.apiStatus = LOADING_STAGE.LOAD;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.auth.apiStatus = LOADING_STAGE.LOAD;
        state.auth.apiError = payload || null;
        state.me.apiData = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.auth.apiStatus = LOADING_STAGE.LOADING;
        state.auth.apiError = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.auth.apiData = payload;
        state.auth.apiStatus = LOADING_STAGE.LOAD;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.auth.apiStatus = LOADING_STAGE.LOAD;
        state.auth.apiError = payload || null;
      })
      .addCase(getMe.pending, (state) => {
        state.me.apiStatus = LOADING_STAGE.LOADING;
        state.me.apiError = null;
      })
      .addCase(getMe.fulfilled, (state, { payload }) => {
        state.me.apiStatus = LOADING_STAGE.LOAD;
        state.me.apiData = payload;
      })
      .addCase(getMe.rejected, (state, { payload }) => {
        state.me.apiStatus = LOADING_STAGE.LOAD;
        state.me.apiError = payload || null;
      })
      .addCase(getUser.pending, (state) => {
        state.user.apiStatus = LOADING_STAGE.LOADING;
        state.user.apiError = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user.apiStatus = LOADING_STAGE.LOAD;
        state.user.apiData = payload;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.user.apiStatus = LOADING_STAGE.LOAD;
        state.user.apiError = payload || null;
      })
      .addCase(getUsers.pending, (state) => {
        state.users.apiStatus = LOADING_STAGE.LOADING;
        state.users.apiError = null;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users.apiStatus = LOADING_STAGE.LOAD;
        state.users.apiData = payload;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.users.apiStatus = LOADING_STAGE.LOAD;
        state.users.apiError = payload || null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.user.apiStatus = LOADING_STAGE.LOADING;
        state.user.apiError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.user.apiStatus = LOADING_STAGE.LOAD;
        state.user.apiData = payload;
        if (state.me.apiData?.id === payload.id) {
          state.me.apiData = payload; // обновляем и me, если обновился текущий пользователь
        }
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.user.apiStatus = LOADING_STAGE.LOAD;
        state.user.apiError = payload || null;
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.user.apiStatus = LOADING_STAGE.LOADING;
        state.user.apiError = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
        state.user.apiStatus = LOADING_STAGE.LOAD;
        state.user.apiData = {
          ...state.user.apiData,
          ...payload,
        };
        if (state.me.apiData?.id === payload.id) {
          state.me.apiData = { ...state.me.apiData, ...payload };
        }
      })
      .addCase(updateUserAvatar.rejected, (state, { payload }) => {
        state.user.apiStatus = LOADING_STAGE.LOAD;
        state.user.apiError = payload || null;
      });
  },
});

export const { logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
