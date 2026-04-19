import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: '1' | '2' | '3' | '4' | '6';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  responsive?: boolean;
}

const gapMap = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
  '2xl': 'gap-16',
};

export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = '3',
  gap = 'md',
  responsive = true,
}) => {
  const responsiveClasses = responsive ? {
    '1': 'grid-cols-1 sm:grid-cols-1 lg:grid-cols-1',
    '2': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    '6': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  } : {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4',
    '6': 'grid-cols-6',
  };

  return (
    <div className={cn(
      'grid',
      responsiveClasses[cols],
      gapMap[gap],
      className
    )}>
      {children}
    </div>
  );
};
