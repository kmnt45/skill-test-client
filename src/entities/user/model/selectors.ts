import { RootState } from 'app/providers/store';

export const selectUsers = (state: RootState) => state.user.users;

export const selectUser = (state: RootState) => state.user.user;