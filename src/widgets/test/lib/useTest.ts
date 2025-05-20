import { useState, useEffect, useCallback } from 'react';

import { useParams } from 'react-router-dom';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';

import { getTestQuestion, checkTestAnswer, submitTest } from '../model/asyncThunks';
import { resetCheckResult } from '../model/slice';

export const useTest = () => {
  const dispatch = useAppDispatch();
  const { categoryId, testId } = useParams<{ categoryId: string; testId: string }>();

  const { apiData: question, apiStatus: questionStatus } = useAppSelector(state => state.test.currentQuestion);
  const checkResult = useAppSelector(state => state.test.checkResult.apiData);
  const { apiData: testResult, apiStatus: testStatus } = useAppSelector(state => state.test.testResult);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const isLoading = questionStatus === LOADING_STAGE.LOADING;
  const isSubmitting = testStatus === LOADING_STAGE.LOADING;

  useEffect(() => {
    if (!categoryId || !testId || testResult) return;

    dispatch(getTestQuestion({ categoryId, testId, index: currentIndex }));
    dispatch(resetCheckResult());
    setSelected(null);
  }, [categoryId, testId, currentIndex, dispatch, testResult]);

  const handleSelect = useCallback((index: number) => {
    if (selected !== null || !categoryId || !testId) return;

    setSelected(index);

    dispatch(checkTestAnswer({ categoryId, testId, index: currentIndex, answerIndex: index }));

    setUserAnswers(prev => {
      const copy = [...prev];
      copy[currentIndex] = index;
      return copy;
    });
  }, [categoryId, testId, currentIndex, dispatch, selected]);

  const handleNext = useCallback(() => {
    if (!question || !categoryId || !testId) return;

    const isLastQuestion = currentIndex + 1 >= question.progress.total;

    if (!isLastQuestion) {
      setCurrentIndex(prev => prev + 1);
    } else {
      dispatch(submitTest({ categoryId, testId, answers: userAnswers }));
    }
  }, [question, currentIndex, userAnswers, categoryId, testId, dispatch]);

  return {
    question,
    isLoading,
    checkResult,
    selected,
    handleSelect,
    handleNext,
    testResult,
    isSubmitting,
  };
};
