import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  actions
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="w-4 h-4 text-gov-700" />}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
          {title}
        </h3>
        {badge}
      </div>

      <div className="flex items-center space-x-3">
        {subtitle && <span className="text-xs text-slate-500 font-medium">{subtitle}</span>}
        {actions}
      </div>
    </div>
  );
};
