import { createSlice } from '@reduxjs/toolkit';
import { LOADING_STAGE } from 'shared/constants';
import { ApiStatusState, User } from 'shared/models';

import { getUsers } from './asyncThunks';

interface RatingState {
  users: ApiStatusState<User[]>;
}

const initialState: RatingState = {
  users: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
};

const ratingReducer = createSlice({
  name: 'rating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, { payload }) => {
        state.users.apiStatus = LOADING_STAGE.LOADING;
        state.users.apiError = payload || null;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users.apiStatus = LOADING_STAGE.LOAD;
        state.users.apiData = payload;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.users.apiStatus = LOADING_STAGE.LOAD;
        state.users.apiError = payload || null;
      });
  },
});

export default ratingReducer.reducer;
