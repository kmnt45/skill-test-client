import { FC } from 'react';

import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from './TopicsCards.module.scss';

const { Title, Text } = Typography;

export type TopicCard = {
  title?: string;
  description?: string;
  path?: string;
};

type TopicsCardsParams = {
  data: TopicCard[];
};

export const TopicsCards: FC<TopicsCardsParams> = ({ data }) => {
  return (
    <div className={styles.cards}>
      {data.map(({ title, description, path }) => (
        <NavLink to={path || '#'} key={title} className={styles.card}>
          {title && <Title level={4} style={{ marginBottom: 0, marginTop: 0 }}>{title}</Title>}
          {description && <Text>{description}</Text>}
        </NavLink>
      ))}
    </div>
  );
};
