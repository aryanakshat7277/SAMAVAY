import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'subtle' | 'highlight';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  padding = 'md',
  variant = 'default',
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const variantStyles = {
    default: 'bg-white border border-stone-200/90 shadow-card',
    elevated: 'bg-white border border-stone-200 shadow-card-hover',
    subtle: 'bg-sandstone-100 border border-stone-200 shadow-xs',
    highlight: 'bg-gov-50/70 border border-gov-200 shadow-xs',
  };

  return (
    <div
      className={`rounded-2xl transition-all duration-200 ${paddingStyles[padding]} ${variantStyles[variant]} ${
        hoverEffect ? 'hover:border-gov-400 hover:shadow-card-hover hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
