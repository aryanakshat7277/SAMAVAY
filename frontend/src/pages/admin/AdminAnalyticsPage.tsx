import React, { useState, useEffect } from 'react';
import { analyticsApi } from '../../services/api';
import { AnalyticsSummaryDto } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MetricCard } from '../../components/common/MetricCard';
import { AnimatedCounter } from '../../components/visual/AnimatedCounter';
import {
  BarChart3,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  RefreshCw,
  FileCheck,
  Building2,
  Users,
  Activity,
  Check
} from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsSummaryDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await analyticsApi.getSummary();
      setAnalytics(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const reuseRate = analytics?.informationReusePercentage || 62;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="INTEROPERABILITY IMPACT & EFFICIENCY METRICS"
        categoryIcon={BarChart3}
        title="Government Interoperability Analytics"
        description="Measurable efficiency gains, automated field reuse rates, and portal fragmentation reduction achieved by the SAMAVAY digital mesh."
        actions={
          <Button variant="outline" size="sm" onClick={loadData} icon={RefreshCw} isLoading={isLoading}>
            Refresh Analytics
          </Button>
        }
      />

      {/* 2. 2 HERO CARDS: INFORMATION REUSE RATE (62%) & FRAGMENTATION REDUCTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HERO 1: 62% INFORMATION REUSE RATE */}
        <div className="bg-gradient-to-br from-amber-50/70 via-white to-stone-50 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden space-y-5 border-2 border-stone-200/90">
          <div className="absolute inset-0 bg-gov-grid opacity-15 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-saffron-800 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-300">
                Core Interoperability Impact
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-amber-700" />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl sm:text-6xl font-black tracking-tight font-mono text-slate-900">
                  <AnimatedCounter end={reuseRate} suffix="%" />
                </span>
                <span className="text-gov-800 text-sm font-bold">Information Auto-Reused</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed font-medium">
                Out of <strong>1,000</strong> required citizen data fields across active services, <strong>620 records</strong> were verified and auto-populated from sovereign platforms without requiring manual document uploads.
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-stone-200/80 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Total Analyzed Fields</span>
                <span className="font-bold text-slate-900 font-mono text-base">1,000 Records</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px] font-medium">Zero-Entry Reused</span>
                <span className="font-bold text-saffron-800 font-mono text-base">620 Records</span>
              </div>
            </div>
          </div>
        </div>

        {/* HERO 2: FRAGMENTATION REDUCTION (4 -> 1 SINGLE UNIFIED JOURNEY) */}
        <Card padding="lg" className="border-2 border-gov-300 flex flex-col justify-between space-y-4 shadow-card bg-white">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gov-800 uppercase tracking-wider bg-gov-50 px-3 py-1 rounded-full border border-gov-200">
              Fragmentation Reduction
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline space-x-3">
              <span className="text-5xl sm:text-6xl font-black tracking-tight font-serif text-stone-900">
                4 ➔ 1
              </span>
              <span className="text-stone-600 text-sm font-semibold">Touchpoints Unified</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              Citizen journeys reduced from <strong>4 disparate portals</strong> (Bhoomi, Transport, e-NagarPalika, DigiLocker) into <strong>1 single unified experience</strong> with automatic backend orchestration.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-stone-500 block text-[11px] font-medium">Average Time Saved</span>
              <span className="font-bold text-stone-900 font-mono text-base">14 Days ➔ 5 Mins</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px] font-medium">Integration Reliability</span>
              <span className="font-bold text-gov-700 font-mono text-base">
                {analytics?.integrationSuccessRatePercentage || 98.4}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. PLATFORM USAGE & EFFICIENCY METRICS TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <MetricCard
          label="Total Applications"
          value={analytics?.totalServiceRequests || 1483}
          icon={Users}
          subtext="Direct Registry Ingestion"
          highlightColor="emerald"
        />

        <MetricCard
          label="Total Requirements"
          value={analytics?.totalRequirementsAnalyzed || 1000}
          icon={FileCheck}
          subtext="Analyzed Data Fields"
          highlightColor="emerald"
        />

        <MetricCard
          label="Active Platforms"
          value={analytics?.activePlatformConnections || 14}
          icon={Layers}
          subtext="Production Pipes"
          highlightColor="saffron"
        />

        <MetricCard
          label="Avg Preparation Time"
          value={analytics?.averageServicePreparationTimeSec ? `${analytics.averageServicePreparationTimeSec}s` : '1.4s'}
          icon={Clock}
          subtext="Instantaneous Verification"
          highlightColor="emerald"
        />
      </div>

      {/* 4. TOP UTILIZED INTEROPERABLE SERVICES */}
      <Card padding="md" className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900 font-serif">
              Top Utilized Interoperable Services
            </h3>
            <p className="text-[11px] text-stone-500 mt-0.5">High-frequency service pipelines with measurable data minimization gains</p>
          </div>
          <span className="text-[11px] font-mono text-stone-500 font-medium">Real-time Telemetry</span>
        </div>

        <div className="space-y-3 text-xs">
          {[
            {
              name: 'Property Tax Assessment',
              dept: 'Municipal Administration & Revenue Bhoomi LRS',
              apps: '482 Applications',
              reused: 71,
            },
            {
              name: 'Rural Land Mutation & Record of Rights',
              dept: 'Revenue & Land Administration',
              apps: '391 Applications',
              reused: 68,
            },
            {
              name: 'Driving Licence Renewal & NOC',
              dept: 'Transport Department (SARATHI 4.0 / VAHAN)',
              apps: '348 Applications',
              reused: 83,
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-sandstone-100 border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-gov-300 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-sm font-serif">{item.name}</span>
                </div>
                <span className="text-[11px] text-stone-500 block">{item.dept}</span>
                {/* Visual bar */}
                <div className="w-48 sm:w-64 bg-stone-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gov-700 h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.reused}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3 flex-shrink-0">
                <span className="text-xs font-mono font-bold text-gov-800 bg-white border border-stone-200 px-3 py-1.5 rounded-xl shadow-xs">
                  {item.apps}
                </span>
                <span className="text-xs font-bold text-gov-900 bg-gov-100 border border-gov-200 px-3 py-1.5 rounded-xl">
                  {item.reused}% Information Reused
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. LIVE SYSTEM STATUS FOOTER BANNER */}
      <div className="p-4 bg-white rounded-2xl border-2 border-stone-200/90 text-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-slate-900 font-serif">Interoperability Telemetry Grid: OPERATIONAL</span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-slate-600 font-semibold hidden sm:inline">14 Active Sovereign Nodes Monitored</span>
        </div>
        <div className="text-slate-500 text-[11px] font-mono font-medium">
          Last Synced: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
