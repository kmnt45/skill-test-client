import { FC } from 'react';

import { Typography, Spin, Button, Alert, Progress } from 'antd';

import styles from './Test.module.scss';
import { useTest } from '../../lib/useTest.ts';
import { AnswerList } from '../AnswerList/AnswerList.tsx';
import { Question } from '../Question/Question.tsx';

export const Test: FC = () => {
  const {
    question,
    isLoading,
    checkResult,
    selected,
    handleSelect,
    handleNext,
    testResult,
    isSubmitting,
  } = useTest();

  if (isSubmitting) {
    return <Spin tip="Отправка результатов..." />;
  }

  if (testResult) {
    return (
      <div className={styles.result}>
        <Typography.Title level={3}>Результаты теста</Typography.Title>
        <Typography.Paragraph>
          Правильных ответов: {testResult.correctAnswers} из {testResult.totalQuestions}
        </Typography.Paragraph>
        <Typography.Paragraph>Начислено очков: {testResult.pointsEarned}</Typography.Paragraph>
      </div>
    );
  }

  if (!question && !isLoading) {
    return <Alert type="warning" message="Вопросы не найдены" />;
  }

  const total = question?.progress.total || 0;
  const current = (question?.progress.current ?? 0) + 1;

  return (
    <>
      <div className={styles.header}>
        <Typography.Title level={4}>Вопрос {current} из {total}</Typography.Title>
        <Progress
          percent={total ? (current / total) * 100 : 0}
          showInfo={false}
          strokeColor="#1890ff"
          style={{ width: 150 }}
        />
      </div>

      {isLoading && <Spin className={styles.loader} />}
      {!isLoading && question && (
        <div className={styles.container}>
          <Question question={question.question} code={question.code} />

          <AnswerList
            answers={question.answers}
            selected={selected}
            checkResult={checkResult}
            onSelect={handleSelect}
          />

          <div className={styles.buttons}>
            <Button
              disabled={selected === null || !checkResult}
              onClick={handleNext}
              size="large"
              type="primary"
            >
              {current === total ? 'Завершить тест' : 'Продолжить'}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
