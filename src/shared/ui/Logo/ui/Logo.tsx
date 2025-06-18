import { FC } from 'react';
import logoPath from 'shared/assets/logo.svg';

type LogoProps = {
  size?: 'small' | 'medium' | 'large';
};

const sizeMap = {
  small: 24,
  medium: 40,
  large: 64,
} as const;

export const Logo: FC<LogoProps> = ({ size = 'small' }) => {
  const dimension = sizeMap[size];

  return (
    <img
      src={logoPath}
      alt="SkillTest logo"
      width={dimension}
      height={dimension}
      style={{ display: 'block' }}
    />
  );
};