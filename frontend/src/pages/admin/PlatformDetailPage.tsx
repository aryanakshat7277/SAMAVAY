import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { platformApi, integrationApi, servicesApi } from '../../services/api';
import { GovernmentPlatform, IntegrationConnection, GovernmentService } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MetricCard } from '../../components/common/MetricCard';
import {
  Server,
  ArrowLeft,
  ShieldCheck,
  Activity,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Clock,
  Globe
} from 'lucide-react';

export const PlatformDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [platform, setPlatform] = useState<GovernmentPlatform | null>(null);
  const [connections, setConnections] = useState<IntegrationConnection[]>([]);
  const [services, setServices] = useState<GovernmentService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPlatformData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const plat = await platformApi.getById(Number(id));
        if (plat) {
          setPlatform(plat);
          const [allConns, allSvcs] = await Promise.all([
            integrationApi.getAll(),
            servicesApi.getAll()
          ]);
          setConnections(allConns.filter((c) => c.sourcePlatformId === plat.id || c.destinationPlatformId === plat.id));
          setServices(allSvcs.filter((s) => s.departmentId === plat.departmentId));
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadPlatformData();
  }, [id]);

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-stone-500 font-medium">Loading sovereign platform telemetry...</div>;
  }

  if (!platform) {
    return (
      <div className="p-8 text-center space-y-3">
        <h2 className="text-base font-bold text-stone-900 font-serif">Platform Record Not Found</h2>
        <Link to="/admin/platform-registry" className="text-xs font-bold text-gov-700 hover:underline">
          Back to Platform Registry
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Back Link */}
      <Link
        to="/admin/platform-registry"
        className="inline-flex items-center text-xs font-bold text-gov-800 hover:text-gov-950 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Platform Registry
      </Link>

      {/* Main Platform Header */}
      <Card padding="lg" className="space-y-6 bg-white border-stone-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gov-800 bg-gov-50 border border-gov-200 px-2.5 py-0.5 rounded-full">
                {platform.departmentName}
              </span>
              <StatusBadge status={platform.connectionStatus} size="sm" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
              {platform.name}
            </h1>
            <p className="text-xs text-stone-500 font-mono">Identifier: {platform.code}</p>
          </div>

          <span className="px-3 py-1 bg-stone-100 border border-stone-200 text-stone-800 font-mono text-xs rounded-xl font-bold">
            {platform.environment} Environment
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
          {platform.description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-100 text-xs">
          <div className="p-3.5 bg-sandstone-100 rounded-2xl border border-stone-200">
            <span className="text-stone-500 block text-[11px] font-medium">Platform Type</span>
            <span className="font-bold text-stone-900 font-serif text-sm">{platform.platformType}</span>
          </div>

          <div className="p-3.5 bg-sandstone-100 rounded-2xl border border-stone-200">
            <span className="text-stone-500 block text-[11px] font-medium">Auth Protocol</span>
            <span className="font-bold text-gov-800 font-mono text-xs">{platform.authProtocol}</span>
          </div>

          <div className="p-3.5 bg-sandstone-100 rounded-2xl border border-stone-200">
            <span className="text-stone-500 block text-[11px] font-medium">System Uptime</span>
            <span className="font-bold text-emerald-800 font-mono text-sm">{platform.uptimePercentage || 99.9}% SLA</span>
          </div>

          <div className="p-3.5 bg-sandstone-100 rounded-2xl border border-stone-200">
            <span className="text-stone-500 block text-[11px] font-medium">Last Health Ping</span>
            <span className="font-bold text-stone-800 font-mono text-xs">{platform.lastPingAt || 'Live Sync'}</span>
          </div>
        </div>
      </Card>

      {/* 2. Connected Services */}
      <Card padding="md" className="space-y-4 bg-white border-stone-200 shadow-card">
        <h3 className="text-sm font-bold text-stone-900 font-serif">
          Connected Citizen Services Supported by this Platform ({services.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {services.map((svc) => (
            <div key={svc.id} className="p-3.5 bg-sandstone-100 border border-stone-200 rounded-2xl text-xs space-y-1.5 hover:border-gov-300 transition">
              <span className="font-bold text-stone-900 line-clamp-1 font-serif">{svc.name}</span>
              <p className="text-[11px] text-stone-500 line-clamp-2">{svc.description}</p>
              <div className="flex justify-between items-center pt-2 text-[10px] text-gov-800 border-t border-stone-200/60 font-mono">
                <span>Code: {svc.code}</span>
                <span className="font-bold text-emerald-800">Operational</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Interconnected Platform Flow Diagram */}
      <Card padding="md" className="space-y-4 bg-white border-stone-200 shadow-card">
        <h3 className="text-sm font-bold text-stone-900 font-serif">
          Inter-Platform Data Pipeline Connections
        </h3>

        <div className="space-y-3">
          {connections.map((conn) => (
            <div
              key={conn.id}
              className="p-4 bg-sandstone-100 border border-stone-200 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 font-bold text-gov-950 font-serif truncate max-w-[180px] shadow-xs">
                  {conn.sourcePlatformName}
                </div>

                <div className="flex items-center space-x-1 text-gov-700 font-bold">
                  <span>➔</span>
                  <span className="text-[10px] bg-gov-100 text-gov-900 px-2 py-0.5 rounded font-mono border border-gov-200">
                    {conn.connectionType}
                  </span>
                  <span>➔</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-stone-200 font-bold text-gov-950 font-serif truncate max-w-[180px] shadow-xs">
                  {conn.destinationPlatformName}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-[11px] text-stone-600 font-mono font-medium">
                  {conn.totalTransactionsProcessed.toLocaleString('en-IN')} Synced
                </span>
                <StatusBadge status={conn.status} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
