import { FC } from 'react';

import { Flex, Typography } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from './TopicsCards.module.scss';

const { Title, Text } = Typography;

export type TopicCard = {
  title?: string;
  points?: number;
  slug?: string;
};

type TopicsCardsParams = {
  data: TopicCard[];
};

export const TopicsCards: FC<TopicsCardsParams> = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.cards}>
      {data.map(({ title, points, slug }) => (
        <NavLink to={slug || '#'} key={title} className={styles.card}>
          <Flex align={'center'} justify={'space-between'}>
            {title && <Title level={4} style={{ margin: 0 }}>{title}</Title>}
            {points && <Text strong>{points}🔥</Text>}
          </Flex>
        </NavLink>
      ))}
    </div>
  );
};
