import React, { useState } from 'react';
import { Languages, ShieldCheck, PhoneCall, Eye, Sun, Moon } from 'lucide-react';
import { NationalEmblem } from '../common/NationalEmblem';

export const TopGovBanner: React.FC = () => {
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'small'>(() => {
    return (localStorage.getItem('samavay_text_size') as 'normal' | 'large' | 'small') || 'normal';
  });
  const [lang, setLang] = useState<'EN' | 'HI' | 'TA' | 'BN'>('EN');
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('samavay_high_contrast') === 'true';
  });

  React.useEffect(() => {
    if (textSize === 'large') {
      document.documentElement.style.fontSize = '18px';
    } else if (textSize === 'small') {
      document.documentElement.style.fontSize = '15px';
    } else {
      document.documentElement.style.fontSize = '16px';
    }
    localStorage.setItem('samavay_text_size', textSize);
  }, [textSize]);

  React.useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('samavay_high_contrast', String(highContrast));
  }, [highContrast]);

  const cycleTextSize = () => {
    if (textSize === 'normal') {
      setTextSize('large');
    } else if (textSize === 'large') {
      setTextSize('small');
    } else {
      setTextSize('normal');
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  const languageLabels = {
    EN: 'English',
    HI: 'हिन्दी',
    TA: 'தமிழ்',
    BN: 'বাংলা'
  };

  return (
    <div className="relative bg-[#061e38] text-slate-100 text-xs border-b border-[#0f345c] select-none">
      {/* Skip to Main Content Accessible Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-1 focus:left-2 focus:z-50 focus:px-3 focus:py-1 focus:bg-saffron-500 focus:text-gov-950 focus:font-bold focus:rounded-md shadow-lg"
      >
        Skip to main content / मुख्य सामग्री पर जाएं
      </a>

      {/* 3-Color Sovereign Ribbon Micro Line at top */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        {/* Left: National Emblem & Identifier */}
        <div className="flex items-center space-x-2.5">
          <NationalEmblem size="sm" variant="gold" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <div className="flex items-center space-x-1.5 font-bold tracking-wider uppercase text-xs">
              <span className="text-saffron-400 font-serif">भारत सरकार</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-100 font-serif">Government of India</span>
            </div>

            <span className="hidden xl:inline text-slate-400">•</span>
            <span className="hidden xl:inline text-slate-300 text-xs font-medium">
              National Digital Public Infrastructure • Interoperability Mesh
            </span>
          </div>
        </div>

        {/* Right: Accessibility & Saffron Accent Badges */}
        <div className="flex items-center space-x-2 sm:space-x-3.5">
          {/* National Helpline */}
          <div className="hidden md:flex items-center space-x-1.5 text-slate-200 text-xs">
            <PhoneCall className="w-3.5 h-3.5 text-saffron-400" />
            <span className="font-medium">Toll-Free:</span>
            <span className="font-mono font-bold text-white tracking-wide">14444 / 1800-SAMAVAY</span>
          </div>

          <span className="hidden md:inline text-slate-500">|</span>

          {/* DPDP Act Badge */}
          <div className="hidden sm:flex items-center space-x-1.5 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>DPDP Act 2023 Compliant</span>
          </div>

          <span className="hidden sm:inline text-slate-500">|</span>

          {/* High Contrast Mode */}
          <button
            onClick={toggleHighContrast}
            className={`px-2 py-0.5 rounded text-xs transition cursor-pointer flex items-center gap-1 border ${
              highContrast
                ? 'bg-saffron-500 text-slate-950 font-bold border-saffron-300'
                : 'text-slate-200 hover:text-white border-transparent hover:bg-white/10'
            }`}
            title="Toggle High Contrast Mode (WCAG AAA)"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-xs font-semibold">Contrast</span>
          </button>

          <span className="text-slate-500">|</span>

          {/* Text Size (A- / A / A+) */}
          <button
            onClick={cycleTextSize}
            className="text-slate-200 hover:text-white transition flex items-center space-x-1 font-bold cursor-pointer px-2 py-0.5 rounded hover:bg-white/10 text-xs border border-transparent hover:border-white/20"
            title="Adjust text sizing (A- / A / A+)"
          >
            <span className="font-mono">Text: </span>
            <span className="font-mono font-black text-saffron-400">
              {textSize === 'normal' ? 'A (100%)' : textSize === 'large' ? 'A+ (115%)' : 'A- (90%)'}
            </span>
          </button>

          <span className="text-slate-500">|</span>

          {/* Language Switcher */}
          <div className="relative group">
            <button
              onClick={() => {
                const nextLang = lang === 'EN' ? 'HI' : lang === 'HI' ? 'TA' : lang === 'TA' ? 'BN' : 'EN';
                setLang(nextLang);
              }}
              className="text-white hover:bg-white/15 transition flex items-center space-x-1 font-bold bg-white/10 px-2.5 py-0.5 rounded border border-white/20 cursor-pointer text-xs"
              title="Click to cycle official languages"
            >
              <Languages className="w-3.5 h-3.5 text-saffron-400" />
              <span>{languageLabels[lang]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
