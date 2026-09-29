import React, { useState, useEffect } from 'react';
import { departmentsApi } from '../../services/api';
import { Department } from '../../types';
import { DepartmentCard } from '../../components/services/DepartmentCard';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Building2, Layers, Search } from 'lucide-react';

export const DepartmentsDirectoryPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await departmentsApi.getAll();
        setDepartments(data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const filteredDepts = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (dept.description && dept.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="CONNECTED GOVERNMENT MINISTRIES & DEPARTMENTS"
        categoryIcon={Building2}
        title="Departments Directory"
        description="Explore all integrated state and central departments, view jurisdictional domains, and discover automated public services."
      />

      {/* 2. SEARCH & FILTER STRIP */}
      <Card padding="md" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search departments by name or domain..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-stone-500">
          <span>Total Connected Ministries:</span>
          <span className="font-mono font-bold text-gov-800 bg-gov-50 border border-gov-200 px-2.5 py-0.5 rounded-full">
            {departments.length} Authorities
          </span>
        </div>
      </Card>

      {/* 3. GRID OF DEPARTMENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => (
          <DepartmentCard key={dept.id} department={dept} />
        ))}
      </div>
    </div>
  );
};
