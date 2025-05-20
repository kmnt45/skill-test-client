import { createSlice } from '@reduxjs/toolkit';
import { getUser, updateUserAvatar, updateUserProfile, getMe, getUsers } from 'entities/user/model/asyncThunks';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { ApiStatusState, User} from 'shared/model/types';

interface UserState {
  me: ApiStatusState<User>
  user: ApiStatusState<User>;
  users: ApiStatusState<User[]>;
}

const initialState: UserState = {
  me: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
  user: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
  users: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.me.apiData = null;
      state.me.apiStatus = LOADING_STAGE.LOAD;
      state.me.apiError = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(updateUserAvatar.rejected, (state, { payload }) => {
        state.user.apiStatus = LOADING_STAGE.LOAD;
        state.user.apiError = payload || null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
