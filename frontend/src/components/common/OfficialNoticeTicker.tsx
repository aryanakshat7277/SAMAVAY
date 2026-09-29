import React, { useState } from 'react';
import { Volume2, Bell, ShieldCheck, ChevronRight, PhoneCall, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const notices = [
  {
    tag: 'REGISTRY INTEGRATION',
    text: 'Bhoomi LRS and SARATHI 4.0 cross-state registry verification now active across all 28 States & 8 UTs.',
    link: '/admin/platform-status'
  },
  {
    tag: 'DPDP ACT 2023',
    text: 'Form Minimization Engine active: 62% average document uploads eliminated with sovereign 1-click citizen consent.',
    link: '/dashboard/permissions'
  },
  {
    tag: 'FARMER WELFARE',
    text: 'PM-KISAN 17th Installment Direct Benefit Transfer integration operational with automated cadastral land RoR mapping.',
    link: '/services'
  },
  {
    tag: 'CITIZEN HELPDESK',
    text: 'National SAMAVAY Toll-Free Citizen Helpline 1800-11-7262 & UIDAI 1947 operational Mon-Sat 8:00 AM - 8:00 PM IST.',
    link: '/help'
  }
];

export const OfficialNoticeTicker: React.FC = () => {
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prev) => (prev + 1) % notices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-white border-y border-slate-200 shadow-2xs text-xs py-2 px-4 sm:px-6 flex items-center justify-between gap-4 select-none"
    >
      {/* Left Label */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
        </span>
        <span className="font-serif font-black text-gov-950 text-[11px] tracking-wide uppercase flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5 text-saffron-600" />
          नवीनतम सूचनाएं / LATEST UPDATES:
        </span>
      </div>

      {/* Center Scrolling / Rotating Notice */}
      <div className="flex-1 overflow-hidden">
        <div className="truncate text-slate-700 text-xs">
          <span className="font-bold text-[10px] text-gov-800 bg-gov-50 border border-gov-200 px-2 py-0.5 rounded mr-2 font-mono">
            {notices[currentNoticeIndex].tag}
          </span>
          <span className="font-medium">{notices[currentNoticeIndex].text}</span>
          <Link
            to={notices[currentNoticeIndex].link}
            className="text-gov-800 hover:text-gov-950 font-bold ml-2 underline text-[11px] inline-flex items-center gap-0.5"
          >
            <span>Read Details</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Right Action: Notice Navigator */}
      <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
        {notices.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentNoticeIndex(i)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              i === currentNoticeIndex ? 'w-4 bg-gov-700' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            title={`View update ${i + 1}`}
            aria-label={`Update ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
