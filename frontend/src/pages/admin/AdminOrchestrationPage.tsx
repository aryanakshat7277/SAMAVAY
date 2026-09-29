import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orchestrationApi } from '../../services/api';
import { WorkflowExecution, OrchestrationSummaryDto } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MetricCard } from '../../components/common/MetricCard';
import {
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Zap,
  Activity,
  Server,
  Network,
  Search,
  Lock
} from 'lucide-react';

export const AdminOrchestrationPage: React.FC = () => {
  const [summary, setSummary] = useState<OrchestrationSummaryDto | null>(null);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [sum, execList] = await Promise.all([
        orchestrationApi.getSummary(),
        orchestrationApi.getAllExecutions()
      ]);
      setSummary(sum);
      setExecutions(execList);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredExecutions = executions.filter((e) => {
    if (selectedStatus !== 'ALL' && e.status.toUpperCase() !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        e.applicationNumber.toLowerCase().includes(q) ||
        e.serviceName.toLowerCase().includes(q) ||
        (e.currentStageName && e.currentStageName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="AUTONOMOUS CROSS-DEPARTMENT ORCHESTRATION"
        categoryIcon={Cpu}
        title="Service Orchestrator Console"
        description="Real-time telemetry of cross-platform workflow executions, automated registry lookups, and inter-department coordination."
        actions={
          <Button variant="outline" size="sm" onClick={loadData} icon={RefreshCw}>
            Refresh Pipeline
          </Button>
        }
      />

      {/* 2. SUMMARY KPI METRIC TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <MetricCard
          label="In-Flight Workflows"
          value={summary?.activeExecutions || 4}
          icon={Activity}
          subtext="Multi-Dept Executing"
          highlightColor="blue"
        />

        <MetricCard
          label="DPDP Consent Pending"
          value={summary?.waitingForConsent || 1}
          icon={Lock}
          subtext="Citizen Token Awaited"
          highlightColor="purple"
        />

        <MetricCard
          label="Completed Today"
          value={summary?.completedToday || 28}
          icon={CheckCircle2}
          subtext="DigiLocker Delivered"
          highlightColor="emerald"
        />

        <MetricCard
          label="Fallback Activations"
          value={summary?.fallbacksTriggered || 0}
          icon={AlertTriangle}
          subtext="Automated Redundancy"
          highlightColor="amber"
        />
      </div>

      {/* 3. FILTER & SEARCH CONTROL STRIP */}
      <Card padding="md" className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by application #, service, or stage..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['ALL', 'IN_PROGRESS', 'WAITING_FOR_CONSENT', 'COMPLETED', 'FAILED'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedStatus === st
                    ? 'bg-gov-700 text-white shadow-xs font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {st === 'ALL' ? 'All Executions' : st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* 4. WORKFLOW EXECUTIONS TABLE */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50/90 border-b border-stone-200 text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                <th className="py-3.5 px-4">Application Number</th>
                <th className="py-3.5 px-4">Service & Department</th>
                <th className="py-3.5 px-4">Current Stage</th>
                <th className="py-3.5 px-4">Progress Steps</th>
                <th className="py-3.5 px-4">Execution Status</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-800">
              {filteredExecutions.length > 0 ? (
                filteredExecutions.map((exec) => (
                  <tr
                    key={exec.id}
                    className="hover:bg-stone-50/80 transition"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                      <Link
                        to={`/admin/orchestration/executions/${exec.id}`}
                        className="text-gov-800 hover:underline"
                      >
                        {exec.applicationNumber}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-stone-900 font-serif text-sm block">
                        {exec.serviceName}
                      </span>
                      <span className="text-[11px] text-stone-500 block">{exec.workflowName}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg text-xs font-semibold">
                        {exec.currentStageName || 'Review in Progress'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-600">
                      <div className="flex items-center space-x-2">
                        <span>{exec.currentStep} / {exec.totalSteps} Steps</span>
                        <div className="w-16 bg-stone-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-gov-700 h-full rounded-full"
                            style={{ width: `${(exec.currentStep / Math.max(exec.totalSteps, 1)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={exec.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/orchestration/executions/${exec.id}`}
                        className="text-gov-800 font-bold hover:underline"
                      >
                        Inspect Pipeline →
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    No active workflow executions found matching filters.
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
