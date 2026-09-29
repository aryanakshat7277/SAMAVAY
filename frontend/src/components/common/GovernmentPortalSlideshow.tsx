import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  Landmark,
  FileCheck
} from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';

import banner1 from '../../assets/gov_banner_1.jpg';
import banner2 from '../../assets/gov_banner_2.jpg';
import banner3 from '../../assets/gov_banner_3.jpg';
import banner4 from '../../assets/gov_banner_4.jpg';

interface SlideData {
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
    subtitle: 'Unifying Central and State government departmental registries into a sovereign, interoperable mesh for seamless public service delivery.',
    primaryAction: { label: 'Explore All Services', path: '/services' },
    secondaryAction: { label: 'How SAMAVAY Works', path: '/how-samavay-works' },
    metricsBadge: { label: 'Integrated Ministries', value: '32+ Entities' }
  },
  {
    id: 2,
    image: banner2,
    categoryTag: 'PAPERLESS GOVERNANCE • DIGILOCKER VERIFIED',
    categoryIcon: FileCheck,
    title: '62% Form Minimization: Never Upload the Same Document Twice',
    subtitle: 'Authoritative state registries pre-verify land titles, driving credentials, and demographic proofs with 1-click citizen consent.',
    primaryAction: { label: 'Apply for Services', path: '/services' },
    secondaryAction: { label: 'Track Applications', path: '/applications' },
    metricsBadge: { label: 'Paperwork Eliminated', value: '62.4% Avg' }
  },
  {
    id: 3,
    image: banner3,
    categoryTag: 'NATIONAL INTEROPERABILITY GRID • DPDP ACT 2023',
    categoryIcon: ShieldCheck,
    title: 'Sovereign Data Highway: Secure Cross-Department Exchange',
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
    subtitle: 'Direct DBT subsidy transfers directly to Aadhaar-seeded bank accounts with instant Bhoomi land holding title verification.',
    primaryAction: { label: 'View Welfare Schemes', path: '/services' },
    secondaryAction: { label: 'Citizen Helpdesk', path: '/help' },
    metricsBadge: { label: 'Verification Latency', value: '< 2.4 Seconds' }
  }
];

export const GovernmentPortalSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(nextSlide, 6000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSlide]);

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-300 bg-gov-950 group select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      aria-label="Government Public Services Highlights"
    >
      {/* Tricolor Sovereign Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-30 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

      {/* Main Slide Carousel Track */}
      <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] w-full overflow-hidden">
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
                className="w-full h-full object-cover object-center transform transition-transform duration-[6000ms] ease-out scale-100 group-hover:scale-105"
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Multi-Layer Deep Gradient Overlay for Maximum Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-gov-950 via-gov-950/70 to-gov-950/30 sm:bg-gradient-to-r sm:from-gov-950 sm:via-gov-950/85 sm:to-transparent" />

              {/* Slide Foreground Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end sm:justify-center p-6 sm:p-12 lg:p-16 max-w-3xl">
                <div className="space-y-4">
                  {/* Category Pill with Icon */}
                  <div className="inline-flex items-center gap-2 bg-gov-900/90 border border-saffron-400/40 text-saffron-300 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
                    <TagIcon className="w-3.5 h-3.5 text-saffron-400" />
                    <span>{slide.categoryTag}</span>
                  </div>

                  {/* Slide Title */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-serif tracking-tight leading-[1.2] drop-shadow-md">
                    {slide.title}
                  </h2>

                  {/* Slide Description */}
                  <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
                    {slide.subtitle}
                  </p>

                  {/* Actions & Metrics Row */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      to={slide.primaryAction.path}
                      className="px-5 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-gov-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                    >
                      <span>{slide.primaryAction.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {slide.secondaryAction && (
                      <Link
                        to={slide.secondaryAction.path}
                        className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                      >
                        {slide.secondaryAction.label}
                      </Link>
                    )}

                    {/* Sovereign Metric Badge */}
                    <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/20 text-xs">
                      <span className="text-slate-300">{slide.metricsBadge.label}:</span>
                      <span className="font-mono font-bold text-saffron-400 bg-white/10 px-2 py-0.5 rounded border border-white/15">
                        {slide.metricsBadge.value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="absolute bottom-4 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        {/* Slide Indicators / Tabs */}
        <div className="flex items-center gap-2 pointer-events-auto bg-gov-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? 'w-8 bg-saffron-400'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              title={`Go to slide ${idx + 1}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}

          {/* Slide Counter */}
          <span className="text-[10px] font-mono font-bold text-slate-300 ml-1">
            0{currentSlide + 1} / 0{totalSlides}
          </span>
        </div>

        {/* Carousel Controls: Prev / Pause / Next */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-gov-950/80 backdrop-blur-md p-1 rounded-full border border-white/15 text-white">
          <button
            onClick={prevSlide}
            className="p-1.5 rounded-full hover:bg-white/15 text-slate-300 hover:text-white transition cursor-pointer"
            title="Previous slide"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-full hover:bg-white/15 text-slate-300 hover:text-white transition cursor-pointer"
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={nextSlide}
            className="p-1.5 rounded-full hover:bg-white/15 text-slate-300 hover:text-white transition cursor-pointer"
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
