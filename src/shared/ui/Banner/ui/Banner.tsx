import { FC, ReactNode } from 'react';

import { Typography } from 'antd';

import styles from 'shared/ui/Banner/ui/Banner.module.scss';

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
    <div className={styles.banner} role="banner">
      <div className={styles.container}>
        <Title level={2} className={styles.title}>
          {title}
        </Title>
        <Paragraph className={styles.paragraph} style={{ whiteSpace: 'pre-line' }}>{text}</Paragraph>
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
