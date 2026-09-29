import React, { forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: LucideIcon;
  badge?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  icon: Icon,
  badge,
  required,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full text-left">
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={inputId} className="block text-xs font-bold text-stone-800">
            {label} {required && <span className="text-rose-600 font-bold">*</span>}
          </label>
          {badge && (
            <span className="text-[10px] font-bold text-gov-800 bg-gov-50 px-2 py-0.5 rounded border border-gov-200">
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          required={required}
          className={`w-full text-xs text-stone-900 bg-white border rounded-xl py-2.5 transition-all duration-150 outline-none ${
            Icon ? 'pl-9 pr-3.5' : 'px-3.5'
          } ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/30'
              : 'border-stone-300 hover:border-stone-400 focus:border-gov-600 focus:ring-1 focus:ring-gov-600'
          } disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-[11px] text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-stone-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
