import { RootState } from 'app/store';

export const selectUsers = (state: RootState) => state.user.users.apiData;
export const selectUsersData = (state: RootState) => state.user.users.apiData;
export const selectUsersStatus = (state: RootState) => state.user.users.apiStatus;
export const selectUsersError = (state: RootState) => state.user.users.apiError;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserData = (state: RootState) => state.user.user.apiData;
export const selectUserStatus = (state: RootState) => state.user.user.apiStatus;
export const selectUserError = (state: RootState) => state.user.user.apiError;

export const selectMe = (state: RootState) => state.user.me;
export const selectMeData = (state: RootState) => state.user.me.apiData;
export const selectMeStatus = (state: RootState) => state.user.me.apiStatus;
export const selectMeError = (state: RootState) => state.user.me.apiError;

export const selectAuth = (state: RootState) => state.user.auth;
export const selectAuthData = (state: RootState) => state.user.auth.apiData;
export const selectAuthStatus = (state: RootState) => state.user.auth.apiStatus;
export const selectAuthError = (state: RootState) => state.user.auth.apiError;

export const selectIsAuthChecked = (state: RootState) => state.user.isAuthChecked;

export const selectIsLoggedIn = (state: RootState) => Boolean(state.user.me.apiData);
