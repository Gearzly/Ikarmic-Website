import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeMap = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'w-full',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
}) => (
  <div className={cn(
    'w-full mx-auto px-6 lg:px-12',
    sizeMap[size],
    className
  )}>
    {children}
  </div>
);

interface SectionContainerProps extends ContainerProps {
  py?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const pyMap = {
  xs: 'py-8 lg:py-12',
  sm: 'py-12 lg:py-16',
  md: 'py-16 lg:py-24',
  lg: 'py-24 lg:py-32',
  xl: 'py-32 lg:py-40',
  '2xl': 'py-40 lg:py-48',
  '3xl': 'py-48 lg:py-56',
};

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className,
  size = 'lg',
  py = 'md',
}) => (
  <section className={cn(pyMap[py], className)}>
    <Container size={size}>
      {children}
    </Container>
  </section>
);
