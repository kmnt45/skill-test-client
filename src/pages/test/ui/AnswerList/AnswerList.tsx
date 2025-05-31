import { FC } from 'react';

import { Button } from 'antd';
import styles from 'pages/test/ui/AnswerList/AnswerList.module.scss';

type AnswerListProps = {
  answers: string[];
  selected: number | null;
  checkResult: { correct: boolean } | null;
  onSelect: (index: number) => void;
};

export const AnswerList: FC<AnswerListProps> = ({ answers, selected, onSelect }) => {
  return (
    <div className={styles.answers}>
      {answers.map((answer, index) => {
        return (
          <Button
            key={index}
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
