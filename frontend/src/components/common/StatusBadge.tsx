import React from 'react';
import { RequestStatus } from '../../types';
import { CheckCircle, Clock, AlertCircle, RefreshCw, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: RequestStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true
}) => {
  const normStatus = (status || '').toUpperCase();

  let bg = 'bg-stone-100 text-stone-700 border-stone-200';
  let dot = 'bg-stone-400';
  let label = status;
  let Icon = Clock;

  switch (normStatus) {
    case 'SUBMITTED':
      bg = 'bg-saffron-50 text-saffron-800 border-saffron-200';
      dot = 'bg-saffron-500';
      label = 'Submitted';
      Icon = Clock;
      break;
    case 'UNDER_REVIEW':
      bg = 'bg-gov-50 text-gov-800 border-gov-200';
      dot = 'bg-gov-600';
      label = 'Under Review';
      Icon = RefreshCw;
      break;
    case 'PROCESSING':
      bg = 'bg-gov-100 text-gov-900 border-gov-300';
      dot = 'bg-gov-700';
      label = 'Processing';
      Icon = RefreshCw;
      break;
    case 'COMPLETED':
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      dot = 'bg-emerald-500';
      label = 'Completed';
      Icon = CheckCircle;
      break;
    case 'REJECTED':
      bg = 'bg-rose-50 text-rose-800 border-rose-200';
      dot = 'bg-rose-500';
      label = 'Action Required / Rejected';
      Icon = XCircle;
      break;
    case 'CONNECTED':
    case 'ACTIVE':
    case 'ONLINE':
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      dot = 'bg-emerald-500';
      label = 'Active & Connected';
      Icon = CheckCircle;
      break;
    case 'SYNCING':
      bg = 'bg-saffron-50 text-saffron-800 border-saffron-200';
      dot = 'bg-saffron-500';
      label = 'Syncing';
      Icon = RefreshCw;
      break;
    default:
      bg = 'bg-stone-100 text-stone-700 border-stone-200';
      dot = 'bg-stone-400';
      label = status;
      Icon = AlertCircle;
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-bold',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${bg} ${sizeClasses[size]}`}
    >
      {showIcon && <Icon className={`w-3.5 h-3.5 ${normStatus === 'PROCESSING' || normStatus === 'SYNCING' ? 'animate-spin' : ''}`} />}
      {!showIcon && <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>}
      <span>{label}</span>
    </span>
  );
};
