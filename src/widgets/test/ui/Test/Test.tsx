import { FC } from 'react';

import { Typography, Spin, Button, Flex } from 'antd';
import { Header } from 'shared/ui';

import styles from './Test.module.scss';
import { useTest } from '../../lib/useTest';
import { AnswerList } from '../AnswerList/AnswerList';

export const Test: FC = () => {
  const {
    question,
    isLoading,
    checkResult,
    selected,
    handleSelect,
    handleNext,
    testResult,
  } = useTest();

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

  return (
    <>
      <Flex flex={1}>
        {isLoading ? (
          <Flex align={'center'} justify={'center'} flex={1}>
            <Spin size="large" />
          </Flex>) : question && (
          <Flex vertical flex={1} gap={20}>
            <Flex vertical flex={1} gap={20}>
              <Header>{question.question}</Header>
              <AnswerList
                answers={question.answers}
                selected={selected}
                checkResult={checkResult}
                onSelect={handleSelect}
              />
            </Flex>
            <Button
              disabled={selected === null || !checkResult}
              onClick={handleNext}
              type="primary"
            >
              {question.progress.current === question.progress.total ? 'Завершить тест' : 'Продолжить'}
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};
