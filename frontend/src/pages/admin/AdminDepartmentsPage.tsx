import React, { useState, useEffect } from 'react';
import { departmentsApi } from '../../services/api';
import { Department } from '../../types';
import { Building2, Plus, ExternalLink, ArrowRight, Layers, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';

export const AdminDepartmentsPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    departmentsApi.getAll().then((data) => {
      setDepartments(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PageHeader
        category="MINISTRIES & STATUTORY AUTHORITIES"
        categoryIcon={Building2}
        title="Connected Government Departments"
        description="Participating state ministries and statutory boards actively connected to the SAMAVAY interoperability grid."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept, idx) => (
          <Card
            key={dept.id}
            padding="lg"
            className="flex flex-col justify-between space-y-4 hover:border-gov-400 hover:shadow-card-hover transition-all duration-200 animate-stagger-in bg-white border-stone-200"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gov-50 text-gov-800 border border-gov-200 flex items-center justify-center font-bold shadow-xs">
                  <Landmark className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono bg-stone-100 text-stone-700 border border-stone-200 px-2.5 py-1 rounded-full font-bold">
                  {dept.code}
                </span>
              </div>
              <h3 className="text-base font-bold text-stone-900 font-serif leading-snug">{dept.name}</h3>
              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">{dept.description}</p>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-gov-800 bg-gov-50 px-2.5 py-0.5 rounded-full border border-gov-200 text-[11px]">
                {dept.servicesCount} Digital Services
              </span>
              <Link
                to={`/departments`}
                className="font-bold text-gov-700 hover:text-gov-900 inline-flex items-center group"
              >
                <span>Directory</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
