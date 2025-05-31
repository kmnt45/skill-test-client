import { FC } from 'react';

import { Flex, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { CATEGORY_LABELS } from 'shared/constants/categoryLabels';

import styles from 'shared/ui/Cards/ui/Cards.module.scss';

const { Title, Text } = Typography;

type Card = {
  title?: string;
  slug?: string;
  points?: number;
};

type CardsProps =
  | { type: 'categories'; data: string[] }
  | { type: 'topics'; data: Card[] };

export const Cards: FC<CardsProps> = ({ data, type }) => {
  const isCategories = type === 'categories';

  return (
    <Flex wrap="wrap" gap={20} vertical={!isCategories}>
      {data.map((item, index) => {
        const to = isCategories ? item : (item as Card).slug || '#';
        const title = isCategories
          ? CATEGORY_LABELS[item as string] || item
          : (item as Card).title;
        const points = !isCategories && (item as Card).points;

        return (
          <NavLink to={to} key={index} className={styles.card}>
            <Flex
              align="center"
              justify={isCategories ? 'center' : 'space-between'}
            >
              <Title level={4} style={{ margin: 0 }}>{title}</Title>
              {points && <Text strong>{points}🔥</Text>}
            </Flex>
          </NavLink>
        );
      })}
    </Flex>
  );
};
