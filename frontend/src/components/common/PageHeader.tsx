import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  link?: string;
}

export interface PageHeaderProps {
  category?: string;
  categoryIcon?: LucideIcon;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  category,
  categoryIcon: CategoryIcon,
  title,
  description,
  breadcrumbs,
  actions,
  badge
}) => {
  return (
    <div className="space-y-3 pb-2">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-1.5 text-xs text-stone-500 font-medium">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-stone-400" />}
              {b.link ? (
                <Link to={b.link} className="hover:text-gov-700 transition">
                  {b.label}
                </Link>
              ) : (
                <span className="text-stone-800 font-semibold">{b.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Main Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-3xl">
          {category && (
            <div className="flex items-center space-x-2 text-xs font-bold text-gov-800 uppercase tracking-wider">
              {CategoryIcon && <CategoryIcon className="w-3.5 h-3.5 text-gov-700" />}
              <span>{category}</span>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif tracking-tight">
              {title}
            </h1>
            {badge}
          </div>

          {description && (
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex items-center space-x-2.5 self-start sm:self-auto flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
