import { FC } from 'react';

import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { CATEGORY_LABELS } from 'shared/constants';

import styles from './CategoriesCards.module.scss';

const { Title } = Typography;

type CategoriesCardsParams = {
  data: string[];
};

export const CategoriesCards: FC<CategoriesCardsParams> = ({ data }) => {
  return (
    <div className={styles.cards}>
      {data.map((stack, index) => {
        const label = CATEGORY_LABELS[stack] || stack;

        return (
          <NavLink to={stack} key={index} className={styles.card}>
            <div className={styles.container}>
              {label && <Title level={4}>{label}</Title>}
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
