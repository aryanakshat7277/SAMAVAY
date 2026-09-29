import React, { useState, useEffect } from 'react';
import { integrationApi, platformApi, departmentsApi, servicesApi } from '../../services/api';
import { IntegrationConnection, GovernmentPlatform, Department, GovernmentService, IntegrationStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Layers,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Check,
  RefreshCw,
  Zap,
  Activity,
  ChevronRight,
  Database,
  Lock,
  Search
} from 'lucide-react';

export const IntegrationHubPage: React.FC = () => {
  const [connections, setConnections] = useState<IntegrationConnection[]>([]);
  const [platforms, setPlatforms] = useState<GovernmentPlatform[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [services, setServices] = useState<GovernmentService[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 4-Step Wizard State
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [sourceDeptId, setSourceDeptId] = useState<number>(1);
  const [sourcePlatformId, setSourcePlatformId] = useState<number>(1);
  const [destDeptId, setDestDeptId] = useState<number>(3);
  const [destPlatformId, setDestPlatformId] = useState<number>(4);
  const [integrationName, setIntegrationName] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [serviceId, setServiceId] = useState<number>(1);
  const [connectionType, setConnectionType] = useState<string>('SECURE_GATEWAY');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Basic Profile',
    'Property Records'
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const availableCategories = [
    'Basic Profile',
    'Address Information',
    'Property Records',
    'Vehicle Records',
    'Academic Marks & Bonafide',
    'Health Insurance Registry',
    'Disability & Pension Registry',
    'Digital Document Hash'
  ];

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allConns, allPlats, allDepts, allSvcs] = await Promise.all([
        integrationApi.getAll(),
        platformApi.getAll(),
        departmentsApi.getAll(),
        servicesApi.getAll()
      ]);
      setConnections(allConns);
      setPlatforms(allPlats);
      setDepartments(allDepts);
      setServices(allSvcs);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: number, newStatus: IntegrationStatus) => {
    const updated = await integrationApi.updateStatus(id, newStatus);
    setConnections((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const handleToggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleCreateIntegration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const srcPlat = platforms.find((p) => p.id === Number(sourcePlatformId)) || platforms[0];
      const dstPlat = platforms.find((p) => p.id === Number(destPlatformId)) || platforms[1];
      const srcDept = departments.find((d) => d.id === Number(sourceDeptId)) || departments[0];
      const dstDept = departments.find((d) => d.id === Number(destDeptId)) || departments[1];
      const svc = services.find((s) => s.id === Number(serviceId));

      const created = await integrationApi.create({
        sourcePlatformId: srcPlat.id,
        sourcePlatformName: srcPlat.name,
        sourceDepartmentId: srcDept.id,
        sourceDepartmentName: srcDept.name,
        destinationPlatformId: dstPlat.id,
        destinationPlatformName: dstPlat.name,
        destinationDepartmentId: dstDept.id,
        destinationDepartmentName: dstDept.name,
        serviceId: svc?.id,
        serviceName: svc?.name,
        name: integrationName || `${srcPlat.code} ➔ ${dstPlat.code} Pipe`,
        purpose: purpose || 'Verification for Citizen Public Service',
        connectionType,
        status: 'ACTIVE',
        dataExchangeProtocol: 'mTLS_PKI_X509',
        dataCategories: selectedCategories.join(', '),
        consentRequired: true,
        totalTransactionsProcessed: 0
      });

      setConnections([created, ...connections]);
      setIsWizardOpen(false);
      setWizardStep(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredConnections = connections.filter((conn) => {
    if (selectedStatusFilter !== 'ALL' && conn.status.toUpperCase() !== selectedStatusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        conn.sourcePlatformName.toLowerCase().includes(q) ||
        conn.destinationPlatformName.toLowerCase().includes(q) ||
        (conn.name && conn.name.toLowerCase().includes(q)) ||
        (conn.dataCategories && conn.dataCategories.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="CROSS-DEPARTMENTAL INTEGRATIONS & MTLS PIPELINES"
        categoryIcon={Layers}
        title="Integration Hub"
        description="Establish and govern bidirectional data pipelines, manage encryption handshakes, and authorize cross-department data sharing."
        actions={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={loadData} icon={RefreshCw}>
              Refresh
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsWizardOpen(true)}
              icon={Plus}
            >
              New Integration Pipe
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
              placeholder="Search pipes by source, destination, or data category..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['ALL', 'ACTIVE', 'UNDER_REVIEW', 'SUSPENDED'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedStatusFilter === st
                    ? 'bg-gov-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {st === 'ALL' ? 'All Pipelines' : st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 3. INTEGRATION PIPELINES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredConnections.map((conn) => (
          <Card
            key={conn.id}
            padding="md"
            className="flex flex-col justify-between space-y-4 hover:border-gov-400 transition-all duration-200"
          >
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gov-800 bg-gov-50 px-2.5 py-0.5 rounded-full border border-gov-200">
                  {conn.connectionType}
                </span>
                <StatusBadge status={conn.status} size="sm" />
              </div>

              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="text-left space-y-0.5 max-w-[42%]">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Source</span>
                  <span className="font-bold text-stone-900 line-clamp-1">{conn.sourcePlatformName}</span>
                  <span className="text-[10px] text-stone-500 block truncate">{conn.sourceDepartmentName}</span>
                </div>

                <div className="flex items-center justify-center p-2 rounded-full bg-white border border-stone-200 shadow-xs flex-shrink-0">
                  <ArrowRight className="w-4 h-4 text-gov-700" />
                </div>

                <div className="text-right space-y-0.5 max-w-[42%]">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Destination</span>
                  <span className="font-bold text-stone-900 line-clamp-1">{conn.destinationPlatformName}</span>
                  <span className="text-[10px] text-stone-500 block truncate">{conn.destinationDepartmentName}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">Authorized Data Categories</span>
                <p className="text-[11px] text-stone-700 font-mono bg-white p-2 rounded-xl border border-stone-100 line-clamp-2">
                  {conn.dataCategories || 'Basic Profile, Property Records'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500 text-[10px]">
                Protocol: <strong className="text-stone-800 font-mono">{conn.dataExchangeProtocol}</strong>
              </span>

              <div className="flex items-center space-x-2">
                {conn.status === 'ACTIVE' ? (
                  <button
                    onClick={() => handleStatusChange(conn.id, 'SUSPENDED')}
                    className="text-amber-700 hover:text-amber-900 font-bold text-[11px]"
                  >
                    Pause Pipe
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(conn.id, 'ACTIVE')}
                    className="text-emerald-700 hover:text-emerald-900 font-bold text-[11px]"
                  >
                    Activate Pipe
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Integration Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-modal border border-stone-200 space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Configure Integration Pipeline
              </h3>
              <button
                onClick={() => setIsWizardOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateIntegration} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Pipeline Name</label>
                <input
                  type="text"
                  required
                  value={integrationName}
                  onChange={(e) => setIntegrationName(e.target.value)}
                  placeholder="e.g. Bhoomi RoR ➔ Municipal Property Tax Pipe"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Destination Platform</label>
                  <select
                    value={destPlatformId}
                    onChange={(e) => setDestPlatformId(Number(e.target.value))}
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
                <label className="block text-xs font-semibold text-stone-700 mb-1">Allowed Data Categories</label>
                <div className="grid grid-cols-2 gap-1.5 p-2 bg-stone-50 border border-stone-200 rounded-xl max-h-32 overflow-y-auto">
                  {availableCategories.map((cat) => (
                    <label key={cat} className="flex items-center space-x-1.5 text-[11px] text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleToggleCategory(cat)}
                        className="rounded border-stone-300 text-gov-600 focus:ring-gov-500"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setIsWizardOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                >
                  Create Pipe
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
