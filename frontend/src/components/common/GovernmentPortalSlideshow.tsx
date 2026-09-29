import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Landmark,
  FileCheck,
  Network,
  Users2
} from 'lucide-react';

import banner1 from '../../assets/gov_banner_1.jpg';
import banner2 from '../../assets/gov_banner_2.jpg';
import banner3 from '../../assets/gov_banner_3.jpg';
import banner4 from '../../assets/gov_banner_4.jpg';
import dpiDataFlowImg from '../../assets/dpi_data_flow.jpg';
import heroCitizenImg from '../../assets/hero_citizen_dpi.jpg';

export interface SlideData {
  id: number;
  image: string;
  categoryTag: string;
  categoryIcon: React.ElementType;
  title: string;
  subtitle: string;
  primaryAction: { label: string; path: string };
  secondaryAction?: { label: string; path: string };
  metricsBadge: { label: string; value: string };
}

const slides: SlideData[] = [
  {
    id: 1,
    image: banner1,
    categoryTag: 'DIGITAL PUBLIC INFRASTRUCTURE • DIGITAL INDIA',
    categoryIcon: Landmark,
    title: 'Empowering 1.4 Billion Citizens with One Connected Government',
    subtitle: 'Unifying Central and State departmental registries into an interoperable, sovereign mesh for instantaneous, paperless public service delivery.',
    primaryAction: { label: 'Explore All 58+ Services', path: '/services' },
    secondaryAction: { label: 'How SAMAVAY Works', path: '/how-samavay-works' },
    metricsBadge: { label: 'Connected Registries', value: '14 Active Nodes' }
  },
  {
    id: 2,
    image: banner2,
    categoryTag: 'PAPERLESS GOVERNANCE • DIGILOCKER VERIFIED',
    categoryIcon: FileCheck,
    title: '62% Form Minimization: Never Upload the Same Proof Twice',
    subtitle: 'Authoritative state registries pre-verify land titles, driving credentials, and demographic proofs with 1-click citizen consent under IT Act 2000.',
    primaryAction: { label: 'Apply for Services', path: '/services' },
    secondaryAction: { label: 'Track Applications', path: '/applications' },
    metricsBadge: { label: 'Paperwork Eliminated', value: '62.4% Avg' }
  },
  {
    id: 3,
    image: banner3,
    categoryTag: 'SOVEREIGN DATA HIGHWAY • DPDP ACT 2023',
    categoryIcon: ShieldCheck,
    title: 'Secure Cross-Department Mesh: Privacy First by Design',
    subtitle: 'Strict citizen consent architecture enforced via mTLS PKI_X509 cryptography and ISO-20022 compliance across all 28 States & 8 UTs.',
    primaryAction: { label: 'Manage Data Permissions', path: '/dashboard/permissions' },
    secondaryAction: { label: 'Platform Status', path: '/admin/platform-status' },
    metricsBadge: { label: 'Security Standard', value: 'DPDP §6 Compliant' }
  },
  {
    id: 4,
    image: banner4,
    categoryTag: 'DIRECT BENEFIT TRANSFER • FARMER WELFARE',
    categoryIcon: CheckCircle2,
    title: 'Farmer Welfare & PM-KISAN Instant Benefit Clearance',
    subtitle: 'Direct DBT subsidy transfers directly to Aadhaar-seeded bank accounts with instant Bhoomi land holding title verification in under 2.4 seconds.',
    primaryAction: { label: 'View Welfare Schemes', path: '/services' },
    secondaryAction: { label: 'Citizen Helpdesk', path: '/help' },
    metricsBadge: { label: 'Verification Latency', value: '< 2.4 Seconds' }
  },
  {
    id: 5,
    image: dpiDataFlowImg,
    categoryTag: 'INTEROPERABILITY PIPELINE • REVENUE & TRANSPORT',
    categoryIcon: Network,
    title: 'Direct Registry Interoperability: 1-Click to Instant Delivery',
    subtitle: 'Real-time orchestration pipeline securely verifying VAHAN vehicle records, Bhoomi land parcels, and Municipal property records simultaneously.',
    primaryAction: { label: 'View Architecture', path: '/how-samavay-works' },
    secondaryAction: { label: 'Open Control Center', path: '/admin/control-center' },
    metricsBadge: { label: 'Pipeline Speed', value: '1.8s Response' }
  },
  {
    id: 6,
    image: heroCitizenImg,
    categoryTag: 'INCLUSIVE CITIZEN ACCESS • BHARAT DPI',
    categoryIcon: Users2,
    title: 'Equitable Digital Public Services for Every Indian Citizen',
    subtitle: 'High-accessibility sovereign interface available across 22 scheduled languages with assisted kiosk integrations and zero technological barriers.',
    primaryAction: { label: 'Get Started Today', path: '/services' },
    secondaryAction: { label: 'Frequently Asked Questions', path: '/help' },
    metricsBadge: { label: 'Citizen Satisfaction', value: '99.4% SLA' }
  }
];

