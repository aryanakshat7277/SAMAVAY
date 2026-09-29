import React, { useState, useEffect } from 'react';
import { controlCenterApi, alertApi } from '../../services/api';
import { ControlCenterSummaryDto, SystemAlert } from '../../types';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import { MetricCard } from '../../components/common/MetricCard';
import { TelemetryRadarWidget } from '../../components/visual';
import { NationalEmblem } from '../../components/common/NationalEmblem';
import adminHighwayImg from '../../assets/gov_banner_3.jpg';
import dpiDataFlowImg from '../../assets/dpi_data_flow.jpg';
import banner2 from '../../assets/gov_banner_2.jpg';
import {
  LayoutDashboard,
  Server,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Cpu,
  RefreshCw,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  BarChart3,
  Sliders,
  Plus
} from 'lucide-react';

const adminTelemetrySlides = [
  {
    id: 1,
    tag: 'SOVEREIGN MESH ONLINE (14 NODES)',
    subtag: 'DPDP ACT 2023 GOVERNED',
    title: 'National Cross-Departmental Interoperability Pipeline',
    description: 'Centralized administrative telemetry monitoring mTLS encrypted peer-to-peer registry exchanges between Revenue, Transport, Municipal, Welfare, Health, Agriculture, Food, Labour, Finance, and Renewable Energy nodes across India.',
    image: adminHighwayImg,
    stat1: { label: 'Gateway Speed', value: '38ms Avg', color: 'text-emerald-700' },
    stat2: { label: 'Daily Transactions', value: '4.82M Req', color: 'text-amber-800' },
    stat3: { label: 'PKI Security', value: 'X.509 Active', color: 'text-slate-900' },
    primaryAction: { label: 'Platform Status', url: '/admin/platform-status' }
  },
  {
    id: 2,
    tag: 'DIRECT INTEROPERABILITY HIGHWAY',
    subtag: '1-CLICK CONSENT ARCHITECTURE',
    title: 'End-to-End Encrypted Registry Handshake Engine',
    description: 'Autonomous protocol engine executing ISO-20022 compliant data transformations, mapping citizen consent tokens directly into schema-validated payloads across Bhoomi, SARATHI, and VAHAN masters.',
    image: dpiDataFlowImg,
    stat1: { label: 'Latency SLA', value: '1.8s P99', color: 'text-emerald-700' },
    stat2: { label: 'Field Reduction', value: '62.4% Avg', color: 'text-amber-800' },
    stat3: { label: 'Encryption', value: 'TLS 1.3 mTLS', color: 'text-slate-900' },
    primaryAction: { label: 'Platform Status', url: '/admin/platform-status' }
  },
  {
    id: 3,
    tag: 'STATUTORY AUDIT & TRUST',
    subtag: 'ZERO DOCUMENT RE-UPLOAD',
    title: 'DigiLocker Cryptographic Certificate Issuance Ledger',
    description: 'Tamper-evident audit trail recording public service deliveries with SHA-256 verifiable signatures, ensuring complete citizen privacy and non-repudiation under IT Act 2000 Section 4 & 5.',
    image: banner2,
    stat1: { label: 'Issuance Speed', value: 'Instant', color: 'text-emerald-700' },
    stat2: { label: 'Audit Compliance', value: '100.0%', color: 'text-emerald-700' },
    stat3: { label: 'Consent Status', value: 'Revocable', color: 'text-slate-900' },
    primaryAction: { label: 'Platform Status', url: '/admin/platform-status' }
  }
];

