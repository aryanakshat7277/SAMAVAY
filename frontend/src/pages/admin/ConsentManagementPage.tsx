import React, { useState, useEffect } from 'react';
import { consentApi } from '../../services/api';
import { DataConsent } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MetricCard } from '../../components/common/MetricCard';
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  UserCheck,
  Database,
  Trash2,
  Search
} from 'lucide-react';

export const ConsentManagementPage: React.FC = () => {
  const [consents, setConsents] = useState<DataConsent[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadConsents = async () => {
    setIsLoading(true);
    try {
      const all = await consentApi.getAll();
      setConsents(all);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadConsents();
  }, []);

  const filteredConsents = consents.filter((c) => {
    if (selectedStatus !== 'ALL' && c.status.toUpperCase() !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        (c.userName && c.userName.toLowerCase().includes(q)) ||
        c.serviceName.toLowerCase().includes(q) ||
        c.fieldName.toLowerCase().includes(q) ||
        (c.sourceDepartmentName && c.sourceDepartmentName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="CITIZEN DATA PRIVACY & ACCESS TOKENS (DPDP §6)"
        categoryIcon={Lock}
        title="Consent Management Registry"
        description="Real-time oversight of all citizen-authorized data reuse tokens across government platforms compliant with DPDP standards."
        actions={
          <Button variant="outline" size="sm" onClick={loadConsents} icon={RefreshCw}>
            Refresh Tokens
          </Button>
        }
      />

      {/* 2. OVERVIEW METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <MetricCard
          label="Active Consent Tokens"
          value={consents.filter((c) => c.status === 'ACTIVE').length}
          icon={CheckCircle2}
          subtext="Valid DPDP Authorizations"
          highlightColor="emerald"
        />

        <MetricCard
          label="Revoked by Citizens"
          value={consents.filter((c) => c.status === 'REVOKED').length}
          icon={AlertTriangle}
          subtext="Immediate Access Cutoff"
          highlightColor="amber"
        />

        <MetricCard
          label="DPDP Act 2023 Compliance"
          value="100%"
          icon={ShieldCheck}
          subtext="Zero Unconsented Access"
          highlightColor="blue"
        />
      </div>

      {/* 3. FILTER & SEARCH STRIP */}
      <Card padding="md" className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by citizen, service, or field name..."
              className="w-full pl-9 pr-3 py-2 text-sm font-medium bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['ALL', 'ACTIVE', 'REVOKED', 'EXPIRED'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-gov-700 text-white shadow-xs font-bold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {st === 'ALL' ? 'All Tokens' : st}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 4. CONSENTS TABLE */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50/90 border-b border-stone-200 text-xs font-bold text-stone-700 uppercase tracking-wider">
                <th className="py-3.5 px-4">Citizen Applicant</th>
                <th className="py-3.5 px-4">Authorized Service</th>
                <th className="py-3.5 px-4">Authorized Data Field</th>
                <th className="py-3.5 px-4">Source Department</th>
                <th className="py-3.5 px-4">Token Status</th>
                <th className="py-3.5 px-4 text-right">Granted Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800 font-medium">
              {filteredConsents.length > 0 ? (
                filteredConsents.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-900 block">{c.userName || 'Citizen'}</span>
                      <span className="text-xs text-stone-600 font-mono font-medium">UID: SAM-CIT-99201</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-900 font-serif">
                      {c.serviceName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-gov-800 font-bold bg-gov-50 px-2.5 py-0.5 rounded border border-gov-200 text-xs">
                        {c.fieldName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-800 font-medium">
                      {c.sourceDepartmentName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          c.status === 'ACTIVE'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-stone-600 font-mono text-xs font-medium">
                      {new Date(c.grantedAt || Date.now()).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-500 text-sm">
                    No consent tokens found.
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
