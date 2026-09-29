import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { servicesApi, departmentsApi } from '../../services/api';
import { GovernmentService, Department } from '../../types';
import { ServiceCard } from '../../components/services/ServiceCard';
import { ServiceApplyModal } from '../../components/services/ServiceApplyModal';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Compass, Filter, Building2, Car, Landmark,
  HeartPulse, GraduationCap, HandHeart, Layers, HelpCircle, CheckCircle2,
  Search, X, TrendingUp, SlidersHorizontal, ArrowRight,
  Sprout, ShoppingBag, HardHat, Coins, Baby, Zap
} from 'lucide-react';

// ── Category definitions (all 12 sovereign ministries) ───────────────────────────────
const categories = [
  { key: 'ALL',           label: 'All Services',             icon: Layers,        color: 'text-stone-500'   },
  { key: 'MUNICIPAL',     label: 'Municipal',                 icon: Building2,     color: 'text-gov-700'     },
  { key: 'TRANSPORT',     label: 'Transport & SARATHI',       icon: Car,           color: 'text-gov-600'     },
  { key: 'REVENUE',       label: 'Revenue & Land (Bhoomi)',  icon: Landmark,      color: 'text-saffron-700' },
  { key: 'HEALTH',        label: 'Health & PM-JAY',           icon: HeartPulse,    color: 'text-rose-700'    },
  { key: 'EDUCATION',     label: 'Education & Grants',        icon: GraduationCap, color: 'text-gov-600'     },
  { key: 'WELFARE',       label: 'Social Welfare',            icon: HandHeart,     color: 'text-saffron-600' },
  { key: 'AGRICULTURE',   label: 'Agriculture & Krishi',      icon: Sprout,        color: 'text-emerald-700' },
  { key: 'FOOD_SUPPLIES', label: 'Food & Ration (NFSA)',      icon: ShoppingBag,   color: 'text-amber-700'   },
  { key: 'LABOUR',        label: 'Labour & e-Shram',          icon: HardHat,       color: 'text-blue-700'    },
  { key: 'FINANCE',       label: 'Finance & Taxes',           icon: Coins,         color: 'text-yellow-700'  },
  { key: 'WOMEN_CHILD',   label: 'Women & Child',             icon: Baby,          color: 'text-pink-700'    },
  { key: 'POWER',         label: 'Power & Solar (Surya Ghar)',icon: Zap,           color: 'text-orange-700'  },
];

// ── Skeleton card ──────────────────────────────────────────────────────────────
const SkeletonCard: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <div
    className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3.5 animate-pulse"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <div className="h-3.5 bg-stone-200 rounded-lg w-2/3" />
      <div className="h-5 w-12 bg-stone-100 rounded-full" />
    </div>
    <div className="h-2.5 bg-stone-100 rounded-lg w-1/3" />
    <div className="space-y-2 pt-1">
      <div className="h-2.5 bg-stone-100 rounded-lg w-full" />
      <div className="h-2.5 bg-stone-100 rounded-lg w-4/5" />
    </div>
    <div className="flex gap-2 pt-1">
      <div className="h-6 bg-stone-100 rounded-xl w-16" />
      <div className="h-6 bg-stone-100 rounded-xl w-20" />
    </div>
    <div className="h-9 bg-stone-200 rounded-xl w-full" />
  </div>
);

// ── Animated stat bubble ───────────────────────────────────────────────────────
const StatBubble: React.FC<{ val: string | number; label: string; delay: number }> = ({ val, label, delay }) => (
  <div
    className="flex flex-col items-center gap-0.5 opacity-0 animate-slide-up-fade"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
  >
    <span className="font-black text-slate-900 text-2xl font-mono leading-none">{val}</span>
    <span className="text-slate-700 text-xs sm:text-sm font-semibold">{label}</span>
  </div>
);

