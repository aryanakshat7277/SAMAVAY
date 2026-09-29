import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  CheckCircle2,
  ShieldCheck,
  FileCheck,
  Layers,
  Network,
  Users2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

import dpiDataFlowImg from '../../assets/dpi_data_flow.jpg';
import banner2 from '../../assets/gov_banner_2.jpg';
import banner3 from '../../assets/gov_banner_3.jpg';
import banner4 from '../../assets/gov_banner_4.jpg';
import heroCitizenImg from '../../assets/hero_citizen_dpi.jpg';

export interface DpiSlide {
  id: string;
  tabLabel: string;
  tabIcon: React.ElementType;
  badge: string;
  badgeType: 'emerald' | 'amber' | 'blue';
  title: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  link?: { label: string; url: string };
}

const dpiSlides: DpiSlide[] = [
  {
    id: 'pipeline',
    tabLabel: 'Architecture Pipeline',
    tabIcon: Network,
    badge: '1-CLICK CONSENT ➔ VERIFIED DELIVERY',
    badgeType: 'emerald',
    title: 'End-to-End Interoperability Mesh Architecture',
    description: 'Citizens grant consent once. SAMAVAY orchestrates parallel, encrypted queries to authoritative state databases (Bhoomi, SARATHI, VAHAN, e-NagarPalika) and delivers digitally signed certificates in seconds.',
    highlights: [
      '62% paperwork and redundant form entries eliminated at source',
      'Direct registry-to-registry mTLS cryptographic data transfer',
      'Statutory compliance with DPDP Act 2023 & IT Act 2000'
    ],
    image: dpiDataFlowImg,
    imageAlt: 'SAMAVAY Interoperability Architecture: Citizen 1-Click Consent connecting official pillars to instant certificate delivery',
    link: { label: 'Explore Services Directory', url: '/services' }
  },
  {
    id: 'paperless',
    tabLabel: 'Paperless Governance',
    tabIcon: FileCheck,
    badge: 'DIGILOCKER INTEGRATED • ZERO PAPER',
    badgeType: 'amber',
    title: 'Paperless Digital Verification & Document Minimization',
    description: 'Citizens never have to photocopy or re-upload documents already held by the government. Authoritative registries automatically pre-populate driving licenses, property deeds, and identity proofs.',
    highlights: [
      'Instant verification directly from issuing departmental masters',
      'Tamper-proof digital certificates with cryptographic signature & QR verification',
      'Citizens maintain audit log of every document accessed'
    ],
    image: banner2,
    imageAlt: 'DigiLocker Paperless Governance Experience with Pre-Verified Credentials',
    link: { label: 'Track Applications', url: '/applications' }
  },
  {
    id: 'highway',
    tabLabel: 'Sovereign Grid',
    tabIcon: ShieldCheck,
    badge: 'mTLS PKI_X509 • ISO-20022',
    badgeType: 'blue',
    title: 'Sovereign Interoperability Highway & Registry Mesh',
    description: 'Secure, federated communications highway interconnecting Central Ministries and State Government IT systems without centralizing personal data or creating single points of failure.',
    highlights: [
      'Decentralized data mesh: data stays at source department',
      'Granular consent tokens with purpose limitation and automated expiry',
      'Real-time admin telemetry monitoring peer-to-peer node health'
    ],
    image: banner3,
    imageAlt: 'Sovereign Interoperability Grid & Cross-Department Registry Mesh',
    link: { label: 'Manage Data Permissions', url: '/dashboard/permissions' }
  },
  {
    id: 'dbt',
    tabLabel: 'Farmer Welfare & DBT',
    tabIcon: CheckCircle2,
    badge: '< 2.4 SECONDS SLA • DIRECT BENEFIT',
    badgeType: 'emerald',
    title: 'Direct Benefit Transfer (DBT) & Welfare Acceleration',
    description: 'Streamlined welfare distribution connecting Revenue land records (Bhoomi) with Aadhaar-seeded Direct Benefit Transfer accounts for instant subsidy clearance and farmer assistance.',
    highlights: [
      'Sub-second landholding verification for PM-KISAN beneficiaries',
      'Zero intermediaries: direct bank transfer upon digital approval',
      'Real-time grievance redressal with automated escalation'
    ],
    image: banner4,
    imageAlt: 'Farmer Welfare & PM-KISAN Instant Benefit Transfers in Action',
    link: { label: 'View Welfare Schemes', url: '/services' }
  },
  {
    id: 'inclusion',
    tabLabel: 'Inclusive Access',
    tabIcon: Users2,
    badge: 'ALL 28 STATES & 8 UTs • 22 LANGUAGES',
    badgeType: 'amber',
    title: 'Citizen-Centric Digital Public Infrastructure for Bharat',
    description: 'Designed from the ground up for 1.4 billion citizens. Accessible interfaces, assisted digital kiosk modes, and native language support ensuring no citizen is left behind.',
    highlights: [
      'Full compliance with Indian Government Web Guidelines (GIGW 3.0)',
      'High-contrast accessible sovereign light theme with text scaler',
      'Assisted digital service delivery for rural and non-digital citizens'
    ],
    image: heroCitizenImg,
    imageAlt: 'Empowered Citizen Accessing Sovereign Digital Services',
    link: { label: 'Citizen Helpdesk & FAQs', url: '/help' }
  }
];

