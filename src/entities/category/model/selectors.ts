import { RootState } from 'app/store';

// === Categories ===
export const selectCategories = (state: RootState) => state.category.categories.apiData;
export const selectCategoriesStatus = (state: RootState) => state.category.categories.apiStatus;
export const selectCategoriesError = (state: RootState) => state.category.categories.apiError;

// === Topics ===
export const selectTopics = (state: RootState) => state.category.topics.apiData;
export const selectTopicsStatus = (state: RootState) => state.category.topics.apiStatus;
export const selectTopicsError = (state: RootState) => state.category.topics.apiError;
