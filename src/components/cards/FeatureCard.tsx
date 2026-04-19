import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/effects/GlassEffect';

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  interactive?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
  interactive = true,
}) => (
  <GlassCard interactive={interactive} className={className}>
    {icon && (
      <div className="mb-4 text-primary">
        {icon}
      </div>
    )}
    <h3 className="h5 mb-2 text-white">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </GlassCard>
);

interface StatCardProps {
  value: string | number;
  label: string;
  subtitle?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  subtitle,
  className,
}) => (
  <div className={cn('text-center', className)}>
    <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
      {value}
    </div>
    <p className="text-white font-medium">{label}</p>
    {subtitle && (
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    )}
  </div>
);

interface CaseStudyCardProps {
  title: string;
  description: string;
  category: string;
  image?: string;
  link?: string;
  className?: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
  category,
  image,
  link,
  className,
}) => (
  <GlassCard
    interactive
    className={cn('group', className)}
  >
    {image && (
      <div className="mb-4 rounded-lg overflow-hidden h-40 bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    )}
    <span className="text-micro text-primary">{category}</span>
    <h3 className="h5 mt-2 mb-3 text-white group-hover:text-primary transition-colors">
      {title}
    </h3>
    <p className="text-muted-foreground mb-4">{description}</p>
    {link && (
      <a
        href={link}
        className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-sm"
      >
        Read case study →
      </a>
    )}
  </GlassCard>
);
