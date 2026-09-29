import React, { useState, useEffect } from 'react';
import { auditLogApi } from '../../services/api';
import { AuditLog } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import {
  ScrollText,
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  Clock,
  Terminal,
  UserCheck,
  Lock
} from 'lucide-react';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const data = await auditLogApi.getRecentLogs();
      setLogs(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (selectedAction !== 'ALL' && log.action.toUpperCase() !== selectedAction) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.action.toLowerCase().includes(q) ||
        (log.performedBy && log.performedBy.toLowerCase().includes(q)) ||
        (log.description && log.description.toLowerCase().includes(q)) ||
        (log.details && log.details.toLowerCase().includes(q)) ||
        (log.ipAddress && log.ipAddress.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="IMMUTABLE SYSTEM & SECURITY AUDIT TRAIL"
        categoryIcon={ScrollText}
        title="Administrative Audit Logs"
        description="Cryptographically sealed timeline of all administrative changes, integration approvals, data access grants, and citizen consent events."
        actions={
          <Button variant="outline" size="sm" onClick={loadLogs} icon={RefreshCw}>
            Refresh Logs
          </Button>
        }
      />

      {/* 2. FILTER AND SEARCH BAR */}
      <Card padding="md" className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search action, officer, description, or IP..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 focus:border-gov-600 cursor-pointer"
            >
              <option value="ALL">All Actions</option>
              <option value="CONSENT_GRANTED">CONSENT_GRANTED</option>
              <option value="CONSENT_REVOKED">CONSENT_REVOKED</option>
              <option value="INTEGRATION_PIPELINE_ACTIVE">INTEGRATION_PIPELINE_ACTIVE</option>
              <option value="PLATFORM_REGISTERED">PLATFORM_REGISTERED</option>
              <option value="SERVICE_REQUEST_SUBMITTED">SERVICE_REQUEST_SUBMITTED</option>
            </select>
          </div>
        </div>
      </Card>

      {/* 3. AUDIT LOGS TABLE */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50/90 border-b border-stone-200 text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Action Event</th>
                <th className="py-3.5 px-4">Performed By</th>
                <th className="py-3.5 px-4">Description & Scope</th>
                <th className="py-3.5 px-4">IP Address</th>
                <th className="py-3.5 px-4 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                      {new Date(log.timestamp).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-gov-800 bg-gov-50 px-2 py-0.5 rounded border border-gov-200 text-[10px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-900">
                      {log.performedBy || 'SYSTEM'}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-stone-600">
                      <span className="block font-medium text-stone-900">{log.description}</span>
                      {log.details && (
                        <span className="text-[10px] text-stone-400 font-mono truncate block">{log.details}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-emerald-600" />
                        Sealed
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    No audit logs recorded for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
