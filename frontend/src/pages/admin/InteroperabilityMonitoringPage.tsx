import React, { useState, useEffect } from 'react';
import { monitoringApi, platformApi, integrationApi, eventApi } from '../../services/api';
import { MonitoringSummary, GovernmentPlatform, IntegrationConnection, SystemEvent } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { MetricCard } from '../../components/common/MetricCard';
import { Button } from '../../components/common/Button';
import {
  Activity,
  ShieldCheck,
  Server,
  Zap,
  Clock,
  ArrowRight,
  RefreshCw,
  Layers,
  Network,
  AlertCircle,
  Database,
  Radio,
  CheckCircle2
} from 'lucide-react';

export const InteroperabilityMonitoringPage: React.FC = () => {
  const [summary, setSummary] = useState<MonitoringSummary | null>(null);
  const [platforms, setPlatforms] = useState<GovernmentPlatform[]>([]);
  const [connections, setConnections] = useState<IntegrationConnection[]>([]);
  const [events, setEvents] = useState<SystemEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [sum, plats, conns, evts] = await Promise.all([
        monitoringApi.getSummary(),
        platformApi.getAll(),
        integrationApi.getAll(),
        eventApi.getAll()
      ]);
      setSummary(sum);
      setPlatforms(plats);
      setConnections(conns);
      setEvents(evts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <PageHeader
        category="REAL-TIME SYSTEM METRICS & GATEWAY HEALTH"
        categoryIcon={Activity}
        title="Interoperability Monitoring & Health"
        description="Live telemetry, gateway latencies, API throughput, and security status across all interconnected digital platforms."
        actions={
          <Button variant="outline" size="sm" onClick={loadData} icon={RefreshCw} isLoading={isLoading}>
            Live Telemetry Refresh
          </Button>
        }
      />

      {/* 2. Primary KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <MetricCard
          label="Connected Platforms"
          value={summary?.totalPlatforms || platforms.length}
          icon={Server}
          subtext="100% Core Coverage"
          highlightColor="emerald"
        />

        <MetricCard
          label="Active Integrations"
          value={summary?.activeConnections || connections.length}
          icon={Network}
          subtext={`Configured: ${summary?.totalConnections || 8}`}
          highlightColor="emerald"
        />

        <MetricCard
          label="Gateway Latency"
          value={`${summary?.health?.averageLatencyMs || 42}ms`}
          icon={Clock}
          subtext="Sub-50ms Target SLA"
          highlightColor="emerald"
        />

        <MetricCard
          label="Interoperability SLA"
          value={`${summary?.health?.healthyPercentage || 99.9}%`}
          icon={Activity}
          subtext="Zero Dropped Packets"
          highlightColor="saffron"
        />
      </div>

      {/* 3. Live Platform Nodes Health Grid */}
      <Card padding="md" className="space-y-4 bg-white border-stone-200 shadow-card">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-gov-700 animate-pulse" />
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Live Sovereign Node Telemetry Ping
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            mTLS PKI_X509 Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {platforms.map((plat) => {
            const isConnected = plat.connectionStatus === 'CONNECTED' || plat.connectionStatus === 'HEALTHY' || plat.connectionStatus === 'ONLINE';
            return (
              <div
                key={plat.id}
                className="p-3.5 bg-sandstone-100 border border-stone-200 rounded-2xl flex flex-col justify-between space-y-2 hover:border-gov-400 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs font-serif truncate max-w-[140px]">
                    {plat.name}
                  </span>
                  <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-amber-500'} ring-4 ${isConnected ? 'ring-emerald-100' : 'ring-amber-100'}`} />
                </div>

                <div className="flex justify-between items-center text-[10px] text-stone-500">
                  <span className="font-mono">{plat.code}</span>
                  <span className="font-bold text-gov-800">{plat.uptimePercentage || 99.9}% SLA</span>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex justify-between items-center text-[10px]">
                  <span className="text-stone-600 font-medium">Auth: {plat.authProtocol}</span>
                  <span className="text-stone-500 font-mono">{plat.lastPingAt || 'Live'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4. Live Gateway Telemetry Event Log */}
      <Card padding="none" className="overflow-hidden bg-white border-stone-200 shadow-card">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-gov-700" />
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Live Gateway Packet & Telemetry Stream
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-mono">Continuous Ingestion</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Event Summary</th>
                <th className="py-3 px-4">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {events.slice(0, 6).map((evt) => (
                <tr key={evt.id} className="hover:bg-gov-50/30 transition">
                  <td className="py-3 px-4 font-mono text-[11px] text-stone-500">
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className="py-3 px-4 font-bold text-stone-900 font-serif">{evt.eventType}</td>
                  <td className="py-3 px-4 font-mono text-gov-800 text-[11px] font-bold">{evt.source}</td>
                  <td className="py-3 px-4 text-stone-600">{evt.message}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        evt.severity === 'ERROR'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : evt.severity === 'WARNING'
                          ? 'bg-saffron-50 text-saffron-800 border-saffron-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {evt.severity}
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