export const AdminControlCenterPage: React.FC = () => {
  const [summary, setSummary] = useState<ControlCenterSummaryDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adminSlide, setAdminSlide] = useState(0);
  const [isAdminSlidePlaying, setIsAdminSlidePlaying] = useState(true);

  useEffect(() => {
    if (!isAdminSlidePlaying) return;
    const interval = setInterval(() => {
      setAdminSlide((prev) => (prev + 1) % adminTelemetrySlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAdminSlidePlaying]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await controlCenterApi.getSummary();
      setSummary(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReviewAlert = async (id: number) => {
    await alertApi.review(id);
    await loadData();
  };

  const handleResolveAlert = async (id: number) => {
    await alertApi.resolve(id);
    await loadData();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. STANDARDIZED PAGE HEADER (PART 11) */}
      <PageHeader
        category="SOVEREIGN DIGITAL INTEROPERABILITY CONTROL CENTER"
        categoryIcon={LayoutDashboard}
        title="National Gateway Control Center"
        description="Unified administrative command center managing cross-departmental platforms, gateway throughput, system health, and citizen workflow orchestration."
        actions={
          <>
            <Link to="/admin/demo">
              <Button variant="primary" size="sm" icon={Play}>
                Launch Simulation Console
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={loadData} icon={RefreshCw}>
              Refresh
            </Button>
          </>
        }
      />

      {/* 1.5 NATIONAL DPI COMMAND HIGHWAY INTERACTIVE TELEMETRY SLIDESHOW */}
      <div
        className="relative rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-card bg-gradient-to-br from-amber-50/70 via-white to-stone-50 text-slate-900 select-none group"
        onMouseEnter={() => setIsAdminSlidePlaying(false)}
        onMouseLeave={() => setIsAdminSlidePlaying(true)}
      >
        {/* Tricolor Sovereign Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-20 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

        {/* Dynamic Slide Background Image with Light Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {adminTelemetrySlides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === adminSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-15 filter saturate-100"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent" />
            </div>
          ))}
        </div>

        {/* Banner Content */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold font-mono shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {adminTelemetrySlides[adminSlide].tag}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold font-mono shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                {adminTelemetrySlides[adminSlide].subtag}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 tracking-tight">
              {adminTelemetrySlides[adminSlide].title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
              {adminTelemetrySlides[adminSlide].description}
            </p>

            {/* Slide Navigation Controls */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center gap-1 bg-white/90 border border-stone-200 rounded-full px-2 py-1 shadow-2xs">
                {adminTelemetrySlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setAdminSlide(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === adminSlide ? 'w-5 bg-gov-700' : 'w-1.5 bg-stone-300 hover:bg-stone-400'
                    }`}
                    title={`Slide ${i + 1}`}
                  />
                ))}
                <span className="text-[10px] font-mono font-bold text-slate-600 ml-1">
                  0{adminSlide + 1}/0{adminTelemetrySlides.length}
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white/90 border border-stone-200 rounded-full p-0.5 shadow-2xs text-slate-700">
                <button
                  onClick={() => setAdminSlide((prev) => (prev - 1 + adminTelemetrySlides.length) % adminTelemetrySlides.length)}
                  className="p-1 rounded-full hover:bg-stone-100 transition cursor-pointer"
                  title="Previous slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsAdminSlidePlaying(!isAdminSlidePlaying)}
                  className="p-1 rounded-full hover:bg-stone-100 transition cursor-pointer"
                  title={isAdminSlidePlaying ? 'Pause' : 'Play'}
                >
                  {isAdminSlidePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setAdminSlide((prev) => (prev + 1) % adminTelemetrySlides.length)}
                  className="p-1 rounded-full hover:bg-stone-100 transition cursor-pointer"
                  title="Next slide"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Actions Widget */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            <div className="bg-white border border-stone-200/90 p-4 rounded-2xl text-xs space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-600 font-semibold">{adminTelemetrySlides[adminSlide].stat1.label}:</span>
                <span className={`font-mono font-bold text-sm ${adminTelemetrySlides[adminSlide].stat1.color}`}>
                  {adminTelemetrySlides[adminSlide].stat1.value}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-600 font-semibold">{adminTelemetrySlides[adminSlide].stat2.label}:</span>
                <span className={`font-mono font-bold text-sm ${adminTelemetrySlides[adminSlide].stat2.color}`}>
                  {adminTelemetrySlides[adminSlide].stat2.value}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-600 font-semibold">{adminTelemetrySlides[adminSlide].stat3.label}:</span>
                <span className={`font-mono font-bold text-sm ${adminTelemetrySlides[adminSlide].stat3.color}`}>
                  {adminTelemetrySlides[adminSlide].stat3.value}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/admin/platform-status" className="flex-1">
                <Button variant="primary" size="sm" icon={Activity} className="w-full justify-center">
                  Platform Status
                </Button>
              </Link>
              <Link to="/admin/analytics" className="flex-1">
                <Button variant="outline" size="sm" icon={BarChart3} className="w-full justify-center">
                  Analytics
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SYSTEM OVERVIEW METRIC TILES (PART 12) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <MetricCard
          label="Departments"
          value={summary?.totalDepartments || 12}
          icon={Building2}
          subtext="100% Interconnected"
          highlightColor="blue"
        />

        <MetricCard
          label="Platforms"
          value={summary?.registeredPlatforms || 14}
          icon={Server}
          subtext="State & Central DPI"
          highlightColor="blue"
        />

        <MetricCard
          label="Active Integrations"
          value={summary?.activeIntegrations || 14}
          icon={Layers}
          subtext="mTLS PKI_X509 Secured"
          highlightColor="emerald"
        />

        <MetricCard
          label="Service Workflows"
          value={summary?.activeWorkflows || 8}
          icon={Cpu}
          subtext="Automated Orchestrations"
          highlightColor="purple"
        />
      </div>

      {/* 2.5 LIVE MESH RADAR & EVENT STREAM */}
      <TelemetryRadarWidget />

      {/* 3. CURRENT SYSTEM HEALTH TELEMETRY */}
      <Card padding="md" className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-gov-700" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
              Current Platform Health Telemetry
            </h3>
          </div>
          <span className="text-xs text-slate-600 font-mono font-medium">Statutory Health Engine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Healthy Platforms</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono">
                {summary?.healthyPlatformsCount || 7} Platforms
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
            </div>
          </div>

          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Requires Attention</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-mono">
                {summary?.attentionRequiredCount || 1} Platform
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-6 h-6 text-amber-700" />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Unavailable</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-700 font-mono">
                {summary?.unavailableCount || 0} Platforms
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>
      </Card>

      {/* 4. 2-COLUMN GRID: LIVE ACTIVITY FEED + ACTIVE ALERTS & IMPACT HIGHLIGHT (PART 12) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Live Activity Feed (System Events) */}
        <Card padding="md" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
              Live Interoperability System Events
            </h3>
            <Link to="/admin/monitoring" className="text-xs sm:text-sm text-gov-700 hover:text-gov-900 font-bold inline-flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm max-h-[340px] overflow-y-auto pr-1">
            {summary?.recentEvents && summary.recentEvents.length > 0 ? (
              summary.recentEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 bg-slate-50/80 border border-slate-200 rounded-xl flex items-center justify-between gap-3 hover:bg-slate-100/80 transition"
                >
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        evt.severity === 'WARNING'
                          ? 'bg-amber-500'
                          : evt.severity === 'ERROR'
                          ? 'bg-rose-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span className="font-semibold text-slate-800 truncate">{evt.message}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
                    {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-6 text-sm">No recent system events.</p>
            )}
          </div>
        </Card>

        {/* Right Column: Active Alerts & Downstream Service Impact Highlight */}
        <div className="space-y-6">
          {/* Active Alerts */}
          <Card padding="md" className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                Active Operational Alerts ({summary?.activeAlerts?.length || 0})
              </h3>
              <Link to="/admin/alerts" className="text-xs sm:text-sm text-gov-700 hover:text-gov-900 font-bold inline-flex items-center">
                Alert Center <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              {summary?.activeAlerts && summary.activeAlerts.length > 0 ? (
                summary.activeAlerts.map((alt) => (
                  <div
                    key={alt.id}
                    className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                            {alt.priority}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">{alt.title}</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">{alt.message}</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2 border-t border-amber-200">
                      <button
                        onClick={() => handleReviewAlert(alt.id)}
                        className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold rounded-lg transition cursor-pointer"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => handleResolveAlert(alt.id)}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition cursor-pointer"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-500 space-y-1">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto" />
                  <p className="font-bold text-slate-800 text-sm sm:text-base">Everything Looks Good</p>
                  <p className="text-xs sm:text-sm text-slate-500">No active operational alerts at the moment.</p>
                </div>
              )}
            </div>
          </Card>

          {/* Downstream Service Impact Highlight Widget */}
          {summary?.serviceImpactHighlight && (
            <div className="bg-gov-50/80 border border-gov-300 rounded-2xl p-5 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gov-800 bg-white border border-gov-200 px-2.5 py-0.5 rounded">
                  Departmental Dependency Mapping
                </span>
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded">
                  Platform Requires Attention
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 font-serif text-sm sm:text-base">{summary.serviceImpactHighlight.platformName}</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  Latency elevated to 1.8s. <strong>{summary.serviceImpactHighlight.impactedServicesCount} citizen service(s)</strong> evaluated with automatic failovers standby.
                </p>
              </div>

              <Link
                to="/admin/platform-status"
                className="text-gov-800 font-bold hover:underline inline-flex items-center text-xs sm:text-sm"
              >
                Inspect Downstream Service Impact <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 5. QUICK ACTIONS BANNER (PART 12) */}
      <Card padding="md" className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
          Governance & Orchestration Quick Actions
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs sm:text-sm">
          <Link
            to="/admin/demo"
            className="p-4 bg-gov-50/80 hover:bg-gov-100/90 border border-gov-200 rounded-2xl text-center font-semibold text-gov-900 transition-all flex flex-col items-center space-y-2 hover:shadow-xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-gov-200/70 text-gov-800 flex items-center justify-center group-hover:scale-105 transition">
              <Play className="w-4.5 h-4.5 fill-current" />
            </div>
            <span className="font-bold">Simulation Console</span>
          </Link>

          <Link
            to="/admin/platforms"
            className="p-4 bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-2xl text-center font-semibold text-slate-800 transition-all flex flex-col items-center space-y-2 hover:shadow-xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center group-hover:scale-105 transition">
              <Plus className="w-4.5 h-4.5" />
            </div>
            <span className="font-bold">Register Platform</span>
          </Link>

          <Link
            to="/admin/integrations"
            className="p-4 bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-2xl text-center font-semibold text-slate-800 transition-all flex flex-col items-center space-y-2 hover:shadow-xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center group-hover:scale-105 transition">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <span className="font-bold">Manage Integrations</span>
          </Link>

          <Link
            to="/admin/platform-status"
            className="p-4 bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-2xl text-center font-semibold text-slate-800 transition-all flex flex-col items-center space-y-2 hover:shadow-xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center group-hover:scale-105 transition">
              <Activity className="w-4.5 h-4.5" />
            </div>
            <span className="font-bold">Platform Health</span>
          </Link>

          <Link
            to="/admin/analytics"
            className="p-4 bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-2xl text-center font-semibold text-slate-800 transition-all flex flex-col items-center space-y-2 hover:shadow-xs group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center group-hover:scale-105 transition">
              <BarChart3 className="w-4.5 h-4.5" />
            </div>
            <span className="font-bold">Interoperability Analytics</span>
          </Link>
        </div>
      </Card>
    </div>
  );
};
