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
  Compass,
  ExternalLink,
  Users,
  Server,
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
import { GovernmentPortalSlideshow } from '../../components/common/GovernmentPortalSlideshow';
import { OfficialNoticeTicker } from '../../components/common/OfficialNoticeTicker';
import { NationalEmblem } from '../../components/common/NationalEmblem';
import { CitizenQuickUtilityHub } from '../../components/common/CitizenQuickUtilityHub';
import { CitizenCredentialsCard } from '../../components/common/CitizenCredentialsCard';
import { AnimatedCounter, CategoryVisualGrid, NationalInteroperabilityShowcase, InteractiveMinimizationPlayground } from '../../components/visual';
import { DpiVisualSlideshow } from '../../components/common/DpiVisualSlideshow';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [popularServices, setPopularServices] = useState<GovernmentService[]>([]);
  const [totalServicesCount, setTotalServicesCount] = useState<number>(38);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<GovernmentService | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroViewMode, setHeroViewMode] = useState<'visual' | 'mesh'>('visual');

  useEffect(() => {
    const fetchData = async () => {
      const allServices = await servicesApi.getAll();
      setPopularServices(allServices.filter((s) => s.isPopular).slice(0, 9));
      setTotalServicesCount(allServices.length);
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
      {/* Official Government Announcements Ticker */}
      <OfficialNoticeTicker />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/90 via-gov-50/30 to-[#F8FAFC] pt-12 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Col: Main Headline & Actions */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-gov-100/90 border border-gov-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-gov-900 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>राष्ट्रीय डिजिटल सार्वजनिक अवसंरचना • National Digital Public Infrastructure</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-serif">
                One Connected Experience for <br className="hidden sm:inline" />
                <span className="text-gov-800">Government Services.</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
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
                  className="w-full px-3 py-2.5 bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-sm font-bold shadow-xs transition flex-shrink-0 cursor-pointer"
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
                  <Button variant="outline" size="md" icon={Compass}>
                    How SAMAVAY Works
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-600 font-semibold">
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

            {/* Right Col: Interactive Visual Hero Showcase (Expanded & Prominent) */}
            <div className="lg:col-span-6 flex flex-col items-center w-full">
              <div className="w-full max-w-2xl bg-white p-4 sm:p-6 lg:p-7 rounded-3xl border-2 border-slate-200/90 shadow-card text-slate-900 relative">
                {/* Tricolor Ribbon on Bezel */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20] rounded-t-3xl" />

                {/* Bezel Header & Toggle Switch */}
                <div className="flex flex-wrap items-center justify-between pb-3.5 mb-3.5 border-b border-slate-200/80 pt-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs sm:text-[13px] font-bold font-serif tracking-wider text-slate-800 uppercase">
                      राष्ट्रीय नागरिक वॉल्ट • DPI GATEWAY
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setHeroViewMode('visual')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-[13px] font-bold transition-all cursor-pointer ${
                        heroViewMode === 'visual'
                          ? 'bg-gov-800 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Citizen Credentials
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroViewMode('mesh')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        heroViewMode === 'mesh'
                          ? 'bg-gov-800 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Network className="w-4 h-4" />
                      <span>Interoperability Grid</span>
                    </button>
                  </div>
                </div>

                {heroViewMode === 'visual' ? (
                  <CitizenCredentialsCard />
                ) : (
                  <InteroperabilityHeroGraphic />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OFFICIAL NATIONAL DIGITAL PUBLIC INFRASTRUCTURE SLIDESHOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-saffron-500 animate-pulse" />
            <h3 className="text-xs sm:text-sm font-bold font-serif uppercase tracking-widest text-slate-800">
              राष्ट्रीय डिजिटल सार्वजनिक अवसंरचना • National DPI Spotlight
            </h3>
          </div>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
            Government of India Initiative • DPDP Act 2023 Governed
          </span>
        </div>
        <GovernmentPortalSlideshow />
      </section>

      {/* 2.5. NATIONAL CITIZEN QUICK UTILITY HUB (TRACK, VERIFY, TELEMETRY, GRIEVANCE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <CitizenQuickUtilityHub />
      </section>

      {/* 3. LIVE DPI METRICS TICKER WITH ANIMATED COUNTERS */}
      <section className="bg-white border-y border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-gov-800 font-mono tracking-tight">
                <AnimatedCounter end={62} suffix="%" />
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900">Information Reused</p>
              <p className="text-sm text-slate-600 font-medium">Zero duplicate citizen entry</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-700 font-mono tracking-tight">
                4 ➔ 1
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900">Touchpoints Unified</p>
              <p className="text-sm text-slate-600 font-medium">From 4 portals to 1 journey</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-800 font-mono tracking-tight">
                <AnimatedCounter end={98.4} decimals={1} suffix="%" />
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900">Integration Reliability</p>
              <p className="text-sm text-slate-600 font-medium">Across 8 connected nodes</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-mono tracking-tight">
                <AnimatedCounter end={1.66} decimals={2} prefix="" suffix="M+" />
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900">Transactions Handled</p>
              <p className="text-sm text-slate-600 font-medium">Sovereign mTLS data gateway</p>
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
            <span className="text-xs font-bold uppercase tracking-wider text-gov-800 bg-gov-50 border border-gov-200 px-3.5 py-1 rounded-full inline-block">
              SIMPLE 4-STEP JOURNEY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              How You Access Services in SAMAVAY
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              Zero paper photocopies, zero repeated form filling — powered by national sovereign data exchange.
            </p>
          </div>

          {/* Interactive DPI Architecture & Workflow Slideshow */}
          <div className="max-w-5xl mx-auto">
            <DpiVisualSlideshow />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 hover:shadow-card transition">
              <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs">
                01
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif">Find a Service</h4>
              <p className="text-stone-700 text-sm leading-relaxed">
                Search or browse public services with clear eligibility and processing timelines.
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 hover:shadow-card transition">
              <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs">
                02
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif">SAMAVAY Prepares</h4>
              <p className="text-stone-700 text-sm leading-relaxed">
                The engine queries authoritative databases to verify available records in real time.
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 hover:shadow-card transition">
              <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs">
                03
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif">Review & Consent</h4>
              <p className="text-stone-700 text-sm leading-relaxed">
                Grant explicit, purpose-bound permission to reuse existing government records under DPDP Act.
              </p>
            </div>

            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2.5 hover:shadow-card transition">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                04
              </span>
              <h4 className="text-base font-bold text-stone-900 font-serif">Track & Complete</h4>
              <p className="text-stone-700 text-sm leading-relaxed">
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
            <span className="text-xs font-bold uppercase tracking-wider text-gov-800 bg-gov-50 border border-gov-200 px-3.5 py-1 rounded-full inline-block">
              POPULAR CITIZEN SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              Frequently Requested Services
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-medium">
              High-volume public services pre-configured with cross-department data pipelines.
            </p>
          </div>
          <Link to="/services" className="text-sm font-bold text-gov-800 hover:text-gov-900 inline-flex items-center gap-1">
            View All Services ({totalServicesCount}) →
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
            <span className="text-xs font-bold uppercase tracking-wider text-gov-800 bg-gov-50 border border-gov-200 px-3.5 py-1 rounded-full inline-block">
              EXPLORE BY PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              Interconnected Government Portfolios
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-medium">
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

      {/* 8. FINAL CALL TO ACTION — NATIONAL DPI CONSOLE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 text-slate-900 rounded-3xl p-8 sm:p-14 text-center space-y-7 shadow-card relative overflow-hidden border-2 border-stone-200/90">
          {/* Authentic Tricolor Sovereign Top Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

          {/* Ashoka Lion Subtle Watermark */}
          <div className="absolute right-4 -bottom-10 opacity-[0.04] pointer-events-none hidden sm:block">
            <NationalEmblem size="xl" variant="navy" />
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5 relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold text-amber-900 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>भारत सरकार • Sovereign DPI Mesh • DPDP Act 2023</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-serif text-slate-900 tracking-tight">
              Access Government Services More Simply
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto font-sans font-medium">
              Experience the future of Indian Digital Public Infrastructure. No duplicate forms, no manual queues, and complete statutory DPDP consent transparency across all 28 States and 8 Union Territories.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 relative z-10">
            <Link to="/services">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Explore All 58+ Sovereign Services
              </Button>
            </Link>
            <Link to="/admin/control-center">
              <Button variant="outline" size="lg" icon={ShieldCheck}>
                Admin & Evaluator Console
              </Button>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 border-t border-stone-200/90 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-700 font-semibold relative z-10">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              62% Paperwork Minimized
            </span>
            <span className="flex items-center gap-1.5 text-amber-900">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              DigiLocker & Aadhaar Linked
            </span>
            <span className="flex items-center gap-1.5 text-blue-900">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              IT Act 2000 Legal Validity
            </span>
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
