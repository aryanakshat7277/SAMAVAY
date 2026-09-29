import React, { useState, useEffect } from 'react';
import { dataRequirementApi, servicesApi, departmentsApi, platformApi } from '../../services/api';
import { DataRequirement, GovernmentService, Department, GovernmentPlatform } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import {
  FileCheck,
  Plus,
  Building2,
  Server,
  ShieldCheck,
  X,
  Check,
  Database,
  Search,
  RefreshCw,
  Sparkles,
  Lock
} from 'lucide-react';

export const DataRequirementsPage: React.FC = () => {
  const [requirements, setRequirements] = useState<DataRequirement[]>([]);
  const [services, setServices] = useState<GovernmentService[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [platforms, setPlatforms] = useState<GovernmentPlatform[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Add modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<number>(1);
  const [fieldName, setFieldName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sourceDeptId, setSourceDeptId] = useState<number>(1);
  const [sourcePlatformId, setSourcePlatformId] = useState<number>(1);
  const [availabilityStatus, setAvailabilityStatus] = useState<string>('AVAILABLE');
  const [purpose, setPurpose] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allReqs, allSvcs, allDepts, allPlats] = await Promise.all([
        dataRequirementApi.getAll(),
        servicesApi.getAll(),
        departmentsApi.getAll(),
        platformApi.getAll()
      ]);
      setRequirements(allReqs);
      setServices(allSvcs);
      setDepartments(allDepts);
      setPlatforms(allPlats);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateRequirement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const svc = services.find((s) => s.id === Number(serviceId));
      const dept = departments.find((d) => d.id === Number(sourceDeptId));
      const plat = platforms.find((p) => p.id === Number(sourcePlatformId));

      const created = await dataRequirementApi.create({
        serviceId: svc?.id || 1,
        serviceName: svc?.name || 'Government Service',
        fieldName,
        description,
        sourceDepartmentId: dept?.id,
        sourceDepartmentName: dept?.name,
        sourcePlatformId: plat?.id,
        sourcePlatformName: plat?.name,
        required: true,
        availabilityStatus,
        consentRequired: true,
        purpose
      });

      setRequirements([created, ...requirements]);
      setIsAddModalOpen(false);
      setFieldName('');
      setDescription('');
      setPurpose('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRequirements = requirements.filter((r) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.fieldName.toLowerCase().includes(q) ||
        (r.serviceName && r.serviceName.toLowerCase().includes(q)) ||
        (r.sourceDepartmentName && r.sourceDepartmentName.toLowerCase().includes(q)) ||
        (r.sourcePlatformName && r.sourcePlatformName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="SERVICE DATA REQUIREMENTS & SOURCE MAPPING"
        categoryIcon={FileCheck}
        title="Data Requirements Registry"
        description="Map which authoritative government platforms supply specific fields for each public service, driving the 62% information minimization engine."
        actions={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={loadData} icon={RefreshCw}>
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              icon={Plus}
            >
              Add Data Requirement
            </Button>
          </div>
        }
      />

      {/* 2. SEARCH STRIP */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by field, service, or department..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
            />
          </div>

          <div className="flex items-center space-x-3 text-xs text-stone-500">
            <span>Total Mapped Requirements:</span>
            <span className="font-mono font-bold text-gov-800 bg-gov-50 border border-gov-200 px-2.5 py-0.5 rounded-full">
              {requirements.length} Fields
            </span>
          </div>
        </div>
      </Card>

      {/* 3. DATA REQUIREMENTS TABLE */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50/90 border-b border-stone-200 text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">Field Name & Description</th>
                <th className="py-3.5 px-4">Government Service</th>
                <th className="py-3.5 px-4">Authoritative Source</th>
                <th className="py-3.5 px-4">Availability</th>
                <th className="py-3.5 px-4">DPDP Consent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {filteredRequirements.length > 0 ? (
                filteredRequirements.map((req) => (
                  <tr key={req.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-900 font-serif text-sm block">
                        {req.fieldName}
                      </span>
                      {req.description && (
                        <span className="text-[11px] text-stone-500 line-clamp-1">{req.description}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-900">
                      {req.serviceName || 'Public Service'}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-gov-800 block">{req.sourceDepartmentName}</span>
                        <span className="text-[10px] text-stone-400 font-mono block">{req.sourcePlatformName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          req.availabilityStatus === 'AVAILABLE'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {req.availabilityStatus === 'AVAILABLE' ? '✓ Auto-Available' : 'Needs User Input'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                        {req.consentRequired ? 'Explicit Consent' : 'Public / Exempt'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-stone-400">
                    No data requirements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Requirement Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-modal border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Map Service Data Requirement
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequirement} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Target Government Service *</label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.departmentName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Data Field Name *</label>
                <input
                  type="text"
                  required
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  placeholder="e.g. Land Record of Rights (RoR Number)"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Source Department</label>
                  <select
                    value={sourceDeptId}
                    onChange={(e) => setSourceDeptId(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Source Platform</label>
                  <select
                    value={sourcePlatformId}
                    onChange={(e) => setSourcePlatformId(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600"
                  >
                    {platforms.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Purpose of Data Reuse</label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g. Identity verification and property ownership validation"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                >
                  Save Requirement
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
