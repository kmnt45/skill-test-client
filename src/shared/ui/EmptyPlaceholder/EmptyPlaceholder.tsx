import { FC } from 'react'

import { Typography } from 'antd';

import styles from './EmptyPlaceholder.module.scss'

type EmptyPlaceholderProps = {
  title?: string
  description?: string
}

export const EmptyPlaceholder: FC<EmptyPlaceholderProps> = ({
  title = 'Здесь пока ничего нет.',
  description = '',
}) => {
  return (
    <div className={styles.emptyPlaceholder}>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Typography.Text>{description}</Typography.Text>
    </div>
  )
}
