import { FC } from 'react';
import { Flex, Typography, Avatar, Image } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from 'shared/ui/Cards/ui/Cards.module.scss';
import { User } from 'entities/user';
import { Category } from 'entities/category';

const { Title, Text } = Typography;

type Card = {
  title?: string;
  path?: string;
  points?: number;
};

type CardsProps =
  | { type: 'users'; data: User[] }
  | { type: 'categories'; data: Category[] }
  | { type: 'topics'; data: Card[] };

export const Cards: FC<CardsProps> = ({ data, type }) => {
  const isCategories = type === 'categories';
  const isUsers = type === 'users';

  return (
    <Flex
      wrap="wrap"
      gap={20}
      vertical={!isCategories}
      className={isCategories ? styles.categoriesWrapper : undefined}
    >
      {data.map((item, index) => {
        // ===== USERS =====
        if (isUsers) {
          const user = item as User;
          return (
            <NavLink to={`/profile/${user.id}`} key={user.id} className={styles.card}>
              <Flex align="center" gap={20} justify={'space-between'}>
                <Flex align={'center'} gap={20}>
                  <Avatar src={user.avatar} size={48} />
                  <Text strong>{user.nickName}</Text>
                </Flex>
                <Text>{user.points}🔥</Text>
              </Flex>
            </NavLink>
          );
        }

        // ===== CATEGORIES =====
        if (isCategories) {
          const category = item as Category;

          return (
            <NavLink
              to={category.path}
              key={category.path}
              className={`${styles.card} ${styles.categoryCard}`}
            >
              <Flex align="center" justify="center" gap={20}>
                <Image preview={false} width={30} src={category.image}/>
                <Title level={4} style={{ margin: 0 }}>{category.title}</Title>
              </Flex>
            </NavLink>
          );
        }

        // ===== TOPICS =====
        const card = item as Card;
        return (
          <NavLink to={card.path || '#'} key={card.path || index} className={styles.card}>
            <Flex align="center" justify="space-between">
              <Title level={4} style={{ margin: 0 }}>{card.title}</Title>
              {card.points !== undefined && <Text strong>{card.points}🔥</Text>}
            </Flex>
          </NavLink>
        );
      })}
    </Flex>
  );
};
