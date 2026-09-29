import React, { useState, useEffect } from 'react';
import { alertApi } from '../../services/api';
import { SystemAlert } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Check,
  Eye,
  RefreshCw,
  Server,
  ShieldCheck
} from 'lucide-react';

export const AdminAlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadAlerts = async () => {
    setIsLoading(true);
    try {
      const data = await alertApi.getAll();
      setAlerts(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleReview = async (id: number) => {
    await alertApi.review(id);
    await loadAlerts();
  };

  const handleResolve = async (id: number) => {
    await alertApi.resolve(id);
    await loadAlerts();
  };

  const filteredAlerts = alerts.filter((a) => {
    if (selectedStatus === 'ALL') return true;
    return a.status.toUpperCase() === selectedStatus;
  });

  const getPriorityBadge = (p: string) => {
    switch (p.toUpperCase()) {
      case 'CRITICAL':
        return <span className="bg-rose-100 text-rose-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-rose-200">CRITICAL</span>;
      case 'HIGH':
        return <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-amber-200">HIGH</span>;
      case 'MEDIUM':
        return <span className="bg-saffron-100 text-saffron-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-saffron-200">MEDIUM</span>;
      default:
        return <span className="bg-stone-100 text-stone-700 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-stone-200">LOW</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="OPERATIONAL INCIDENT MANAGEMENT & TELEMETRY"
        categoryIcon={Bell}
        title="Admin Alert Center"
        description="Monitor and resolve cross-platform connectivity incidents, latency spikes, and automatic failover notices across sovereign nodes."
        actions={
          <Button variant="outline" size="sm" onClick={loadAlerts} icon={RefreshCw}>
            Refresh Alerts
          </Button>
        }
      />

      {/* 2. FILTER TABS */}
      <div className="flex items-center gap-2">
        {['ALL', 'ACTIVE', 'REVIEWED', 'RESOLVED'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedStatus === st
                ? 'bg-gov-700 text-white shadow-xs font-bold'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {st === 'ALL' ? `All Alerts (${alerts.length})` : `${st.charAt(0) + st.slice(1).toLowerCase()} (${alerts.filter(a => a.status.toUpperCase() === st).length})`}
          </button>
        ))}
      </div>

      {/* 3. ALERTS LIST */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => {
            const isCritical = alert.priority === 'CRITICAL' || alert.priority === 'HIGH';

            return (
              <Card
                key={alert.id}
                padding="md"
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 ${
                  isCritical ? 'border-amber-300 ring-2 ring-amber-100' : 'border-stone-200'
                }`}
              >
                <div className="flex items-start space-x-3.5 text-xs">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      alert.status === 'RESOLVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : isCritical
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-saffron-100 text-saffron-800'
                    }`}
                  >
                    {alert.status === 'RESOLVED' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {getPriorityBadge(alert.priority)}
                      <span className="text-[10px] font-bold text-gov-800 bg-gov-50 px-2 py-0.5 rounded-full border border-gov-200">
                        {alert.relatedPlatformName || 'Interoperability Mesh'}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {new Date(alert.createdAt).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <h4 className="font-bold text-stone-900 font-serif text-sm">{alert.title}</h4>
                    <p className="text-stone-600 text-xs leading-relaxed max-w-2xl">{alert.message}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-center">
                  {alert.status === 'ACTIVE' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReview(alert.id)}
                        icon={Eye}
                      >
                        Acknowledge
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleResolve(alert.id)}
                        icon={Check}
                      >
                        Resolve
                      </Button>
                    </>
                  )}

                  {alert.status === 'REVIEWED' && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleResolve(alert.id)}
                      icon={Check}
                    >
                      Mark Resolved
                    </Button>
                  )}

                  {alert.status === 'RESOLVED' && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Resolved
                    </span>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <EmptyState
            title="All Systems Operating Normally"
            description="No active operational incidents or latency bottlenecks reported."
            actionIcon={ShieldCheck}
          />
        )}
      </div>
    </div>
  );
};
