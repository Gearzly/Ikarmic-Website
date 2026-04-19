import React from 'react';
import { cn } from '@/lib/utils';

interface StackProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'col';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

const gapMap = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
  '2xl': 'gap-16',
};

const directionMap = {
  row: 'flex-row',
  col: 'flex-col',
};

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const Stack: React.FC<StackProps> = ({
  children,
  className,
  direction = 'col',
  gap = 'md',
  align = 'start',
  justify = 'start',
  wrap = false,
}) => (
  <div className={cn(
    'flex',
    directionMap[direction],
    gapMap[gap],
    alignMap[align],
    justifyMap[justify],
    wrap && 'flex-wrap',
    className
  )}>
    {children}
  </div>
);

type HStackProps = Omit<StackProps, 'direction'>;

export const HStack: React.FC<HStackProps> = (props) => (
  <Stack {...props} direction="row" />
);

type VStackProps = Omit<StackProps, 'direction'>;

export const VStack: React.FC<VStackProps> = (props) => (
  <Stack {...props} direction="col" />
);

export const FlexBetween: React.FC<Omit<StackProps, 'justify' | 'direction'>> = (props) => (
  <Stack {...props} direction="row" justify="between" />
);

export const FlexCenter: React.FC<Omit<StackProps, 'align' | 'justify' | 'direction'>> = (props) => (
  <Stack {...props} direction="row" align="center" justify="center" />
);
