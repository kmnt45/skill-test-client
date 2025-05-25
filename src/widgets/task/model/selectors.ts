import { RootState } from 'app/providers/store';

export const selectCurrentTask = (state: RootState) => state.task.currentTask.apiData;
export const selectCurrentTaskStatus = (state: RootState) => state.task.currentTask.apiStatus;
export const selectCurrentTaskError = (state: RootState) => state.task.currentTask.apiError;

export const selectSubmitResult = (state: RootState) => state.task.submitResult.apiData;
export const selectSubmitResultStatus = (state: RootState) => state.task.submitResult.apiStatus;
export const selectSubmitResultError = (state: RootState) => state.task.submitResult.apiError;
