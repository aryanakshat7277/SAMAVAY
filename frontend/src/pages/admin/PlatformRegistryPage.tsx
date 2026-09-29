import React, { useState, useEffect } from 'react';
import { platformsApi } from '../../services/api';
import { GovernmentPlatform, IntegrationConnection } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { MetricCard } from '../../components/common/MetricCard';
import {
  Layers,
  Activity,
  ShieldCheck,
  Server,
  ArrowRight,
  Database,
  Lock,
  RefreshCw,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PlatformRegistryPage: React.FC = () => {
  const [platforms, setPlatforms] = useState<GovernmentPlatform[]>([]);
  const [connections, setConnections] = useState<IntegrationConnection[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [pList, cList] = await Promise.all([
          platformsApi.getAll(),
          platformsApi.getConnections()
        ]);
        setPlatforms(pList);
        setConnections(cList);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header */}
      <PageHeader
        category="NATIONAL INTEROPERABILITY & PLATFORM REGISTRY"
        categoryIcon={Layers}
        title="Connected Government Digital Platforms"
        description="Architectural registry of sovereign departmental systems communicating via SAMAVAY secure data exchange pipelines."
        actions={
          <Link
            to="/admin/control-center"
            className="px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white text-xs font-bold rounded-xl shadow-gov transition inline-flex items-center"
          >
            Control Center
          </Link>
        }
      />

      {/* 2. Summary KPI Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <MetricCard
          label="Registered Platforms"
          value={platforms.length}
          icon={Server}
          subtext="6 Core Ministries"
          highlightColor="emerald"
        />

        <MetricCard
          label="Active Data Pipes"
          value={connections.length}
          icon={Activity}
          subtext="mTLS Gateway Connections"
          highlightColor="emerald"
        />

        <MetricCard
          label="Security Standard"
          value="PKI_X509"
          icon={ShieldCheck}
          subtext="End-to-End Cryptography"
          highlightColor="emerald"
        />

        <MetricCard
          label="Average Gateway Latency"
          value="42ms"
          icon={Activity}
          subtext="High-throughput bus"
          highlightColor="saffron"
        />
      </div>

      {/* 3. Platforms Detailed Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <h3 className="text-sm font-bold text-stone-900 font-serif">
            Registered Departmental Systems & Endpoints
          </h3>
          <span className="text-xs text-stone-500 font-medium">{platforms.length} platforms online</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((plat) => (
            <Card
              key={plat.id}
              padding="lg"
              className="flex flex-col justify-between space-y-4 hover:border-gov-400 hover:shadow-card-hover transition-all duration-200 bg-white border-stone-200"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gov-800 bg-gov-50 border border-gov-200 px-2.5 py-0.5 rounded-full">
                    {plat.departmentName}
                  </span>
                  <StatusBadge status={plat.connectionStatus} size="sm" />
                </div>

                <div>
                  <h4 className="text-base font-bold text-stone-900 font-serif leading-snug">{plat.name}</h4>
                  <p className="text-[10px] text-stone-500 font-mono mt-0.5">Platform Code: {plat.code}</p>
                </div>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">{plat.description}</p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="text-[11px] text-stone-600">
                  <span>Uptime: <strong className="font-mono text-gov-800">{plat.uptimePercentage || 99.9}%</strong></span>
                </div>
                <Link
                  to={`/admin/platforms/${plat.id}`}
                  className="font-bold text-gov-700 hover:text-gov-900 inline-flex items-center gap-1 group"
                >
                  <span>View Telemetry</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
