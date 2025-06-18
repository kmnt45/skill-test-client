import { RootState } from 'app/store';

// === Task ===
export const selectCurrentTask = (state: RootState) => state.content.currentTask.apiData;
export const selectCurrentTaskStatus = (state: RootState) => state.content.currentTask.apiStatus;
export const selectCurrentTaskError = (state: RootState) => state.content.currentTask.apiError;

// === Submit Solution ===
export const selectSubmitResult = (state: RootState) => state.content.submitResult.apiData;
export const selectSubmitResultStatus = (state: RootState) => state.content.submitResult.apiStatus;
export const selectSubmitResultError = (state: RootState) => state.content.submitResult.apiError;

// === Test Question ===
export const selectCurrentQuestion = (state: RootState) => state.content.currentQuestion.apiData;
export const selectCurrentQuestionStatus = (state: RootState) => state.content.currentQuestion.apiStatus;
export const selectCurrentQuestionError = (state: RootState) => state.content.currentQuestion.apiError;
// === Check Test Answer ===
export const selectCheckResult = (state: RootState) => state.content.checkResult.apiData;
export const selectCheckResultStatus = (state: RootState) => state.content.checkResult.apiStatus;
export const selectCheckResultError = (state: RootState) => state.content.checkResult.apiError;

// === Submit Test ===
export const selectTestResult = (state: RootState) => state.content.testResult.apiData;
export const selectTestResultStatus = (state: RootState) => state.content.testResult.apiStatus;
export const selectTestResultError = (state: RootState) => state.content.testResult.apiError;

// === Questions List ===
export const selectQuestionsList = (state: RootState) => state.content.questionsList.apiData;
export const selectQuestionsListStatus = (state: RootState) => state.content.questionsList.apiStatus;
export const selectQuestionsListError = (state: RootState) => state.content.questionsList.apiError;

export const selectAnswers = (state: RootState) => state.content.answers;

// Селектор с параметром — для получения apiData по slug
export const selectAnswerBySlug = (slug: string) => (state: RootState) =>
  state.content.answers[slug]?.apiData ?? null;

// Для статуса по slug
export const selectAnswerStatusBySlug = (slug: string) => (state: RootState) =>
  state.content.answers[slug]?.apiStatus ?? null;

// Для ошибки по slug
export const selectAnswerErrorBySlug = (slug: string) => (state: RootState) =>
  state.content.answers[slug]?.apiError ?? null;
