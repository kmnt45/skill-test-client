import { FC, ReactNode, CSSProperties } from 'react';
import { Flex, Spin } from 'antd';

interface LoaderProps {
  size?: 'small' | 'default' | 'large';
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const Loader: FC<LoaderProps> = ({
  size = 'large',
  children,
  style,
  className,
}) => (
  <Flex align="center" justify="center" style={{ height: '100%', ...style }} className={className}>
    <Spin size={size} />
    {children && <div style={{ marginTop: 12 }}>{children}</div>}
  </Flex>
);
