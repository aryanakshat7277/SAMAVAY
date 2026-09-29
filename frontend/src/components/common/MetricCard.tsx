import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  subtext?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlightColor?: 'blue' | 'emerald' | 'purple' | 'amber' | 'saffron';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon: Icon,
  subtext,
  trend,
  highlightColor = 'emerald'
}) => {
  const colorMap = {
    blue: 'text-gov-800 bg-gov-50 border-gov-200',
    emerald: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    purple: 'text-gov-900 bg-gov-100 border-gov-300',
    amber: 'text-saffron-800 bg-saffron-50 border-saffron-200',
    saffron: 'text-saffron-800 bg-saffron-50 border-saffron-200',
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-card hover:border-gov-300 hover:shadow-card-hover transition-all duration-200 space-y-2 text-left">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
          {label}
        </span>
        {Icon && (
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-xs ${colorMap[highlightColor]}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-black text-stone-900 font-mono tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-bold inline-flex items-center gap-0.5 ${
              trend.isPositive ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {trend.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend.value}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-xs text-stone-600 font-medium">
          {subtext}
        </p>
      )}
    </div>
  );
};
