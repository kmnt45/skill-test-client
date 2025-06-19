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
  | { type: 'users'; data: User[], noLinks?: boolean }
  | { type: 'categories'; data: Category[], noLinks?: boolean }
  | { type: 'topics'; data: Card[], noLinks?: boolean };

export const Cards: FC<CardsProps> = ({ data, type, noLinks }) => {
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
        if (isUsers) {
          const user = item as User;
          if (noLinks) {
            return (
              <div key={user.id} className={styles.card}>
                <Flex align="center" gap={20} justify={'space-between'}>
                  <Flex align={'center'} gap={20}>
                    <Avatar src={user?.avatar || undefined} size={48} alt={user?.nickName}>{user?.nickName[0]}</Avatar>
                    <Text strong>{user.nickName}</Text>
                  </Flex>
                  <Text>{user.points}🔥</Text>
                </Flex>
              </div>
            );
          }
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

        if (isCategories) {
          const category = item as Category;
          if (noLinks) {
            return (
              <div key={category.path} className={`${styles.card} ${styles.categoryCard}`}>
                <Flex align="center" justify="center" gap={20}>
                  <Image preview={false} width={30} src={category.image} />
                  <Title level={4} style={{ margin: 0 }}>{category.title}</Title>
                </Flex>
              </div>
            );
          }
          return (
            <NavLink
              to={category.path}
              key={category.path}
              className={`${styles.card} ${styles.categoryCard}`}
            >
              <Flex align="center" justify="center" gap={20}>
                <Image preview={false} width={30} src={category.image} />
                <Title level={4} style={{ margin: 0 }}>{category.title}</Title>
              </Flex>
            </NavLink>
          );
        }

        const card = item as Card;
        if (noLinks) {
          return (
            <div key={card.path || index} className={styles.card}>
              <Flex align="center" justify="space-between">
                <Title level={4} style={{ margin: 0 }}>{card.title}</Title>
                {card.points !== undefined && <Text strong>{card.points}🔥</Text>}
              </Flex>
            </div>
          );
        }
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
