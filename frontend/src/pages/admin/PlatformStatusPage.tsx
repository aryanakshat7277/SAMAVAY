import React, { useState, useEffect } from 'react';
import { platformStatusApi } from '../../services/api';
import { PlatformStatusDto, ServiceImpactDto } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import {
  Server,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Info,
  Building2,
  Database
} from 'lucide-react';

export const PlatformStatusPage: React.FC = () => {
  const [statuses, setStatuses] = useState<PlatformStatusDto[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformStatusDto | null>(null);
  const [impactData, setImpactData] = useState<ServiceImpactDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await platformStatusApi.getAll();
      setStatuses(data);
      if (data.length > 0) {
        setSelectedPlatform(data[0]);
        const impact = await platformStatusApi.getImpact(data[0].id);
        setImpactData(impact);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectPlatform = async (platform: PlatformStatusDto) => {
    setSelectedPlatform(platform);
    const impact = await platformStatusApi.getImpact(platform.id);
    setImpactData(impact);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="SOVEREIGN PLATFORM HEALTH & IMPACT ENGINE"
        categoryIcon={Server}
        title="Platform Status & Impact Analysis"
        description="Real-time health telemetry across state and central digital infrastructure with automated downstream citizen service dependency tracking."
        actions={
          <Button variant="outline" size="sm" onClick={loadData} icon={RefreshCw}>
            Poll Systems
          </Button>
        }
      />

      {/* 2. MAIN GRID: PLATFORM CARDS + DOWNSTREAM IMPACT ANALYSIS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Platform Health Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Connected Public Platforms ({statuses.length})
            </h3>
            <span className="text-[11px] text-stone-500 font-mono">Real-time Ping Interval: 30s</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statuses.map((p) => {
              const isSelected = selectedPlatform?.id === p.id;
              const isHealthy = p.status === 'HEALTHY';

              return (
                <Card
                  key={p.id}
                  padding="md"
                  onClick={() => handleSelectPlatform(p)}
                  className={`cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-gov-50/70 border-gov-700 ring-2 ring-gov-200 shadow-sm'
                      : 'hover:border-gov-400'
                  }`}
                >
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gov-800 bg-gov-100 px-2 py-0.5 rounded-full">
                        {p.departmentName}
                      </span>
                      <StatusBadge status={p.status} size="sm" />
                    </div>

                    <h4 className="font-bold text-stone-900 font-serif text-sm pt-1">{p.name}</h4>
                    <span className="text-[10px] text-stone-400 font-mono block">{p.code} • {p.environment}</span>
                  </div>

                  <div className="pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-stone-400 block text-[10px]">Response Time</span>
                      <span className="font-mono font-bold text-stone-800">{p.averageResponseTimeMs}ms</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">Success Rate</span>
                      <span className="font-mono font-bold text-emerald-700">{p.successRatePercentage}%</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Downstream Impact Analysis */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Downstream Service Impact
            </h3>
            <span className="text-[10px] font-bold uppercase text-gov-800 bg-gov-100 px-2 py-0.5 rounded-full">
              Live Topology
            </span>
          </div>

          {selectedPlatform && impactData ? (
            <Card padding="md" className="space-y-4">
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Inspected Platform</span>
                <h4 className="text-sm font-bold text-stone-900 font-serif">{selectedPlatform.name}</h4>
                <p className="text-[11px] text-stone-600">
                  {impactData.impactedServicesCount} Public Services actively depend on this registry.
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider block">
                  Dependent Citizen Services
                </span>

                {impactData.impactedServices && impactData.impactedServices.length > 0 ? (
                  impactData.impactedServices.map((svc, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-stone-200 rounded-xl space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900">{svc.serviceName}</span>
                        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {svc.fallbackAvailability === 'FALLBACK_AVAILABLE' ? 'Fallback Active' : 'Direct Pipe'}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Supplies: <strong className="text-stone-700">{svc.requiredDataField}</strong>
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-stone-400 py-4 text-center">
                    No critical downstream bottlenecks identified.
                  </p>
                )}
              </div>
            </Card>
          ) : (
            <Card padding="md" className="text-center py-8 text-stone-400 text-xs">
              Select a platform to inspect its downstream service impact.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
