import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from 'pages/auth/model/asyncThunks';
import { AuthResponse } from 'pages/auth/model/types.ts';
import { LOADING_STAGE } from 'shared/constants';
import { ApiStatusState } from 'shared/models';

interface AuthState {
  auth: ApiStatusState<AuthResponse>;
}

const initialState: AuthState = {
  auth: {
    apiData: null,
    apiStatus: LOADING_STAGE.LOAD,
    apiError: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.auth.apiStatus = LOADING_STAGE.LOADING;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.auth.apiData = payload;
        state.auth.apiStatus = LOADING_STAGE.LOAD;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.auth.apiStatus = LOADING_STAGE.LOAD;
        state.auth.apiError = payload || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.auth.apiStatus = LOADING_STAGE.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.auth.apiData = payload;
        state.auth.apiStatus = LOADING_STAGE.LOAD;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.auth.apiStatus = LOADING_STAGE.LOAD;
        state.auth.apiError = payload || null;
      });
  },
});

export default authSlice.reducer;
