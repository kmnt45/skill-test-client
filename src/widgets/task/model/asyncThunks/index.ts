import { createAsyncThunk } from '@reduxjs/toolkit';
import { appAxios } from 'shared/api/appAxios';
import { handleError } from 'shared/lib/handleError';
import { ErrorMessageType } from 'shared/model/types';

export interface Task {
  slug: string;
  title: string;
  points?: number;
  statement?: string;
  testCases?: { input: string; expectedOutput: string | number }[];
}

export interface SubmitSolutionPayload {
  categoryId: string;
  taskId: string;
  solution: string;
  language: 'javascript' | 'python' | 'cpp';
}

export interface SubmitSolutionResponse {
  success: boolean;
  message: string;
  pointsEarned?: number;
}

export const getTask = createAsyncThunk<
  Task,
  { categoryId: string; taskId: string },
  { rejectValue: ErrorMessageType }
>(
  'task/getTask',
  async ({ categoryId, taskId }, { rejectWithValue }) => {
    try {
      const { data } = await appAxios.get(`/${categoryId}/tasks/${taskId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const submitSolution = createAsyncThunk<
  SubmitSolutionResponse,
  SubmitSolutionPayload,
  { rejectValue: ErrorMessageType }
>(
  'task/submitSolution',
  async ({ categoryId, taskId, solution, language }, { rejectWithValue }) => {
    try {
      const { data } = await appAxios.post(
        `/${categoryId}/tasks/${taskId}/submit`,
        {
          solution,
          language,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);
