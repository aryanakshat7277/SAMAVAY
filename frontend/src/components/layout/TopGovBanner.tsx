import React, { useState } from 'react';
import { Languages, ShieldCheck, PhoneCall, Eye, Sun, Moon } from 'lucide-react';
import { NationalEmblem } from '../common/NationalEmblem';

export const TopGovBanner: React.FC = () => {
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'small'>('normal');
  const [lang, setLang] = useState<'EN' | 'HI' | 'TA' | 'BN'>('EN');
  const [highContrast, setHighContrast] = useState(false);

  const cycleTextSize = () => {
    if (textSize === 'normal') {
      setTextSize('large');
      document.documentElement.classList.add('text-lg');
      document.documentElement.classList.remove('text-sm');
    } else if (textSize === 'large') {
      setTextSize('small');
      document.documentElement.classList.remove('text-lg');
      document.documentElement.classList.add('text-sm');
    } else {
      setTextSize('normal');
      document.documentElement.classList.remove('text-lg');
      document.documentElement.classList.remove('text-sm');
    }
  };

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.documentElement.classList.add('contrast-125');
    } else {
      document.documentElement.classList.remove('contrast-125');
    }
  };

  const languageLabels = {
    EN: 'English',
    HI: 'हिन्दी',
    TA: 'தமிழ்',
    BN: 'বাংলা'
  };

  return (
    <div className="relative bg-[#061e38] text-slate-100 text-[11px] border-b border-[#0f345c]">
      {/* Skip to Main Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-2 focus:z-50 focus:px-3 focus:py-1 focus:bg-saffron-500 focus:text-gov-950 focus:font-bold focus:rounded-md"
      >
        Skip to main content / मुख्य सामग्री पर जाएं
      </a>

      {/* 3-Color Sovereign Ribbon Micro Line at top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
        {/* Left: National Emblem & Identifier */}
        <div className="flex items-center space-x-2.5">
          <NationalEmblem size="sm" variant="gold" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <div className="flex items-center space-x-1.5 font-bold tracking-wider uppercase text-[10px]">
              <span className="text-saffron-400 font-serif">भारत सरकार</span>
              <span className="text-stone-400">/</span>
              <span className="text-stone-200">Government of India</span>
            </div>

            <span className="hidden xl:inline text-stone-500">•</span>
            <span className="hidden xl:inline text-stone-300 text-[10px]">
              Digital Public Infrastructure • Interoperability Ecosystem (SIH26129)
            </span>
          </div>
        </div>

        {/* Right: Accessibility & Saffron Accent Badges */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          {/* National Helpline */}
          <div className="hidden md:flex items-center space-x-1 text-stone-300 text-[10px]">
            <PhoneCall className="w-3 h-3 text-saffron-400" />
            <span>Toll-Free:</span>
            <span className="font-mono font-bold text-white">14444 / 1800-SAMAVAY</span>
          </div>

          <span className="hidden md:inline text-stone-600">|</span>

          {/* DPDP Act Badge */}
          <div className="hidden sm:flex items-center space-x-1 text-saffron-300 text-[10px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>DPDP Act 2023 Compliant</span>
          </div>

          <span className="hidden sm:inline text-stone-600">|</span>

          {/* High Contrast Mode */}
          <button
            onClick={toggleHighContrast}
            className={`p-1 rounded text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1 ${highContrast ? 'text-saffron-400 font-bold' : ''}`}
            title="Toggle High Contrast Mode"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden lg:inline text-[10px]">Contrast</span>
          </button>

          <span className="text-stone-600">|</span>

          {/* Text Size (A- / A / A+) */}
          <button
            onClick={cycleTextSize}
            className="text-stone-300 hover:text-white transition flex items-center space-x-1 font-semibold cursor-pointer px-1 py-0.5 rounded hover:bg-white/10"
            title="Adjust text sizing (A- / A / A+)"
          >
            <span className="font-mono font-bold">
              {textSize === 'normal' ? 'A' : textSize === 'large' ? 'A+' : 'A-'}
            </span>
          </button>

          <span className="text-stone-600">|</span>

          {/* Language Switcher */}
          <div className="relative group">
            <button
              onClick={() => {
                const nextLang = lang === 'EN' ? 'HI' : lang === 'HI' ? 'TA' : lang === 'TA' ? 'BN' : 'EN';
                setLang(nextLang);
              }}
              className="text-white hover:bg-white/15 transition flex items-center space-x-1 font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20 cursor-pointer text-[10px]"
              title="Click to cycle official languages"
            >
              <Languages className="w-3 h-3 text-saffron-400" />
              <span>{languageLabels[lang]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
