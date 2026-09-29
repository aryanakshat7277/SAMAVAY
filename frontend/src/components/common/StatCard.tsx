import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorScheme?: 'blue' | 'emerald' | 'amber' | 'indigo';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorScheme = 'blue',
  onClick
}) => {
  const schemeStyles = {
    blue: {
      bg: 'bg-blue-50 text-blue-700',
      border: 'border-slate-200 hover:border-blue-300',
    },
    emerald: {
      bg: 'bg-emerald-50 text-emerald-700',
      border: 'border-slate-200 hover:border-emerald-300',
    },
    amber: {
      bg: 'bg-amber-50 text-amber-700',
      border: 'border-slate-200 hover:border-amber-300',
    },
    indigo: {
      bg: 'bg-indigo-50 text-indigo-700',
      border: 'border-slate-200 hover:border-indigo-300',
    }
  };

  const style = schemeStyles[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border p-5 transition shadow-subtle ${style.border} ${
        onClick ? 'cursor-pointer hover:shadow-gov' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${style.bg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