export const ServicesDirectoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  const initialQuery    = searchParams.get('q') || '';

  // ── State (identical to original) ─────────────────────────────────────────
  const [services,         setServices]         = useState<GovernmentService[]>([]);
  const [departments,      setDepartments]      = useState<Department[]>([]);
  const [searchQuery,      setSearchQuery]      = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [popularOnly,      setPopularOnly]      = useState<boolean>(false);
  const [isLoading,        setIsLoading]        = useState<boolean>(false);
  const [mounted,          setMounted]          = useState(false);

  const [selectedService,  setSelectedService]  = useState<GovernmentService | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // ── Data fetch (identical to original) ────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [allSvcs, allDepts] = await Promise.all([
          servicesApi.getAll(),
          departmentsApi.getAll()
        ]);
        setServices(allSvcs);
        setDepartments(allDepts);
      } finally {
        setIsLoading(false);
        setMounted(true);
      }
    };
    load();
  }, []);

  // ── Filter logic (identical to original) ──────────────────────────────────
  const filteredServices = services.filter((svc) => {
    if (selectedCategory !== 'ALL' && svc.category.toUpperCase() !== selectedCategory.toUpperCase()) return false;
    if (popularOnly && !svc.isPopular) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return svc.name.toLowerCase().includes(q)
          || svc.description.toLowerCase().includes(q)
          || svc.departmentName.toLowerCase().includes(q)
          || svc.code.toLowerCase().includes(q);
    }
    return true;
  });

  // ── Modal handler (identical to original) ─────────────────────────────────
  const handleOpenApply = (service: GovernmentService) => {
    setSelectedService(service);
    setIsApplyModalOpen(true);
  };

  const activeCat = categories.find(c => c.key === selectedCategory) ?? categories[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — Sovereign Light Panel
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-gradient-to-b from-[#F7F4EE] via-[#FAF8F5] to-white border-b-2 border-stone-200/90 overflow-hidden">
        {/* Tricolor Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />
        
        {/* Atmospheric grid layer */}
        <div className="absolute inset-0 bg-gov-grid opacity-15 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-0">

          {/* Badge */}
          <div className={`flex justify-center transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              UNIFIED GOVERNMENT SERVICES DIRECTORY
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse ml-1" />
            </div>
          </div>

          {/* Headline */}
          <div className={`text-center space-y-3 transition-all duration-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-serif leading-tight tracking-tight">
              Find Government{' '}
              <span className="text-saffron-800 relative inline-block">
                Services
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-saffron-500 rounded-full" />
              </span>
            </h1>
            <p className="text-slate-700 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
              All state and central government services in one place — with{' '}
              <strong className="text-saffron-800 font-bold">62% automated data verification</strong>{' '}
              so you never upload the same document twice.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 pt-5">
            <StatBubble val={services.length || '—'} label="Services Available" delay={200} />
            <div className="w-px bg-stone-300 self-stretch" />
            <StatBubble val={departments.length || '—'} label="Departments Connected" delay={350} />
            <div className="w-px bg-stone-300 self-stretch" />
            <StatBubble val="62%" label="Auto-Verified Data" delay={500} />
          </div>

          {/* Hero search bar */}
          <div className="mt-7 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-md border-2 border-stone-300 p-1.5 ring-0 focus-within:border-gov-600 focus-within:ring-2 focus-within:ring-gov-100 transition-all duration-200 group">
              <div className="pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-gov-700 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, departments, keywords (e.g. Property Tax, Driving Licence, PM-KISAN...)"
                className="w-full px-3 py-2.5 bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
              />
              {/* Live count pill in search */}
              {!searchQuery && services.length > 0 && (
                <span className="hidden sm:flex items-center gap-1.5 text-sm text-slate-700 font-semibold pr-3 whitespace-nowrap flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {services.length} services available
                </span>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl mr-0.5 hover:bg-slate-100 transition flex-shrink-0 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category tabs — flush to bottom of hero */}
          <div className="mt-7 -mb-px flex items-end gap-1.5 overflow-x-auto pb-0 hide-scrollbar">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 border-b-2 ${
                    isSelected
                      ? 'bg-white border-b-2 border-gov-700 text-gov-900 shadow-xs'
                      : 'bg-stone-100/90 border-b-2 border-transparent text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isSelected ? cat.color : 'text-current opacity-80'
                  }`} />
                  {cat.label}
                  {isSelected && (
                    <span className="ml-1 px-2 py-0.5 bg-gov-100 text-gov-800 rounded-full text-xs font-black">
                      {filteredServices.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTENT AREA
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">

        {/* Results toolbar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Left: live counter + active filter badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              <span>
                Showing{' '}
                <span className="font-black text-slate-950 tabular-nums">{filteredServices.length}</span>
                {' '}of{' '}
                <span className="font-bold text-slate-800 tabular-nums">{services.length}</span>
                {' '}services
              </span>
            </div>
            {selectedCategory !== 'ALL' && (
              <span className="inline-flex items-center gap-1 bg-gov-50 border border-gov-300 text-gov-900 px-2.5 py-1 rounded-full text-xs font-bold">
                <activeCat.icon className="w-3 h-3" />
                {activeCat.label}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-saffron-50 border border-saffron-300 text-saffron-900 px-2.5 py-1 rounded-full text-xs font-bold">
                <Search className="w-3 h-3" />
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-saffron-700 ml-1">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2">
            {(searchQuery || selectedCategory !== 'ALL' || popularOnly) && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); setPopularOnly(false); }}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold transition flex items-center gap-1 hover:underline cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Clear all
              </button>
            )}
            {/* Popular toggle pill */}
            <button
              onClick={() => setPopularOnly(!popularOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                popularOnly
                  ? 'bg-saffron-100 text-saffron-900 border-saffron-400 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-saffron-400 shadow-xs'
              }`}
            >
              <TrendingUp className={`w-3.5 h-3.5 transition-all duration-200 ${
                popularOnly ? 'text-saffron-700 scale-110' : 'text-slate-500'
              }`} />
              Popular Only
            </button>
          </div>
        </div>

        {/* ── Services Grid ── */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} delay={i * 80} />
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service, i) => (
              <div
                key={service.id}
                className="animate-stagger-in"
                style={{
                  animationDelay: `${Math.min(i * 50, 500)}ms`,
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                <ServiceCard
                  service={service}
                  onApply={() => handleOpenApply(service)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8">
            <EmptyState
              title="No Matching Services Found"
              description="We couldn't find any services matching your search or filters. Try adjusting your keywords or clearing the category filter."
              actionText="Reset Filters"
              onAction={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setPopularOnly(false);
              }}
              actionIcon={Filter}
            />
          </div>
        )}

        {/* Bottom CTA strip */}
        {!isLoading && filteredServices.length > 0 && (
          <div className="flex items-center justify-center pt-2 pb-4">
            <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-gov-700" />
              Can't find what you need?{' '}
              <button
                onClick={() => searchInputRef.current?.focus()}
                className="text-gov-700 font-bold hover:underline flex items-center gap-0.5"
              >
                Try a different search <ArrowRight className="w-3 h-3 inline" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Apply Modal (identical to original) ─────────────────────────── */}
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
