import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Landmark,
  Building2,
  Car,
  HeartPulse,
  GraduationCap,
  HandHeart,
  ArrowRight,
  ShieldCheck,
  Search,
  CheckCircle2,
  Layers,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  Users,
  Server,
  Zap,
  Check,
  Lock,
  Network
} from 'lucide-react';
import { servicesApi, departmentsApi } from '../../services/api';
import { GovernmentService, Department } from '../../types';
import { Button } from '../../components/common/Button';
import { ServiceCard } from '../../components/services/ServiceCard';
import { ServiceApplyModal } from '../../components/services/ServiceApplyModal';
import { InteroperabilityHeroGraphic } from '../../components/common/InteroperabilityHeroGraphic';
import { ScrollStorytellingSection } from '../../components/common/ScrollStorytellingSection';
import { AnimatedCounter, CategoryVisualGrid, NationalInteroperabilityShowcase, InteractiveMinimizationPlayground } from '../../components/visual';
import heroCitizenImg from '../../assets/hero_citizen_dpi.jpg';
import dpiDataFlowImg from '../../assets/dpi_data_flow.jpg';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [popularServices, setPopularServices] = useState<GovernmentService[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<GovernmentService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroViewMode, setHeroViewMode] = useState<'visual' | 'mesh'>('visual');

  useEffect(() => {
    const fetchData = async () => {
      const allServices = await servicesApi.getAll();
      setPopularServices(allServices.filter((s) => s.isPopular).slice(0, 6));
      const allDepts = await departmentsApi.getAll();
      setDepartments(allDepts);
    };
    fetchData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/services');
    }
  };

  const handleOpenApply = (service: GovernmentService) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gov-50/70 via-white to-[#F8FAFC] pt-12 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Main Headline & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-gov-100/90 border border-gov-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-gov-900 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Smart India Hackathon 2026 • Problem ID SIH26129</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-serif">
                One Connected Experience for <br className="hidden sm:inline" />
                <span className="text-gov-800">Government Services.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <strong>SAMAVAY</strong> unites state and central digital platforms to eliminate duplicate document uploads, auto-verify citizen details, and deliver a smooth, unified service experience for every Indian citizen.
              </p>

              {/* Quick Search Bar */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto lg:mx-0 relative flex items-center shadow-card bg-white rounded-2xl border border-slate-300/80 p-1.5 focus-within:ring-2 focus-within:ring-gov-600 focus-within:border-transparent transition">
                <div className="pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services (e.g., Property Tax, Driving Licence, Land Mutation...)"
                  className="w-full px-3 py-2.5 bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold shadow-xs transition flex-shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </form>

              {/* Quick CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link to="/services">
                  <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right">
                    Explore All Services
                  </Button>
                </Link>
                <Link to="/how-samavay-works">
                  <Button variant="outline" size="md" icon={Sparkles}>
                    How SAMAVAY Works
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  DPDP Act 2023 Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-gov-700" />
                  mTLS PKI_X509 Security
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gov-700" />
                  Authoritative Data Reuse
                </span>
              </div>
            </div>

            {/* Right Col: Interactive Visual Hero Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Toggle Switch */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl mb-3 shadow-2xs self-center">
                <button
                  type="button"
                  onClick={() => setHeroViewMode('visual')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    heroViewMode === 'visual'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Citizen Experience
                </button>
                <button
                  type="button"
                  onClick={() => setHeroViewMode('mesh')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    heroViewMode === 'mesh'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Network className="w-3.5 h-3.5" />
                  <span>Network Mesh</span>
                </button>
              </div>

              {heroViewMode === 'visual' ? (
                <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-card border border-slate-200/90 bg-white group">
                  <img
                    src={heroCitizenImg}
                    alt="Indian citizens accessing unified public services through SAMAVAY"
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-800">DigiLocker & Aadhaar Verified</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-[11px]">DPDP Act 2023 Compliant</span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-300">62% Form Work Saved</span>
                  </div>
                </div>
              ) : (
                <InteroperabilityHeroGraphic />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE DPI METRICS TICKER WITH ANIMATED COUNTERS */}
      <section className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-gov-800 font-mono tracking-tight">
                <AnimatedCounter end={62} suffix="%" />
              </span>
              <p className="text-xs font-semibold text-stone-800">Information Reused</p>
              <p className="text-[10px] text-stone-500">Zero duplicate citizen entry</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-mono tracking-tight">
                4 ➔ 1
              </span>
              <p className="text-xs font-semibold text-stone-800">Touchpoints Unified</p>
              <p className="text-[10px] text-stone-500">From 4 portals to 1 journey</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-mono tracking-tight">
                <AnimatedCounter end={98.4} decimals={1} suffix="%" />
              </span>
              <p className="text-xs font-semibold text-stone-800">Integration Reliability</p>
              <p className="text-[10px] text-stone-500">Across 8 connected nodes</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-mono tracking-tight">
                <AnimatedCounter end={1.66} decimals={2} prefix="" suffix="M+" />
              </span>
              <p className="text-xs font-semibold text-stone-800">Transactions Handled</p>
              <p className="text-[10px] text-stone-500">Autonomous mTLS pipeline</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SCROLL STORYTELLING COMPARISON (SECTION 6) */}
      <ScrollStorytellingSection />

      {/* 4. 4-STEP HOW IT WORKS SECTION WITH VISUAL DPI ARCHITECTURE */}
      <section className="bg-white border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gov-800 bg-gov-50 border border-gov-200 px-3 py-1 rounded-full inline-block">
              SIMPLE 4-STEP JOURNEY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              How You Access Services in SAMAVAY
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Zero paper photocopies, zero repeated form filling — powered by national sovereign data exchange.
            </p>
          </div>

          {/* Visual Architecture Concept Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50/50 max-w-4xl mx-auto">
            <img
              src={dpiDataFlowImg}
              alt="SAMAVAY Interoperability Architecture: Citizen 1-Click Consent connecting official pillars to instant certificate delivery"
              className="w-full h-auto object-cover max-h-[380px]"
            />
            <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Sovereign Data Highway
              </span>
              <span className="text-[11px] text-slate-500 text-center sm:text-right">
                1-Click Consent ➔ Official Department Lookups (Revenue, VAHAN, Municipal) ➔ Instant Digital Delivery
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 hover:shadow-card transition">
              <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs">
                01
              </span>
              <h4 className="text-sm font-bold text-stone-900 font-serif">Find a Service</h4>
              <p className="text-stone-600 leading-relaxed">
                Search or browse public services with clear eligibility and processing timelines.
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 hover:shadow-card transition">
              <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs">
                02
              </span>
              <h4 className="text-sm font-bold text-stone-900 font-serif">SAMAVAY Prepares</h4>
              <p className="text-stone-600 leading-relaxed">
                The engine queries authoritative databases to verify available records in real time.
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 hover:shadow-card transition">
              <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs">
                03
              </span>
              <h4 className="text-sm font-bold text-stone-900 font-serif">Review & Consent</h4>
              <p className="text-stone-600 leading-relaxed">
                Grant explicit, purpose-bound permission to reuse existing government records under DPDP Act.
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 hover:shadow-card transition">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                04
              </span>
              <h4 className="text-sm font-bold text-stone-900 font-serif">Track & Complete</h4>
              <p className="text-stone-600 leading-relaxed">
                Monitor status in real time and receive digital certificates directly in your account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. INTERACTIVE FORM MINIMIZATION & INTEROPERABILITY PLAYGROUND */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveMinimizationPlayground />
      </section>

      {/* 5. POPULAR SERVICES GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gov-800 bg-gov-50 border border-gov-200 px-3 py-1 rounded-full inline-block">
              POPULAR CITIZEN SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Frequently Requested Services
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              High-volume public services pre-configured with cross-department data pipelines.
            </p>
          </div>
          <Link to="/services" className="text-xs font-bold text-gov-800 hover:text-gov-900 inline-flex items-center gap-1">
            View All Services ({popularServices.length}+) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onApply={() => handleOpenApply(service)}
            />
          ))}
        </div>
      </section>

      {/* 6. GRAPHICAL CATEGORIES EXPLORER */}
      <section className="bg-white border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gov-800 bg-gov-50 border border-gov-200 px-3 py-1 rounded-full inline-block">
              EXPLORE BY PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              Interconnected Government Portfolios
            </h2>
            <p className="text-xs text-stone-600">
              Select a domain to explore automated services and cross-department data integrations.
            </p>
          </div>

          <CategoryVisualGrid />
        </div>
      </section>

      {/* 7. INTERACTIVE DPI SIMULATION SHOWCASE */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NationalInteroperabilityShowcase />
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gov-900 to-gov-800 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-gov-lg relative overflow-hidden border border-gov-700">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black font-serif">
              Access Government Services More Simply
            </h2>
            <p className="text-xs sm:text-sm text-gov-100 leading-relaxed">
              Experience the future of Indian Digital Public Infrastructure. No duplicate forms, no manual queues, and complete privacy transparency.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/services">
              <Button variant="primary" size="lg" className="bg-white text-gov-950 hover:bg-stone-100 border-none font-bold shadow-gov">
                Explore Government Services
              </Button>
            </Link>
            <Link to="/admin/control-center">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 font-bold">
                Admin Control Center
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Apply Modal */}
      {selectedService && (
        <ServiceApplyModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
};
