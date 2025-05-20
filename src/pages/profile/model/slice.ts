import { createSlice } from '@reduxjs/toolkit';
import { getUser, updateUserAvatar, updateUserProfile } from 'pages/profile/model/asyncThunks';
import { LOADING_STAGE } from 'shared/constants';
import { ApiStatusState, User } from 'shared/models';

interface UserState {
  user: ApiStatusState<User | null>;
  updateProfileStatus: LOADING_STAGE;
  updateAvatarStatus: LOADING_STAGE;
  updateProfileError: string | null;
  updateAvatarError: string | null;
}

const initialState: UserState = {
  user: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
  updateProfileStatus: LOADING_STAGE.LOAD,
  updateAvatarStatus: LOADING_STAGE.LOAD,
  updateProfileError: null,
  updateAvatarError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user.apiData = null;
      state.user.apiStatus = LOADING_STAGE.LOAD;
      state.user.apiError = null;

      state.updateProfileStatus = LOADING_STAGE.LOAD;
      state.updateAvatarStatus = LOADING_STAGE.LOAD;

      state.updateProfileError = null;
      state.updateAvatarError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getUser
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

      // updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.updateProfileStatus = LOADING_STAGE.LOADING;
        state.updateProfileError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.updateProfileStatus = LOADING_STAGE.LOAD;
        state.user.apiData = payload;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.updateProfileStatus = LOADING_STAGE.LOAD;
        state.updateProfileError = payload || 'Ошибка обновления профиля';
      })

      // updateUserAvatar
      .addCase(updateUserAvatar.pending, (state) => {
        state.updateAvatarStatus = LOADING_STAGE.LOADING;
        state.updateAvatarError = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
        state.updateAvatarStatus = LOADING_STAGE.LOAD;
        state.user.apiData = payload;
      })
      .addCase(updateUserAvatar.rejected, (state, { payload }) => {
        state.updateAvatarStatus = LOADING_STAGE.LOAD;
        state.updateAvatarError = payload || 'Ошибка обновления аватара';
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

