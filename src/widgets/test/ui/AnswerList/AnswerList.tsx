import { FC } from 'react';

import { Button } from 'antd';
import cn from 'classnames';

import styles from './AnswerList.module.scss';

type AnswerListProps = {
  answers: string[];
  selected: number | null;
  checkResult: { correct: boolean } | null;
  onSelect: (index: number) => void;
};

export const AnswerList: FC<AnswerListProps> = ({ answers, selected, checkResult, onSelect }) => {
  return (
    <div className={styles.answers}>
      {answers.map((answer, index) => {
        const isCorrect = checkResult?.correct && selected === index;
        const isWrong = checkResult && selected === index && !checkResult.correct;

        return (
          <Button
            key={index}
            className={cn(styles.answer, {
              [styles.correct]: isCorrect,
              [styles.wrong]: isWrong,
              [styles.selected]: selected === index && !checkResult,
            })}
            onClick={() => onSelect(index)}
            disabled={selected !== null}
            size="large"
            block
          >
            {answer}
          </Button>
        );
      })}
    </div>
  );
};
