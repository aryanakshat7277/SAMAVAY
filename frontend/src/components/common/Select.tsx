import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options?: { value: string | number; label: string }[];
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  helperText,
  error,
  options = [],
  children,
  required,
  className = '',
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full text-left">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-bold text-stone-800">
          {label} {required && <span className="text-rose-600 font-bold">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-xs">
        <select
          ref={ref}
          id={selectId}
          required={required}
          className={`w-full text-xs text-stone-900 bg-white border rounded-xl py-2.5 pl-3.5 pr-9 appearance-none transition-all duration-150 cursor-pointer outline-none ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/30'
              : 'border-stone-300 hover:border-stone-400 focus:border-gov-600 focus:ring-1 focus:ring-gov-600'
          } disabled:bg-stone-100 disabled:text-stone-500 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {children || options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-stone-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="text-[11px] text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-stone-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
