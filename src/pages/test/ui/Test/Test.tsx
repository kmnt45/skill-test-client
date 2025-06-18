import { FC } from 'react';

import { Button, Flex, Spin } from 'antd';
import { useTest } from 'pages/test/lib/useTest';
import { AnswerList } from 'pages/test/ui/AnswerList/AnswerList';
import { Header, Markdown } from 'shared/ui';

export const Test: FC = () => {
  const {
    question,
    isLoading,
    checkResult,
    selected,
    handleSelect,
    handleNext,
  } = useTest();

  return (
    <Flex flex={1}>
      {isLoading ? (
        <Flex align="center" justify="center" flex={1}>
          <Spin size="large" />
        </Flex>
      ) : question && (
        <Flex vertical flex={1} gap={20} justify={'space-between'}>
          <Flex vertical gap={20} justify={'space-between'}>
            <Header>{question.title}</Header>
            <Markdown content={question.question} />
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
  );
};
