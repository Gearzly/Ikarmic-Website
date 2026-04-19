import React from 'react';
import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: HeadingLevel | 'p' | 'span' | 'div';
}

export const TypographyH1: React.FC<TypographyProps> = ({ children, className, as: Component = 'h1' }) => (
  <Component className={cn('h1', className)}>
    {children}
  </Component>
);

export const TypographyH2: React.FC<TypographyProps> = ({ children, className, as: Component = 'h2' }) => (
  <Component className={cn('h2', className)}>
    {children}
  </Component>
);

export const TypographyH3: React.FC<TypographyProps> = ({ children, className, as: Component = 'h3' }) => (
  <Component className={cn('h3', className)}>
    {children}
  </Component>
);

export const TypographyH4: React.FC<TypographyProps> = ({ children, className, as: Component = 'h4' }) => (
  <Component className={cn('h4', className)}>
    {children}
  </Component>
);

export const TypographyH5: React.FC<TypographyProps> = ({ children, className, as: Component = 'h5' }) => (
  <Component className={cn('h5', className)}>
    {children}
  </Component>
);

export const TypographyH6: React.FC<TypographyProps> = ({ children, className, as: Component = 'h6' }) => (
  <Component className={cn('h6', className)}>
    {children}
  </Component>
);

interface BodyTypographyProps extends Omit<TypographyProps, 'as'> {
  as?: 'p' | 'div' | 'span' | 'code';
}

export const TypographyLarge: React.FC<BodyTypographyProps> = ({ children, className, as: Component = 'p' }) => (
  <Component className={cn('text-body-lg', className)}>
    {children}
  </Component>
);

export const TypographyP: React.FC<BodyTypographyProps> = ({ children, className, as: Component = 'p' }) => (
  <Component className={cn('text-body', className)}>
    {children}
  </Component>
);

export const TypographySmall: React.FC<BodyTypographyProps> = ({ children, className, as: Component = 'p' }) => (
  <Component className={cn('text-body-sm', className)}>
    {children}
  </Component>
);

export const TypographyMuted: React.FC<BodyTypographyProps> = ({ children, className, as: Component = 'p' }) => (
  <Component className={cn('text-body-sm text-muted-foreground', className)}>
    {children}
  </Component>
);

export const TypographyLabel: React.FC<BodyTypographyProps> = ({ children, className, as: Component = 'span' }) => (
  <Component className={cn('text-label', className)}>
    {children}
  </Component>
);

export const TypographyMicro: React.FC<BodyTypographyProps> = ({ children, className, as: Component = 'span' }) => (
  <Component className={cn('text-micro', className)}>
    {children}
  </Component>
);

export const TypographyCode: React.FC<Omit<BodyTypographyProps, 'as'>> = ({ children, className }) => (
  <code className={cn('text-code px-2 py-1 bg-muted rounded', className)}>
    {children}
  </code>
);

export const TypographyBlockquote: React.FC<BodyTypographyProps> = ({ children, className, as: Component = 'blockquote' }) => {
  const Comp = Component as React.ElementType;
  return (
    <Comp className={cn('pl-4 border-l-2 border-primary italic text-muted-foreground', className)}>
      {children}
    </Comp>
  );
};

export const TypographyInlineCode: React.FC<Omit<BodyTypographyProps, 'as'>> = ({ children, className }) => (
  <code className={cn('text-code bg-muted/50 rounded px-1.5 py-0.5', className)}>
    {children}
  </code>
);
