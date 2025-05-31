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

export interface TestQuestion {
  question: string;
  progress: {total: number; current: number};
  code: string | null;
  answers: string[];
}

export interface CheckAnswerResponse {
  correct: boolean;
}

export interface TestResult {
  correctAnswers: number;
  totalQuestions: number;
  pointsEarned: number;
}

export type Question = {
  slug: string;
  title: string;
};