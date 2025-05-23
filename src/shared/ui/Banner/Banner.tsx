import { FC, ReactNode } from 'react';

import { Typography } from 'antd';

import styles from './Banner.module.scss';

const { Link, Title, Paragraph } = Typography;

type BannerProps = {
  title?: string;
  text?: string;
  link?: string;
  linkText?: string;
  linkIcon?: ReactNode;
};

export const Banner: FC<BannerProps> = ({
  title = 'Добро пожаловать на СкиллТест!',
  text = 'Проверь свои знания по программированию и улучшай навыки с помощью наших вопросов, тестов и задач.',
  link,
  linkText,
  linkIcon,
}) => {
  return (
    <div className={styles.banner} role="banner" aria-label="Информационный баннер">
      <div className={styles.container}>
        <Title level={2} className={styles.title}>
          {title}
        </Title>
        <Paragraph className={styles.text}>{text}</Paragraph>
      </div>
      {link && (
        <Link href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {linkIcon && <span className={styles.linkIcon}>{linkIcon}</span>}
          {linkText}
        </Link>
      )}
    </div>
  );
};