export const GovernmentPortalSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(nextSlide, 6500);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-xl border-2 border-stone-200/90 bg-white group select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="Government Public Services Highlights Slideshow"
      role="region"
    >
      {/* Tricolor Sovereign Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-30 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

      {/* Main Slide Carousel Track */}
      <div className="relative h-[440px] sm:h-[480px] lg:h-[510px] w-full overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const TagIcon = slide.categoryIcon;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Slide Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-[6500ms] ease-out scale-100 group-hover:scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Light Sovereign Gradient Overlay for Crisp Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/30 sm:bg-gradient-to-r sm:from-white/98 sm:via-white/92 sm:to-white/20" />

              {/* Slide Foreground Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end sm:justify-center p-6 sm:p-12 lg:p-16 max-w-3xl">
                <div className="space-y-4">
                  {/* Category Pill with Icon */}
                  <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-2xs backdrop-blur-sm">
                    <TagIcon className="w-3.5 h-3.5 text-amber-700" />
                    <span>{slide.categoryTag}</span>
                  </div>

                  {/* Slide Title */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-serif tracking-tight leading-[1.2]">
                    {slide.title}
                  </h2>

                  {/* Slide Description */}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl font-medium">
                    {slide.subtitle}
                  </p>

                  {/* Actions & Metrics Row */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      to={slide.primaryAction.path}
                      className="px-5 py-2.5 bg-gradient-to-r from-gov-700 to-gov-800 hover:from-gov-800 hover:to-gov-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <span>{slide.primaryAction.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {slide.secondaryAction && (
                      <Link
                        to={slide.secondaryAction.path}
                        className="px-4 py-2.5 bg-white hover:bg-stone-50 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl border border-stone-300 shadow-2xs transition-all cursor-pointer"
                      >
                        {slide.secondaryAction.label}
                      </Link>
                    )}

                    {/* Sovereign Metric Badge */}
                    <div className="hidden md:flex items-center gap-2 pl-3 border-l border-stone-300 text-xs sm:text-sm">
                      <span className="text-slate-600 font-medium">{slide.metricsBadge.label}:</span>
                      <span className="font-mono font-bold text-gov-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 shadow-2xs">
                        {slide.metricsBadge.value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Side Carousel Navigation Arrows (visible on hover) */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white border border-stone-200/90 shadow-md text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
          title="Previous slide"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white border border-stone-200/90 shadow-md text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
          title="Next slide"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="absolute bottom-4 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        {/* Slide Indicators / Tabs */}
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-stone-200/90 shadow-md">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? 'w-8 bg-amber-600'
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
              title={`Go to slide ${idx + 1}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}

          {/* Slide Counter */}
          <span className="text-xs font-mono font-bold text-slate-700 ml-1.5">
            0{currentSlide + 1} / 0{totalSlides}
          </span>
        </div>

        {/* Carousel Controls: Prev / Pause / Next */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-stone-200/90 shadow-md text-slate-700">
          <button
            onClick={prevSlide}
            className="p-1.5 rounded-full hover:bg-stone-100 text-slate-700 hover:text-slate-950 transition cursor-pointer"
            title="Previous slide"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full hover:bg-stone-100 text-slate-700 hover:text-slate-950 transition cursor-pointer"
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={nextSlide}
            className="p-1.5 rounded-full hover:bg-stone-100 text-slate-700 hover:text-slate-950 transition cursor-pointer"
            title="Next slide"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
