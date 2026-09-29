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
  TrendingUp,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Car,
  FileCheck,
  Printer,
  Award,
  Pause,
  Play
} from 'lucide-react';
import { NationalEmblem } from '../../components/common/NationalEmblem';
import { OfficialNoticeTicker } from '../../components/common/OfficialNoticeTicker';
import { OfficialCertificateModal } from '../../components/applications/OfficialCertificateModal';
import banner1 from '../../assets/gov_banner_1.jpg';
import banner2 from '../../assets/gov_banner_2.jpg';
import banner3 from '../../assets/gov_banner_3.jpg';
import banner4 from '../../assets/gov_banner_4.jpg';

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

  const [dashboardSlide, setDashboardSlide] = useState(0);
  const [isSlidePlaying, setIsSlidePlaying] = useState(true);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [selectedDocRequest, setSelectedDocRequest] = useState<ServiceRequest | null>(null);
  const [docModalMode, setDocModalMode] = useState<'ACKNOWLEDGEMENT' | 'CERTIFICATE'>('ACKNOWLEDGEMENT');

  const handleOpenDocModal = (req: ServiceRequest, mode: 'ACKNOWLEDGEMENT' | 'CERTIFICATE') => {
    setSelectedDocRequest(req);
    setDocModalMode(mode);
    setDocModalOpen(true);
  };

  const dashboardBanners = [
    {
      title: 'Digital Public Infrastructure: 62% Paperwork Eliminated',
      subtitle: 'Authoritative state registries auto-populate verified citizen credentials with 1-click consent.',
      image: banner1,
      link: '/services',
      btnText: 'Explore 58+ Services',
      tag: 'INDIA STACK • DPI'
    },
    {
      title: 'DigiLocker Verified Instant Certificate Delivery',
      subtitle: 'Digitally signed certificates issued with full legal validity under IT Act 2000 Section 4 & 5.',
      image: banner2,
      link: '/applications',
      btnText: 'View My Documents',
      tag: 'DIGILOCKER • ZERO PAPER'
    },
    {
      title: 'Sovereign Interoperability Highway & Registry Mesh',
      subtitle: 'mTLS PKI encrypted connections unifying Transport, Revenue, and Municipal systems.',
      image: banner3,
      link: '/dashboard/permissions',
      btnText: 'Manage Permissions',
      tag: 'DPDP ACT 2023'
    },
    {
      title: 'Farmer Welfare & PM-KISAN Instant Benefit Transfers',
      subtitle: 'Direct benefits routed to Aadhaar-seeded accounts with automated land verification.',
      image: banner4,
      link: '/services',
      btnText: 'Check Eligibility',
      tag: 'DBT SCHEMES'
    }
  ];

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

  useEffect(() => {
    if (!isSlidePlaying) return;
    const timer = setInterval(() => {
      setDashboardSlide((prev) => (prev + 1) % dashboardBanners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isSlidePlaying, dashboardBanners.length]);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Official Government Live Announcements */}
      <OfficialNoticeTicker />

      {/* 1. TOP WELCOME SECTION WITH SOVEREIGN ACCENTS */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Ashoka Lion Subtle Watermark */}
        <div className="absolute right-6 -bottom-6 opacity-[0.04] pointer-events-none hidden lg:block">
          <NationalEmblem size="xl" variant="navy" />
        </div>

        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-gov-800 bg-gov-50 px-3 py-1 rounded-full border border-gov-200 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-gov-700" />
              Verified Citizen Profile
            </span>
            <span className="text-xs text-slate-300">|</span>
            <span className="text-xs text-slate-600 font-mono font-semibold">UID: SAM-CIT-99201</span>
            <span className="text-xs text-slate-300">|</span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Aadhaar e-KYC Seeded
            </span>
            <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> DigiLocker Linked
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            {getGreeting()}, {user?.fullName || 'Citizen'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Sovereign Citizen Access Portal. Access departmental registries, track service requests in real-time, and manage your statutory DPDP data sharing authorizations.
          </p>
        </div>

        {/* Quick Search & Application Track Form */}
        <form onSubmit={handleTrackSubmit} className="flex-shrink-0 w-full md:w-80 relative z-10">
          <label className="block text-xs font-bold text-slate-800 mb-1.5">
            Track Any Application Instantly
          </label>
          <div className="relative flex items-center shadow-xs">
            <input
              type="text"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              placeholder="e.g. SAM-2026-10234"
              className="w-full pl-3.5 pr-20 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
            />
            <button
              type="submit"
              className="absolute right-1 px-3.5 py-1.5 bg-gov-700 hover:bg-gov-800 text-white rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
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
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200 px-2.5 py-0.5 rounded">
                  Action Required
                </span>
                <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif">
                  {pendingAction.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium">
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
          <div className="w-12 h-12 rounded-xl bg-gov-50 group-hover:bg-gov-100 text-gov-700 flex items-center justify-center transition flex-shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900 group-hover:text-gov-800 transition font-serif">
              Explore Services
            </h4>
            <p className="text-xs text-stone-600 font-medium mt-0.5">Discover 58+ sovereign government services</p>
          </div>
        </Link>

        <Link
          to="/applications"
          className="p-5 bg-white border border-stone-200/90 rounded-2xl shadow-card hover:border-gov-400 hover:shadow-card-hover transition-all duration-200 flex items-center space-x-3.5 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition font-serif">
              My Applications
            </h4>
            <p className="text-xs text-stone-600 font-medium mt-0.5">Track progress & view history ({requests.length})</p>
          </div>
        </Link>

        <Link
          to="/dashboard/permissions"
          className="p-5 bg-white border border-stone-200/90 rounded-2xl shadow-card hover:border-gov-400 hover:shadow-card-hover transition-all duration-200 flex items-center space-x-3.5 group cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-100 text-purple-700 flex items-center justify-center transition flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900 group-hover:text-purple-800 transition font-serif">
              Review Permissions
            </h4>
            <p className="text-xs text-stone-600 font-medium mt-0.5">Manage DPDP data sharing</p>
          </div>
        </Link>
      </div>

      {/* 3.5. NATIONAL GOVERNMENT SCHEMES & DPI SPOTLIGHT CAROUSEL */}
      <div 
        className="relative rounded-3xl overflow-hidden shadow-card border-2 border-stone-200/90 bg-white group"
        onMouseEnter={() => setIsSlidePlaying(false)}
        onMouseLeave={() => setIsSlidePlaying(true)}
      >
        {/* Tricolor Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-1.5 z-30 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

        <div className="relative h-60 sm:h-64 w-full overflow-hidden">
          {dashboardBanners.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === dashboardSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent flex flex-col justify-center px-6 sm:px-12 max-w-2xl text-slate-900">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md mb-2 border border-amber-300 w-fit shadow-2xs">
                  {slide.tag}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold font-serif leading-snug text-slate-900 mb-1.5">
                  {slide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 mb-4 leading-relaxed font-sans font-medium">
                  {slide.subtitle}
                </p>
                <div>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                  >
                    <span>{slide.btnText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Arrows */}
          <button
            onClick={() => setDashboardSlide((prev) => (prev - 1 + dashboardBanners.length) % dashboardBanners.length)}
            aria-label="Previous Slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDashboardSlide((prev) => (prev + 1) % dashboardBanners.length)}
            aria-label="Next Slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 right-6 z-20 flex items-center space-x-1.5">
            {dashboardBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setDashboardSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === dashboardSlide ? 'w-6 bg-gov-700' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
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
            <div className="space-y-4">
              <AnimatedMilestoneTracker
                applicationNumber={activeRequest.applicationNumber}
                serviceName={activeRequest.serviceName}
                currentStageName={activeRequest.currentStage}
                submittedAt={activeRequest.submittedAt}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleOpenDocModal(activeRequest, activeRequest.status === 'COMPLETED' ? 'CERTIFICATE' : 'ACKNOWLEDGEMENT')}
                  className="px-3.5 py-1.5 bg-gov-50 hover:bg-gov-100 text-gov-900 border border-gov-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-gov-700" />
                  <span>{activeRequest.status === 'COMPLETED' ? 'View Sovereign Certificate' : 'Print Official Acknowledgement'}</span>
                </button>
              </div>
            </div>
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
                      <span className="font-bold text-stone-900 text-sm font-serif block">{req.serviceName}</span>
                      <span className="text-xs text-stone-600 block font-mono font-medium">{req.applicationNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <StatusBadge status={req.status} size="sm" />
                      <button
                        onClick={() => handleOpenDocModal(req, req.status === 'COMPLETED' ? 'CERTIFICATE' : 'ACKNOWLEDGEMENT')}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                        title={req.status === 'COMPLETED' ? 'View Certificate' : 'Print Acknowledgement'}
                      >
                        <Printer className="w-3.5 h-3.5 text-stone-700" />
                        <span>{req.status === 'COMPLETED' ? 'Certificate' : 'Receipt'}</span>
                      </button>
                      <Link
                        to={`/applications?track=${req.applicationNumber}`}
                        className="text-gov-800 font-bold hover:underline text-xs"
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
                <div className="w-8 h-8 rounded-xl bg-gov-50 border border-gov-200 flex items-center justify-center text-gov-800 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-gov-800" />
                </div>
                <div>
                  <h4 className="font-bold font-serif text-slate-900 text-sm">
                    मेरी पहचान • Sovereign Identity Vault
                  </h4>
                  <span className="text-xs text-slate-600 font-mono font-medium">
                    Gov-Linked Records: 4 Active
                  </span>
                </div>
              </div>
              <span className="text-xs bg-blue-100 text-gov-900 font-bold px-2.5 py-0.5 rounded-full font-mono">
                VERIFIED
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {/* Aadhaar e-KYC */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Aadhaar e-KYC</span>
                    <span className="text-xs text-slate-600 font-mono">XXXX-XXXX-8821 (Biometric Linked)</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                </span>
              </div>

              {/* Bhoomi Land Record */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Bhoomi LRS Cadastral</span>
                    <span className="text-xs text-slate-600 font-mono">Plot #44/2A • Khata #8849</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
                </span>
              </div>

              {/* SARATHI Transport */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">SARATHI Driving Licence</span>
                    <span className="text-xs text-slate-600 font-mono">DL #KA-05-2018-00912 (LMV)</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Active
                </span>
              </div>

              {/* DigiLocker Vault */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">DigiLocker Ecosystem</span>
                    <span className="text-xs text-slate-600 font-mono">4 Issued Certificates Synced</span>
                  </div>
                </div>
                <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Synced
                </span>
              </div>
            </div>

            <Link
              to="/dashboard/permissions"
              className="block text-center py-2.5 px-3 bg-gov-50 hover:bg-gov-100 text-gov-800 font-bold text-xs rounded-xl border border-gov-200 transition"
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
            <p className="text-slate-200 leading-relaxed text-xs font-normal">
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

      {/* Official Government Document & Certificate Modal */}
      {selectedDocRequest && (
        <OfficialCertificateModal
          isOpen={docModalOpen}
          onClose={() => {
            setDocModalOpen(false);
            setSelectedDocRequest(null);
          }}
          request={selectedDocRequest}
          mode={docModalMode}
        />
      )}
    </div>
  );
};