interface DpiVisualSlideshowProps {
  initialSlide?: number;
  variant?: 'compact' | 'full';
  className?: string;
}

export const DpiVisualSlideshow: React.FC<DpiVisualSlideshowProps> = ({
  initialSlide = 0,
  variant = 'full',
  className = ''
}) => {
  const [currentIdx, setCurrentIdx] = useState(initialSlide);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = dpiSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(nextSlide, 7000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  const activeSlide = dpiSlides[currentIdx];

  const getBadgeClasses = (type: 'emerald' | 'amber' | 'blue') => {
    switch (type) {
      case 'emerald':
        return 'bg-emerald-50 border-emerald-300 text-emerald-800';
      case 'amber':
        return 'bg-amber-50 border-amber-300 text-amber-900';
      case 'blue':
        return 'bg-gov-50 border-gov-300 text-gov-800';
    }
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-card bg-white select-none group ${className}`}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      role="region"
      aria-label="DPI Architecture & Visual Workflow Slideshow"
    >
      {/* Tricolor Sovereign Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-30 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

      {/* Slide Navigation Tabs Header */}
      <div className="bg-stone-50/90 border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {dpiSlides.map((slide, idx) => {
            const Icon = slide.tabIcon;
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIdx(idx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-gov-700 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-slate-700 border border-stone-200'
                }`}
                title={`View ${slide.tabLabel}`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{slide.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Play/Pause & Counter */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
            {currentIdx + 1} / {total}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-white border border-stone-200 text-slate-600 hover:text-slate-900 hover:bg-stone-100 transition cursor-pointer"
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Slide Content: Image & Annotation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Left / Main: The Graphic / Image */}
        <div className="lg:col-span-7 relative bg-stone-100 flex items-center justify-center overflow-hidden min-h-[260px] sm:min-h-[340px]">
          <img
            key={activeSlide.id}
            src={activeSlide.image}
            alt={activeSlide.imageAlt}
            className="w-full h-full object-cover max-h-[460px] transition-all duration-700 ease-out"
          />

          {/* Quick Overlay Arrow Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-stone-300 shadow-sm text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
            title="Previous diagram"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-stone-300 shadow-sm text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
            title="Next diagram"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Micro status badge on image */}
          <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-lg px-2.5 py-1 text-[11px] font-mono font-bold text-slate-800 shadow-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive DPI Showcase</span>
          </div>
        </div>

        {/* Right / Panel: Rich Architectural Explanation */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-gradient-to-br from-stone-50/50 via-white to-amber-50/20">
          <div className="space-y-3.5">
            {/* Status Pill */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${getBadgeClasses(activeSlide.badgeType)}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeSlide.badge}</span>
            </div>

            {/* Slide Title */}
            <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900 tracking-tight leading-snug">
              {activeSlide.title}
            </h3>

            {/* Slide Description */}
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {activeSlide.description}
            </p>

            {/* Key Architectural Highlights */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Key System Guarantees:
              </span>
              <ul className="space-y-1.5">
                {activeSlide.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row & Pagination Controls */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
            {activeSlide.link && (
              <Link
                to={activeSlide.link.url}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition cursor-pointer"
              >
                <span>{activeSlide.link.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Mobile / Compact Carousel Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-slate-700 transition cursor-pointer"
                title="Previous slide"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 text-slate-700 transition cursor-pointer"
                title="Next slide"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Progress Ticker */}
      <div className="bg-stone-100 h-1 w-full overflow-hidden">
        <div
          className="bg-amber-500 h-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
};
