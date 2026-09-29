import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { platformApi, departmentsApi } from '../../services/api';
import { GovernmentPlatform, Department, PlatformType, EnvironmentType, PlatformConnectionStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Server,
  Plus,
  Filter,
  ExternalLink,
  ShieldCheck,
  Building2,
  RefreshCw,
  X,
  Check,
  Layers,
  ArrowRight,
  Search,
  Zap,
  Lock
} from 'lucide-react';

export const AdminPlatformRegistryPage: React.FC = () => {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState<GovernmentPlatform[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('ALL');
  const [selectedEnv, setSelectedEnv] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [deptId, setDeptId] = useState<number>(1);
  const [description, setDescription] = useState('');
  const [platformType, setPlatformType] = useState<PlatformType>('API_PLATFORM');
  const [environment, setEnvironment] = useState<EnvironmentType>('PRODUCTION');
  const [endpointUrl, setEndpointUrl] = useState('https://gov.in/api/v1');
  const [authProtocol, setAuthProtocol] = useState('PKI_X509');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [platList, deptList] = await Promise.all([
        platformApi.getAll(),
        departmentsApi.getAll()
      ]);
      setPlatforms(platList);
      setDepartments(deptList);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddPlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const targetDept = departments.find((d) => d.id === Number(deptId)) || departments[0];
      const created = await platformApi.create({
        name,
        code: code || `PLT-${Date.now().toString().slice(-4)}`,
        departmentId: targetDept.id,
        departmentName: targetDept.name,
        description,
        platformType,
        environment,
        connectionStatus: 'CONNECTED',
        endpointUrl,
        authProtocol
      });

      setPlatforms([created, ...platforms]);
      setIsAddModalOpen(false);
      setName('');
      setCode('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPlatforms = platforms.filter((plat) => {
    if (selectedDeptId !== 'ALL' && plat.departmentId !== Number(selectedDeptId)) {
      return false;
    }
    if (selectedEnv !== 'ALL' && plat.environment.toUpperCase() !== selectedEnv) {
      return false;
    }
    if (selectedStatus !== 'ALL' && plat.connectionStatus.toUpperCase() !== selectedStatus) {
      return false;
    }
    if (selectedType !== 'ALL' && plat.platformType.toUpperCase() !== selectedType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        plat.name.toLowerCase().includes(q) ||
        plat.code.toLowerCase().includes(q) ||
        plat.departmentName.toLowerCase().includes(q) ||
        (plat.description && plat.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="NATIONAL DIGITAL PLATFORM REGISTRY"
        categoryIcon={Server}
        title="Government Digital Platforms"
        description="Register, configure, and monitor interconnected departmental databases, legacy applications, and API gateways."
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
              Register Platform
            </Button>
          </div>
        }
      />

      {/* 2. FILTER & SEARCH CONTROL STRIP */}
      <Card padding="md" className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, code, or department..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs w-full sm:w-auto">
            {/* Department Filter */}
            <select
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl font-semibold text-stone-700 focus:border-gov-600 cursor-pointer"
            >
              <option value="ALL">All Departments ({departments.length})</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {/* Environment Filter */}
            <select
              value={selectedEnv}
              onChange={(e) => setSelectedEnv(e.target.value)}
              className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl font-semibold text-stone-700 focus:border-gov-600 cursor-pointer"
            >
              <option value="ALL">All Environments</option>
              <option value="PRODUCTION">Production</option>
              <option value="STAGING">Staging</option>
              <option value="TESTING">Testing</option>
            </select>
          </div>
        </div>
      </Card>

      {/* 3. PLATFORMS DATA TABLE */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50/90 border-b border-stone-200 text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">Platform Name & Code</th>
                <th className="py-3.5 px-4">Governing Department</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Environment</th>
                <th className="py-3.5 px-4">Connection Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {filteredPlatforms.length > 0 ? (
                filteredPlatforms.map((plat) => (
                  <tr
                    key={plat.id}
                    className="hover:bg-stone-50/80 transition"
                  >
                    <td className="py-3.5 px-4 font-medium">
                      <Link
                        to={`/admin/platforms/${plat.id}`}
                        className="font-bold text-gov-800 hover:underline font-serif text-sm block"
                      >
                        {plat.name}
                      </Link>
                      <span className="text-[10px] text-stone-400 font-mono">{plat.code}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-stone-900">{plat.departmentName}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-[10px] font-mono">
                        {plat.platformType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        plat.environment === 'PRODUCTION'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {plat.environment}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={plat.connectionStatus} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/platforms/${plat.id}`}
                        className="text-gov-800 font-bold hover:underline"
                      >
                        Configure →
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    No government platforms found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Register Platform Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-modal border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Register Government Platform
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPlatform} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Platform Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. State Land Cadastral Database"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Governing Department *</label>
                  <select
                    value={deptId}
                    onChange={(e) => setDeptId(Number(e.target.value))}
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
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Platform Type</label>
                  <select
                    value={platformType}
                    onChange={(e) => setPlatformType(e.target.value as PlatformType)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600"
                  >
                    <option value="API_PLATFORM">API Platform</option>
                    <option value="GOVERNMENT_DATABASE">Government Database</option>
                    <option value="WEB_APPLICATION">Web Application</option>
                    <option value="LEGACY_SYSTEM">Legacy System</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Gateway Endpoint URL</label>
                <input
                  type="text"
                  value={endpointUrl}
                  onChange={(e) => setEndpointUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Platform capabilities and data holdings..."
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
                  Register Platform
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
