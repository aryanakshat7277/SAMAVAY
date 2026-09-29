import React from 'react';
import { Link } from 'react-router-dom';
import { Department } from '../../types';
import { getDepartmentIcon } from './ServiceCard';
import { ArrowRight, Layers, Landmark } from 'lucide-react';

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const Icon = getDepartmentIcon(department.code);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 hover:border-gov-400 hover:shadow-card-hover transition-all duration-200 p-6 flex flex-col justify-between group shadow-xs">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gov-50 border border-gov-200 flex items-center justify-center text-gov-800 group-hover:bg-gov-900 group-hover:text-white transition-all shadow-xs">
            <Icon className="w-6 h-6 text-current" />
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-stone-700 bg-sandstone-100 border border-stone-200 px-3 py-1 rounded-full">
            <Layers className="w-3 h-3 text-gov-700" />
            {department.servicesCount} Services
          </span>
        </div>

        <h3 className="text-base font-bold text-stone-900 group-hover:text-gov-800 transition mb-2 font-serif">
          {department.name}
        </h3>

        <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-6">
          {department.description}
        </p>
      </div>

      <Link
        to={`/services?department=${department.code}`}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-gov-800 bg-gov-50 hover:bg-gov-100 rounded-xl transition border border-gov-200/80 group-hover:border-gov-300"
      >
        <span>Explore Department Services</span>
        <ArrowRight className="w-4 h-4 text-gov-700 group-hover:translate-x-0.5 transition" />
      </Link>
    </div>
  );
};
