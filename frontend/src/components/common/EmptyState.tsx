import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionIcon?: LucideIcon;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionText,
  onAction,
  actionIcon
}) => {
  return (
    <div className="p-8 sm:p-12 text-center bg-white border border-dashed border-stone-300 rounded-3xl space-y-4 max-w-lg mx-auto shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-sandstone-100 border border-stone-200 text-stone-500 flex items-center justify-center mx-auto shadow-xs">
        <Icon className="w-7 h-7 text-gov-700" />
      </div>

      <div className="space-y-1.5">
        <h4 className="text-base font-bold text-stone-900 font-serif">
          {title}
        </h4>
        <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {actionText && onAction && (
        <div className="pt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onAction}
            icon={actionIcon}
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};
