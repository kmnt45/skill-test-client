import { FC } from 'react'

import { Flex, Typography } from 'antd';

import styles from 'shared/ui/EmptyPlaceholder/ui/EmptyPlaceholder.module.scss'

type EmptyPlaceholderProps = {
  title?: string
  description?: string
}

export const EmptyPlaceholder: FC<EmptyPlaceholderProps> = ({
  title = 'Здесь пока ничего нет.',
  description = '',
}) => {
  return (
    <Flex flex={1} vertical align={'center'} justify={'center'} className={styles.emptyPlaceholder}>
      <Typography.Title level={3}>{title}</Typography.Title>
      <Typography.Text>{description}</Typography.Text>
    </Flex>
  )
}
