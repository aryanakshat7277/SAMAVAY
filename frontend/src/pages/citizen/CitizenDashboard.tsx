import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { servicesApi, departmentsApi, requestsApi, platformsApi, orchestrationApi } from '../../services/api';
import { GovernmentService, Department, ServiceRequest, GovernmentPlatform, ServiceAction } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AnimatedMilestoneTracker } from '../../components/visual/AnimatedMilestoneTracker';
import { ConnectedPlatformsWidget } from '../../components/dashboard/ConnectedPlatformsWidget';
import { ServiceApplyModal } from '../../components/services/ServiceApplyModal';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Compass,
  FileText,
  Search,
  Bell,
  HelpCircle,
  Clock,
  ArrowRight,
  Layers,
  CheckCircle2,
  AlertCircle,
  Lock,
  ShieldCheck,
  AlertTriangle,
  Building2,
  ExternalLink,
  ShieldAlert,
  Zap,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [platforms, setPlatforms] = useState<GovernmentPlatform[]>([]);
  const [actions, setActions] = useState<ServiceAction[]>([]);
  const [trackInput, setTrackInput] = useState('');
  const [selectedService, setSelectedService] = useState<GovernmentService | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      const depts = await departmentsApi.getAll();
      setDepartments(depts);
      const userReqs = await requestsApi.getByUser(user?.id || 1);
      setRequests(userReqs);
      const plats = await platformsApi.getAll();
      setPlatforms(plats);
      const citizenActs = await orchestrationApi.getCitizenActions(user?.id || 1);
      setActions(citizenActs);
    };
    loadDashboardData();
  }, [user]);

  const activeRequest = requests.find((r) => r.status === 'PROCESSING' || r.status === 'UNDER_REVIEW') || requests[0];
  const pendingAction = actions.find((a) => a.status === 'PENDING');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      navigate(`/applications?track=${encodeURIComponent(trackInput.trim())}`);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. TOP WELCOME SECTION */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-gov-800 bg-gov-50 px-2.5 py-0.5 rounded-full border border-gov-200 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-gov-700" />
              Verified Citizen Profile
            </span>
            <span className="text-xs text-stone-300">|</span>
            <span className="text-xs text-stone-500 font-mono">UID: SAM-CIT-99201</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {getGreeting()}, {user?.fullName || 'Citizen'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Manage your government services, authorizations, and applications from one unified place.
          </p>
        </div>

        {/* Quick Search & Application Track Form */}
        <form onSubmit={handleTrackSubmit} className="flex-shrink-0 w-full md:w-80">
          <label className="block text-xs font-semibold text-stone-700 mb-1.5">
            Track Any Application Instantly
          </label>
          <div className="relative flex items-center shadow-xs">
            <input
              type="text"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              placeholder="e.g. SAM-2026-10234"
              className="w-full pl-3.5 pr-20 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
            />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1.5 bg-gov-700 hover:bg-gov-800 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              Track
            </button>
          </div>
        </form>
      </div>

      {/* 2. ACTION REQUIRED BANNER */}
      {pendingAction && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                  Action Required
                </span>
                <h3 className="text-sm font-bold text-stone-900 font-serif">
                  {pendingAction.title}
                </h3>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                {pendingAction.description}
              </p>
            </div>
          </div>

          <Link
            to={pendingAction.actionUrl || '/dashboard/permissions'}
            className="flex-shrink-0"
          >
            <Button variant="primary" size="sm" className="bg-amber-700 hover:bg-amber-800 border-amber-800 text-white">
              Review Now →
            </Button>
          </Link>
        </div>
      )}

      {/* 3. QUICK ACTIONS SHORTCUTS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/services"
          className="p-5 bg-white border border-stone-200/90 rounded-2xl shadow-card hover:border-gov-400 hover:shadow-card-hover transition-all duration-200 flex items-center space-x-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-gov-50 group-hover:bg-gov-100 text-gov-700 flex items-center justify-center transition">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 group-hover:text-gov-800 transition font-serif">
              Explore Services
            </h4>
            <p className="text-[11px] text-stone-500">Discover 20+ government services</p>
          </div>
        </Link>

        <Link
          to="/applications"
          className="p-5 bg-white border border-stone-200/90 rounded-2xl shadow-card hover:border-gov-400 hover:shadow-card-hover transition-all duration-200 flex items-center space-x-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 transition font-serif">
              My Applications
            </h4>
            <p className="text-[11px] text-stone-500">Track progress & view history ({requests.length})</p>
          </div>
        </Link>

        <Link
          to="/dashboard/permissions"
          className="p-5 bg-white border border-stone-200/90 rounded-2xl shadow-card hover:border-gov-400 hover:shadow-card-hover transition-all duration-200 flex items-center space-x-3.5 group cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-purple-50 group-hover:bg-purple-100 text-purple-700 flex items-center justify-center transition">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 group-hover:text-purple-800 transition font-serif">
              Review Permissions
            </h4>
            <p className="text-[11px] text-stone-500">Manage DPDP data sharing</p>
          </div>
        </Link>
      </div>

      {/* 4. ACTIVE APPLICATIONS TRACKING */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Active Application Tracker */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Active Application Journey
              </h3>
              <p className="text-xs text-stone-500">Live multi-stage cross-department tracking</p>
            </div>
            <Link
              to="/applications"
              className="text-xs font-bold text-gov-800 hover:text-gov-900 inline-flex items-center gap-1"
            >
              <span>All Applications ({requests.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeRequest ? (
            <AnimatedMilestoneTracker
              applicationNumber={activeRequest.applicationNumber}
              serviceName={activeRequest.serviceName}
              currentStageName={activeRequest.currentStage}
              submittedAt={activeRequest.submittedAt}
            />
          ) : (
            <EmptyState
              title="No Applications Yet"
              description="You have not submitted any government service applications yet. Explore available services to get started."
              actionText="Explore Services"
              onAction={() => navigate('/services')}
              actionIcon={Compass}
            />
          )}

          {/* Quick List of Other Applications */}
          {requests.length > 1 && (
            <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-card space-y-3">
              <h4 className="text-xs font-bold text-stone-900 font-serif">
                Other Recent Applications
              </h4>
              <div className="space-y-2">
                {requests.slice(1, 4).map((req) => (
                  <div
                    key={req.id}
                    className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-stone-900">{req.serviceName}</span>
                      <span className="text-[11px] text-stone-500 block font-mono">{req.applicationNumber}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <StatusBadge status={req.status} size="sm" />
                      <Link
                        to={`/applications?track=${req.applicationNumber}`}
                        className="text-gov-800 font-bold hover:underline"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Connected Platforms Widget & Trust Box */}
        <div className="lg:col-span-4 space-y-6">
          {/* Meri Pehchan Sovereign Vault Card */}
          <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-card space-y-3.5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-gov-800 font-bold text-xs">
                  🇮🇳
                </div>
                <div>
                  <h4 className="font-bold font-serif text-stone-900 text-xs">
                    मेरी पहचान • Sovereign Identity Vault
                  </h4>
                  <span className="text-[10px] text-stone-500 font-mono">
                    Gov-Linked Records: 4 Active
                  </span>
                </div>
              </div>
              <span className="text-[9px] bg-blue-100 text-gov-800 font-bold px-2 py-0.5 rounded-full font-mono">
                VERIFIED
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {/* Aadhaar e-KYC */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🪪</span>
                  <div>
                    <span className="font-bold text-stone-800 block text-[11px]">Aadhaar e-KYC</span>
                    <span className="text-[10px] text-stone-400 font-mono">XXXX-XXXX-8821 (Biometric Linked)</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                </span>
              </div>

              {/* Bhoomi Land Record */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🌾</span>
                  <div>
                    <span className="font-bold text-stone-800 block text-[11px]">Bhoomi LRS Cadastral</span>
                    <span className="text-[10px] text-stone-400 font-mono">Plot #44/2A • Khata #8849</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                </span>
              </div>

              {/* SARATHI Transport */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🚗</span>
                  <div>
                    <span className="font-bold text-stone-800 block text-[11px]">SARATHI Driving Licence</span>
                    <span className="text-[10px] text-stone-400 font-mono">DL #KA-05-2018-00912 (LMV)</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                </span>
              </div>

              {/* DigiLocker Vault */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">📂</span>
                  <div>
                    <span className="font-bold text-stone-800 block text-[11px]">DigiLocker Ecosystem</span>
                    <span className="text-[10px] text-stone-400 font-mono">4 Issued Certificates Synced</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Synced
                </span>
              </div>
            </div>

            <Link
              to="/dashboard/permissions"
              className="block text-center py-2 px-3 bg-gov-50 hover:bg-gov-100 text-gov-800 font-bold text-[11px] rounded-xl border border-gov-200 transition"
            >
              Manage DPDP Consent & Vault Keys →
            </Link>
          </div>

          <ConnectedPlatformsWidget platforms={platforms} />

          {/* Privacy & DPI Assurance Card */}
          <div className="bg-gradient-to-br from-gov-900 to-gov-950 text-white rounded-3xl p-6 shadow-card space-y-3 text-xs border border-gov-800">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-saffron-400" />
              <h4 className="font-bold font-serif text-white text-sm">Sovereign Privacy Guarantee</h4>
            </div>
            <p className="text-stone-300 leading-relaxed text-[11px]">
              SAMAVAY strictly enforces the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>. Your data is accessed only when you authorize it, and records are verified without permanent retention.
            </p>
            <div className="pt-2">
              <Link
                to="/dashboard/permissions"
                className="text-saffron-300 hover:text-white font-bold inline-flex items-center gap-1 text-xs"
              >
                <span>Manage DPDP Authorizations</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Container */}
      {selectedService && (
        <ServiceApplyModal
          service={selectedService}
          isOpen={isApplyModalOpen}
          onClose={() => {
            setIsApplyModalOpen(false);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
};
