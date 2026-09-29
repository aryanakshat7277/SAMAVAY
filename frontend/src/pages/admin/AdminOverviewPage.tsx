import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { monitoringApi, platformApi, integrationApi, auditLogApi } from '../../services/api';
import { MonitoringSummary, GovernmentPlatform, IntegrationConnection, AuditLog } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { MetricCard } from '../../components/common/MetricCard';
import {
  LayoutDashboard,
  Server,
  Layers,
  Activity,
  ArrowRight,
  ShieldCheck,
  Plus,
  Network,
  Clock,
  Lock,
  ScrollText,
  FileCheck,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export const AdminOverviewPage: React.FC = () => {
  const [summary, setSummary] = useState<MonitoringSummary | null>(null);
  const [platforms, setPlatforms] = useState<GovernmentPlatform[]>([]);
  const [connections, setConnections] = useState<IntegrationConnection[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadOverviewData = async () => {
    setIsLoading(true);
    try {
      const [sum, plats, conns, logs] = await Promise.all([
        monitoringApi.getSummary(),
        platformApi.getAll(),
        integrationApi.getAll(),
        auditLogApi.getRecentLogs()
      ]);
      setSummary(sum);
      setPlatforms(plats);
      setConnections(conns);
      setAuditLogs(logs);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOverviewData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header */}
      <PageHeader
        category="INTEROPERABILITY CONTROL CENTER"
        categoryIcon={LayoutDashboard}
        title="Interoperability Ecosystem Overview"
        description="Live operational status across all registered government platforms, integration pipelines, and citizen consent tokens."
        actions={
          <div className="flex items-center gap-2">
            <Link
              to="/admin/integrations"
              className="px-4 py-2.5 bg-gov-700 hover:bg-gov-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-gov transition inline-flex items-center"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Manage Integrations
            </Link>
            <Link
              to="/admin/platform-registry"
              className="px-4 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-bold rounded-xl shadow-xs transition inline-flex items-center"
            >
              <Server className="w-4 h-4 mr-1.5 text-gov-700" />
              Platform Registry
            </Link>
          </div>
        }
      />

      {/* 2. Summary KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <MetricCard
          label="Registered Platforms"
          value={summary?.totalPlatforms || platforms.length}
          icon={Server}
          subtext="Across 12 Sovereign Ministries"
          highlightColor="emerald"
        />

        <MetricCard
          label="Active Integrations"
          value={summary?.activeConnections || connections.length}
          icon={Network}
          subtext="mTLS Encrypted Pipes"
          highlightColor="emerald"
        />

        <MetricCard
          label="Interoperability SLA"
          value={`${summary?.health?.healthyPercentage || 99.9}%`}
          icon={Activity}
          subtext="Zero Outage Tolerance"
          highlightColor="saffron"
        />

        <MetricCard
          label="Security Protocol"
          value="mTLS PKI"
          icon={Lock}
          subtext="DPDP Act Compliant"
          highlightColor="emerald"
        />
      </div>

      {/* 3. Live Platforms Grid */}
      <Card padding="md" className="space-y-4 bg-white border-stone-200 shadow-card">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
              Connected Government Digital Platforms
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5 font-medium">Authoritative data providers in the national mesh</p>
          </div>
          <Link
            to="/admin/platform-registry"
            className="text-xs sm:text-sm font-bold text-gov-800 hover:text-gov-950 inline-flex items-center gap-1"
          >
            <span>View All ({platforms.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {platforms.slice(0, 6).map((plat) => (
            <div
              key={plat.id}
              className="p-4 bg-sandstone-100 border border-stone-200 rounded-2xl flex flex-col justify-between space-y-3 hover:border-gov-300 transition"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-gov-800 bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200">
                    {plat.departmentName}
                  </span>
                  <StatusBadge status={plat.connectionStatus} size="sm" />
                </div>
                <h4 className="font-bold text-stone-900 text-sm sm:text-base font-serif line-clamp-1">{plat.name}</h4>
                <p className="text-xs sm:text-sm text-stone-600 font-mono font-medium">Code: {plat.code}</p>
              </div>

              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs sm:text-sm text-stone-700 font-medium">
                <span>Type: <strong className="text-stone-900 font-bold">{plat.platformType}</strong></span>
                <span className="font-mono text-gov-800 font-bold">{plat.uptimePercentage || 99.9}% SLA</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Active Integration Pipelines Table */}
      <Card padding="none" className="overflow-hidden bg-white border-stone-200 shadow-card">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
              Active Inter-Platform Integration Pipelines
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5 font-medium">High-speed data exchange routes</p>
          </div>
          <Link
            to="/admin/integrations"
            className="text-xs sm:text-sm font-bold text-gov-800 hover:text-gov-950 inline-flex items-center gap-1"
          >
            <span>Configure Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 text-stone-700 font-bold border-b border-stone-200 uppercase tracking-wider text-xs">
              <tr>
                <th className="py-3 px-4">Pipeline Name</th>
                <th className="py-3 px-4">Source Platform</th>
                <th className="py-3 px-4">Target Platform</th>
                <th className="py-3 px-4">Connection Type</th>
                <th className="py-3 px-4">Transactions</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {connections.slice(0, 5).map((conn) => (
                <tr key={conn.id} className="hover:bg-gov-50/30 transition">
                  <td className="py-3 px-4 font-bold text-stone-900">{conn.name}</td>
                  <td className="py-3 px-4 font-semibold text-stone-800">{conn.sourcePlatformName}</td>
                  <td className="py-3 px-4 font-semibold text-stone-800">{conn.destinationPlatformName}</td>
                  <td className="py-3 px-4">
                    <span className="bg-gov-50 text-gov-800 border border-gov-200 text-xs font-bold px-2.5 py-0.5 rounded font-mono">
                      {conn.connectionType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-900 font-bold">
                    {conn.totalTransactionsProcessed.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={conn.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5. Recent Sovereign Audit Logs */}
      <Card padding="none" className="overflow-hidden bg-white border-stone-200 shadow-card">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-gov-700" />
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
              Immutable Cryptographic Audit Trail
            </h3>
          </div>
          <Link
            to="/admin/audit-logs"
            className="text-xs sm:text-sm font-bold text-gov-800 hover:text-gov-950 inline-flex items-center gap-1"
          >
            <span>View All Logs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-50 text-stone-700 font-bold border-b border-stone-200 uppercase tracking-wider text-xs">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Event Action</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Resource</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {auditLogs.slice(0, 4).map((log) => (
                <tr key={log.id} className="hover:bg-gov-50/30 transition">
                  <td className="py-3 px-4 font-mono text-xs sm:text-sm text-stone-600 font-semibold">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className="py-3 px-4 font-bold text-stone-900">{log.action}</td>
                  <td className="py-3 px-4 font-mono text-gov-800 text-xs sm:text-sm font-bold">{log.performedBy || 'SYSTEM'}</td>
                  <td className="py-3 px-4 text-stone-800">{log.resourceType || log.description || 'Entity Record'}</td>
                  <td className="py-3 px-4">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      SEALED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
