import React, { useState, useEffect } from 'react';
import { dataExchangeApi } from '../../services/api';
import { GatewayRequestLog } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import {
  ArrowLeftRight,
  ShieldCheck,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  RefreshCw,
  Server,
  Zap,
  Search
} from 'lucide-react';

export const DataExchangePage: React.FC = () => {
  const [logs, setLogs] = useState<GatewayRequestLog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedLog, setSelectedLog] = useState<GatewayRequestLog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const data = await dataExchangeApi.getAll();
      setLogs(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (selectedStatus !== 'ALL' && log.status.toUpperCase() !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.requestId.toLowerCase().includes(q) ||
        log.sourcePlatformName.toLowerCase().includes(q) ||
        log.destinationPlatformName.toLowerCase().includes(q) ||
        log.dataCategory.toLowerCase().includes(q) ||
        (log.applicationNumber && log.applicationNumber.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="CROSS-PLATFORM DATA GOVERNANCE & TELEMETRY"
        categoryIcon={ArrowLeftRight}
        title="Data Exchange Activity & Telemetry"
        description="Real-time metadata audit of cross-platform information exchanges, DPDP consent checks, and mTLS security validations."
        actions={
          <Button variant="outline" size="sm" onClick={loadLogs} icon={RefreshCw}>
            Refresh Telemetry
          </Button>
        }
      />

      {/* 2. REAL-TIME DATA PACKET SIMULATION BANNER (SECTION 16) */}
      <Card padding="md" variant="highlight" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-gov-700" />
            <h4 className="text-xs font-bold text-slate-900 font-serif">
              Live Gateway Pipeline Stream
            </h4>
          </div>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
            mTLS Handshakes Active (240ms)
          </span>
        </div>

        {/* Animated Visual Pipeline */}
        <div className="p-4 bg-white/90 border border-slate-200 rounded-2xl flex items-center justify-between text-xs overflow-x-auto gap-4">
          <div className="flex items-center space-x-2 text-slate-800 flex-shrink-0 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Citizen Request</span>
          </div>

          <div className="flex-1 h-0.5 bg-slate-200 relative min-w-[80px]">
            <div className="absolute top-1/2 -translate-y-1/2 left-1/3 w-3 h-3 rounded-full bg-gov-600 animate-pulse"></div>
          </div>

          <div className="px-3 py-1.5 bg-gov-950 text-white rounded-xl text-[11px] font-bold font-serif flex-shrink-0 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-gov-300" />
            <span>SAMAVAY Gateway</span>
          </div>

          <div className="flex-1 h-0.5 bg-slate-200 relative min-w-[80px]">
            <div className="absolute top-1/2 -translate-y-1/2 left-2/3 w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></div>
          </div>

          <div className="flex items-center space-x-2 text-slate-800 flex-shrink-0 font-semibold">
            <Server className="w-4 h-4 text-gov-700" />
            <span>Sovereign Registry Verified</span>
          </div>
        </div>
      </Card>

      {/* 3. FILTER AND SEARCH BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-card flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Request ID, platform, or category..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'SUCCESS', 'FAILED', 'CONSENT_REQUIRED'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedStatus === st
                  ? 'bg-gov-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'All Exchanges' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* 4. EXCHANGE LOGS DATA TABLE */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">Request ID & Timestamp</th>
                <th className="py-3.5 px-4">Source Platform</th>
                <th className="py-3.5 px-4">Destination Platform</th>
                <th className="py-3.5 px-4">Data Category</th>
                <th className="py-3.5 px-4">Response Time</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className="hover:bg-slate-50/80 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                      <div>{log.requestId}</div>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{log.sourcePlatformName}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{log.destinationPlatformName}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono">
                        {log.dataCategory}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600">{log.responseTimeMs}ms</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={log.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-gov-700 hover:text-gov-900 font-bold text-xs">
                        Details →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No data exchange logs found matching query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 5. SLIDE-OVER VERIFICATION INSPECTOR DRAWER */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-end p-0">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Exchange Audit Telemetry
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    {selectedLog.requestId}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-600">Verification Outcome:</span>
                <StatusBadge status={selectedLog.status} size="sm" />
              </div>

              {/* Exchange Details Grid */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500">Source Platform:</span>
                  <span className="font-bold text-slate-800">{selectedLog.sourcePlatformName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500">Destination Platform:</span>
                  <span className="font-bold text-slate-800">{selectedLog.destinationPlatformName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500">Data Category:</span>
                  <span className="font-mono text-slate-800">{selectedLog.dataCategory}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500">Round-trip Latency:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedLog.responseTimeMs}ms</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500">DPDP Consent Verified:</span>
                  <span className="font-bold text-emerald-700">
                    {selectedLog.consentVerified ? '✓ Valid Token Attached' : 'Not Required / Public'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 py-2">
                  <span className="text-slate-500">Exchange Summary:</span>
                  <span className="font-mono text-[11px] text-slate-800 truncate max-w-[240px]">
                    {selectedLog.responseSummary || 'Verified by Sovereign Registry'}
                  </span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => setSelectedLog(null)}
              fullWidth
            >
              Close Inspector
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
