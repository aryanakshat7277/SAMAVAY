import React from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-xs px-4 py-2.5 gap-2',
    lg: 'text-sm px-6 py-3 gap-2.5 rounded-2xl',
  };

  const variantStyles = {
    primary: 'bg-gov-700 hover:bg-gov-800 text-white shadow-gov hover:shadow-gov-lg active:scale-[0.99] border border-gov-800 focus-visible:ring-gov-600',
    secondary: 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 focus-visible:ring-stone-400',
    outline: 'bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 hover:border-gov-400 shadow-xs focus-visible:ring-gov-600',
    ghost: 'bg-transparent hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-transparent focus-visible:ring-stone-400',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-rose-700 focus-visible:ring-rose-500',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border border-emerald-700 focus-visible:ring-emerald-500',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 text-current flex-shrink-0" />
      )}
      <span>{children}</span>
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 text-current flex-shrink-0" />
      )}
    </button>
  );
};
