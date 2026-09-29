import React from 'react';
import { Link } from 'react-router-dom';
import { GovernmentService } from '../../types';
import {
  Clock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Car,
  Landmark,
  HeartPulse,
  GraduationCap,
  HandHeart,
  Sprout,
  ShoppingBag,
  HardHat,
  Coins,
  Baby,
  Zap
} from 'lucide-react';

interface ServiceCardProps {
  service: GovernmentService;
  onApply?: (service: GovernmentService) => void;
}

export const getDepartmentIcon = (category: string) => {
  switch (category.toUpperCase()) {
    case 'MUNICIPAL':
      return Building2;
    case 'TRANSPORT':
      return Car;
    case 'REVENUE':
      return Landmark;
    case 'HEALTH':
      return HeartPulse;
    case 'EDUCATION':
      return GraduationCap;
    case 'WELFARE':
      return HandHeart;
    case 'AGRICULTURE':
      return Sprout;
    case 'FOOD_SUPPLIES':
      return ShoppingBag;
    case 'LABOUR':
      return HardHat;
    case 'FINANCE':
      return Coins;
    case 'WOMEN_CHILD':
      return Baby;
    case 'POWER':
      return Zap;
    default:
      return Building2;
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onApply }) => {
  const DeptIcon = getDepartmentIcon(service.category);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-gov-600 hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between overflow-hidden group shadow-xs">
      <div className="p-5 space-y-3">
        {/* Department tag & popular badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-gov-800 bg-gov-50 border border-gov-200 px-3 py-1 rounded-full">
            <DeptIcon className="w-3.5 h-3.5 text-gov-700" />
            <span className="truncate max-w-[170px]">{service.departmentName}</span>
          </div>

          {service.isPopular && (
            <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              Verified DPI
            </span>
          )}
        </div>

        {/* Service Title */}
        <Link
          to={`/services/${service.id}`}
          className="text-base font-bold text-slate-900 group-hover:text-gov-800 transition font-serif line-clamp-2 min-h-[2.8rem] block leading-snug"
        >
          {service.name}
        </Link>

        {/* Short Description */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
          {service.description}
        </p>

        {/* Meta badges: Processing days & Fee */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700 pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-1.5 text-slate-700 font-medium">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>~{service.estimatedProcessingDays} {service.estimatedProcessingDays === 1 ? 'day' : 'days'} delivery</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-gov-700" />
            <span className="font-bold text-slate-900">{service.fee || 'Free'}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between gap-2">
        <Link
          to={`/services/${service.id}`}
          className="text-xs font-bold text-gov-800 hover:text-gov-950 transition flex items-center group-hover:translate-x-0.5"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 text-gov-700" />
        </Link>

        <button
          onClick={() => (onApply ? onApply(service) : null)}
          className="text-xs font-bold px-4 py-1.5 bg-gov-700 hover:bg-gov-800 text-white rounded-xl shadow-xs hover:shadow-gov transition cursor-pointer"
        >
          Start Service
        </button>
      </div>
    </div>
  );
};
