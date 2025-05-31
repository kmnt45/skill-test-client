import { useState, useEffect, useCallback } from 'react';

import { useAppMessage } from 'app/providers/message/AppMessageProvider';
import { getTestQuestion, checkTestAnswer, submitTest } from 'entities/content/model/asyncThunks';
import {
  selectCheckResult,
  selectCurrentQuestion,
  selectCurrentQuestionStatus, selectTestResult, selectTestResultStatus,
} from 'entities/content/model/selectors';
import { resetCheckResult, resetTestResult } from 'entities/content/model/slice';
import { useNavigate, useParams } from 'react-router-dom';
import { LOADING_STAGE } from 'shared/constants/loadingStage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';


export const useTest = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const messageApi = useAppMessage();
  const { categoryId, testId } = useParams<{ categoryId: string; testId: string }>();

  const question = useAppSelector(selectCurrentQuestion);
  const questionStatus = useAppSelector(selectCurrentQuestionStatus);
  const checkResult = useAppSelector(selectCheckResult);
  const testResult = useAppSelector(selectTestResult);
  const testStatus = useAppSelector(selectTestResultStatus);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const isLoading = questionStatus === LOADING_STAGE.LOADING;
  const isSubmitting = testStatus === LOADING_STAGE.LOADING;

  useEffect(() => {
    dispatch(resetTestResult());
  }, [dispatch, categoryId, testId]);

  useEffect(() => {
    if (!categoryId || !testId || testResult) return;

    dispatch(getTestQuestion({ categoryId, testId, index: currentIndex }));
    dispatch(resetCheckResult());
    setSelected(null);
  }, [categoryId, testId, currentIndex, dispatch, testResult]);

  useEffect(() => {
    if (testResult) {
      messageApi.success(
        `Вы завершили тест: ${testResult.correctAnswers} из ${testResult.totalQuestions}, получено ${testResult.pointsEarned} баллов`
      );
      navigate(`/tests/${categoryId}`);
    }
  }, [testResult, categoryId, messageApi, navigate]);

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
    isSubmitting,
  };
};
