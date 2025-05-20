import { FC } from 'react';

import { Typography } from 'antd';

import styles from './Question.module.scss';

type QuestionProps = {
  question: string;
  code: string | null;
};

export const Question: FC<QuestionProps> = ({ question, code }) => {
  return (
    <div className={styles.question}>
      <Typography.Title level={4}>{question}</Typography.Title>
      {code && (
        <pre className={styles.code}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};
