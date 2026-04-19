import React from 'react';
import { cn } from '@/lib/utils';

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'surface';
  interactive?: boolean;
}

const variantMap = {
  default: 'glass',
  subtle: 'glass-subtle',
  surface: 'surface',
};

export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className,
  variant = 'default',
  interactive = false,
}) => (
  <div className={cn(
    variantMap[variant],
    'rounded-xl p-6',
    interactive && 'surface-hover cursor-pointer',
    className
  )}>
    {children}
  </div>
);

export const GlassCard: React.FC<GlassEffectProps> = ({
  children,
  className,
  variant = 'default',
  interactive = true,
}) => (
  <div className={cn(
    variantMap[variant],
    'rounded-xl p-8',
    interactive && 'surface-hover',
    className
  )}>
    {children}
  </div>
);
