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
  Search, X, TrendingUp, SlidersHorizontal, ArrowRight
} from 'lucide-react';

// ── Category definitions (same keys as original) ───────────────────────────────
const categories = [
  { key: 'ALL',       label: 'All Services',  icon: Layers,        color: 'text-stone-500'   },
  { key: 'MUNICIPAL', label: 'Municipal',     icon: Building2,     color: 'text-gov-700'     },
  { key: 'TRANSPORT', label: 'Transport',     icon: Car,           color: 'text-gov-600'     },
  { key: 'REVENUE',   label: 'Revenue & Land',icon: Landmark,      color: 'text-saffron-700' },
  { key: 'HEALTH',    label: 'Health',        icon: HeartPulse,    color: 'text-rose-700'    },
  { key: 'EDUCATION', label: 'Education',     icon: GraduationCap, color: 'text-gov-600'     },
  { key: 'WELFARE',   label: 'Social Welfare',icon: HandHeart,     color: 'text-saffron-600' },
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
    <span className="font-black text-white text-xl font-mono leading-none">{val}</span>
    <span className="text-gov-400 text-[10px] font-medium">{label}</span>
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
    <div className="min-h-screen bg-sandstone-100">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — dark sovereign panel
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative bg-gov-950 overflow-hidden">
        {/* Atmospheric layers */}
        <div className="absolute inset-0 bg-gov-grid opacity-30" />
        <div className="absolute inset-0 bg-gov-radial" />
        {/* Saffron glow arc — decorative */}
        <div
          className="absolute -top-32 -right-40 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.07) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">

          {/* Badge */}
          <div className={`flex justify-center transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-gov-200 text-[10px] font-bold px-3.5 py-1.5 rounded-full mb-5">
              <Compass className="w-3 h-3" />
              UNIFIED GOVERNMENT DIRECTORY
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse ml-1" />
            </div>
          </div>

          {/* Headline */}
          <div className={`text-center space-y-3 transition-all duration-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif leading-tight tracking-tight">
              Find Government{' '}
              <span className="text-saffron-400 relative inline-block">
                Services
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-saffron-500/40 rounded-full" />
              </span>
            </h1>
            <p className="text-gov-300 text-sm max-w-xl mx-auto leading-relaxed">
              All state and central government services in one place — with{' '}
              <strong className="text-saffron-400 font-bold">62% automated data verification</strong>{' '}
              so you never upload the same document twice.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 pt-6">
            <StatBubble val={services.length || '—'} label="Services Available" delay={200} />
            <div className="w-px bg-white/10 self-stretch" />
            <StatBubble val={departments.length || '—'} label="Departments Connected" delay={350} />
            <div className="w-px bg-white/10 self-stretch" />
            <StatBubble val="62%" label="Auto-Verified Data" delay={500} />
          </div>

          {/* Hero search bar */}
          <div className="mt-7 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-1.5 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-saffron-400 transition-all duration-300 group">
              <div className="pl-3.5 flex items-center pointer-events-none text-stone-400 group-focus-within:text-gov-700 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, departments, keywords (e.g. Property Tax, Driving Licence...)"
                className="w-full px-3 py-2.5 bg-transparent text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
              />
              {/* Live count pill in search */}
              {!searchQuery && services.length > 0 && (
                <span className="hidden sm:flex items-center gap-1 text-[10px] text-stone-500 font-medium pr-2 whitespace-nowrap flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {services.length} services available
                </span>
              )}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl mr-0.5 hover:bg-stone-100 transition flex-shrink-0"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category tabs — flush to bottom of hero, lift into sandstone */}
          <div className="mt-7 -mb-px flex items-end gap-1 overflow-x-auto pb-0 hide-scrollbar">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-[11px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 border-b-2 ${
                    isSelected
                      ? 'bg-sandstone-100 border-sandstone-100 text-stone-800 shadow-[0_-6px_14px_rgba(0,0,0,0.18)]'
                      : 'bg-white/10 border-transparent text-gov-300 hover:bg-white/18 hover:text-white'
                  }`}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                    isSelected ? cat.color : 'text-current opacity-70'
                  }`} />
                  {cat.label}
                  {isSelected && (
                    <span className="ml-0.5 px-1.5 py-0.5 bg-gov-100 text-gov-700 rounded-full text-[9px] font-black">
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
            <div className="flex items-center gap-1.5 text-xs text-stone-500">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <span>
                Showing{' '}
                <span className="font-black text-stone-900 tabular-nums">{filteredServices.length}</span>
                {' '}of{' '}
                <span className="font-semibold text-stone-700 tabular-nums">{services.length}</span>
                {' '}services
              </span>
            </div>
            {selectedCategory !== 'ALL' && (
              <span className="inline-flex items-center gap-1 bg-gov-50 border border-gov-200 text-gov-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <activeCat.icon className="w-2.5 h-2.5" />
                {activeCat.label}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-saffron-50 border border-saffron-200 text-saffron-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <Search className="w-2.5 h-2.5" />
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-saffron-600 ml-0.5">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            )}
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2">
            {(searchQuery || selectedCategory !== 'ALL' || popularOnly) && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); setPopularOnly(false); }}
                className="text-[11px] text-stone-400 hover:text-stone-700 font-medium transition flex items-center gap-1 hover:underline"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}
            {/* Popular toggle pill */}
            <button
              onClick={() => setPopularOnly(!popularOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                popularOnly
                  ? 'bg-saffron-100 text-saffron-800 border-saffron-300 shadow-sm'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:border-saffron-300 shadow-xs'
              }`}
            >
              <TrendingUp className={`w-3.5 h-3.5 transition-all duration-200 ${
                popularOnly ? 'text-saffron-600 scale-110' : 'text-stone-400'
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
