import React, { useState } from 'react';
import {
  Landmark,
  UserCheck,
  Car,
  Building2,
  Lock,
  ShieldCheck,
  Activity,
  CheckCircle2,
  FileText,
  Layers,
  FileCheck,
  Radio,
  Zap,
  Cpu,
  Database,
  ArrowRight
} from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';

type NodeId = 'ALL' | 'CITIZEN' | 'SAMAVAY' | 'BHOOMI' | 'SARATHI' | 'MUNICIPAL' | 'DIGILOCKER';

export const InteroperabilityHeroGraphic: React.FC = () => {
  const [activeNode, setActiveNode] = useState<NodeId>('ALL');
  const [isTransmitting, setIsTransmitting] = useState<boolean>(true);

  const registryNodes = [
    {
      id: 'BHOOMI' as NodeId,
      name: 'Bhoomi LRS',
      ministry: 'Revenue Dept',
      icon: Building2,
      color: 'blue',
      borderColor: 'border-blue-400',
      activeBorder: 'border-blue-600 ring-4 ring-blue-100',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      dataTitle: 'Land Record of Rights (RoR)',
      payload: 'Plot #402/A • Survey RoR Clear • Zero Paper'
    },
    {
      id: 'SARATHI' as NodeId,
      name: 'SARATHI 4.0',
      ministry: 'Transport Ministry',
      icon: Car,
      color: 'amber',
      borderColor: 'border-amber-400',
      activeBorder: 'border-amber-600 ring-4 ring-amber-100',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      dataTitle: 'Driving Licence Endorsement',
      payload: 'DL #KA-05-2018 • Class: LMV/MCWG • Valid 2038'
    },
    {
      id: 'MUNICIPAL' as NodeId,
      name: 'e-NagarPalika',
      ministry: 'Urban Local Body',
      icon: Landmark,
      color: 'emerald',
      borderColor: 'border-emerald-400',
      activeBorder: 'border-emerald-600 ring-4 ring-emerald-100',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      dataTitle: 'Property & Civic Records',
      payload: 'Ward #14 • Assessment Tax Cleared • Verified'
    },
    {
      id: 'DIGILOCKER' as NodeId,
      name: 'DigiLocker',
      ministry: 'MeitY Ecosystem',
      icon: FileCheck,
      color: 'purple',
      borderColor: 'border-purple-400',
      activeBorder: 'border-purple-600 ring-4 ring-purple-100',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      dataTitle: 'Verifiable Credentials',
      payload: 'Tamper-Proof Digitally Signed Official PDF'
    }
  ];

  return (
    <div className="w-full bg-slate-50/90 border-2 border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-slate-900 shadow-card relative overflow-hidden select-none space-y-4 sm:space-y-5">
      {/* Subtle Grid and Radar Radial Backdrop */}
      <div className="absolute inset-0 bg-gov-grid opacity-25 pointer-events-none" />

      {/* Official Government Header (Aligned with Citizen Credentials) */}
      <div className="flex items-center justify-between border-b-2 border-slate-200/90 pb-4 relative z-10 gap-3">
        <div className="flex items-center space-x-3.5">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-amber-500/70 text-amber-700 flex items-center justify-center p-2 shadow-sm ring-2 ring-amber-100 flex-shrink-0">
            <NationalEmblem size="md" variant="gold" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-xs sm:text-[13px] font-bold tracking-wider uppercase text-saffron-800 font-serif">
              <span>भारत सरकार</span>
              <span className="text-slate-400">•</span>
              <span>Government of India</span>
            </div>
            <h4 className="text-base sm:text-xl font-black text-slate-900 font-serif tracking-tight mt-0.5">
              National Interoperability Mesh & Registry Conduits
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsTransmitting(!isTransmitting)}
            className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 transition cursor-pointer shadow-xs"
            title="Toggle Live Stream Transmission"
          >
            <span className={`w-2.5 h-2.5 rounded-full ${isTransmitting ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>{isTransmitting ? 'Mesh Online' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Quick Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 relative z-10 text-xs sm:text-sm font-bold scrollbar-none">
        <span className="text-slate-600 mr-1 hidden sm:inline text-xs sm:text-sm font-semibold">Inspect Conduit:</span>
        <button
          onClick={() => setActiveNode('ALL')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            activeNode === 'ALL'
              ? 'bg-gov-900 text-white shadow-xs'
              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
          }`}
        >
          All Conduits (8 Platforms)
        </button>
        {registryNodes.map((n) => (
          <button
            key={n.id}
            onClick={() => setActiveNode(n.id)}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeNode === n.id
                ? 'bg-gov-900 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <n.icon className="w-4 h-4" />
            <span>{n.name}</span>
          </button>
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="sm:hidden text-center text-[11px] text-stone-500 font-mono py-0.5">
        ⇄ Swipe diagram horizontally to view complete mesh
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="w-full overflow-x-auto pb-1 scrollbar-none">
        <div className="min-w-[480px] sm:min-w-full relative h-[340px] sm:h-[370px] bg-white/70 border-2 border-slate-200/90 rounded-2xl sm:rounded-3xl p-3 sm:p-4 overflow-hidden z-10 shadow-inner">
        {/* Radar concentric circular guides */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-48 h-48 rounded-full border border-dashed border-gov-700 animate-spin-slow" />
          <div className="absolute w-72 h-72 rounded-full border border-dashed border-gov-500" />
          <div className="absolute w-96 h-96 rounded-full border border-slate-300" />
        </div>

        {/* SVG Dynamic Conduits Canvas */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 340">
          <defs>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="citizenConduit" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#0054a3" />
            </linearGradient>
          </defs>

          {/* Conduit 1: Citizen -> SAMAVAY Core */}
          <path
            d="M 125 170 L 225 170"
            stroke="url(#citizenConduit)"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            className={isTransmitting ? 'animate-dash-flow' : ''}
          />

          {/* Conduit 2: SAMAVAY Core -> Bhoomi (Top Right) */}
          <path
            d="M 315 155 Q 360 85 410 48"
            stroke="#0284c7"
            strokeWidth={activeNode === 'BHOOMI' || activeNode === 'ALL' ? '3.5' : '1.5'}
            strokeDasharray="6 4"
            className={isTransmitting ? 'animate-dash-flow' : ''}
            opacity={activeNode === 'BHOOMI' || activeNode === 'ALL' ? 1 : 0.25}
          />

          {/* Conduit 3: SAMAVAY Core -> SARATHI (Upper Middle Right) */}
          <path
            d="M 320 165 Q 365 140 410 130"
            stroke="#d97706"
            strokeWidth={activeNode === 'SARATHI' || activeNode === 'ALL' ? '3.5' : '1.5'}
            strokeDasharray="6 4"
            className={isTransmitting ? 'animate-dash-flow' : ''}
            opacity={activeNode === 'SARATHI' || activeNode === 'ALL' ? 1 : 0.25}
          />

          {/* Conduit 4: SAMAVAY Core -> e-Palika (Lower Middle Right) */}
          <path
            d="M 320 175 Q 365 200 410 210"
            stroke="#059669"
            strokeWidth={activeNode === 'MUNICIPAL' || activeNode === 'ALL' ? '3.5' : '1.5'}
            strokeDasharray="6 4"
            className={isTransmitting ? 'animate-dash-flow' : ''}
            opacity={activeNode === 'MUNICIPAL' || activeNode === 'ALL' ? 1 : 0.25}
          />

          {/* Conduit 5: SAMAVAY Core -> DigiLocker (Bottom Right) */}
          <path
            d="M 315 185 Q 360 255 410 292"
            stroke="#7c3aed"
            strokeWidth={activeNode === 'DIGILOCKER' || activeNode === 'ALL' ? '3.5' : '1.5'}
            strokeDasharray="6 4"
            className={isTransmitting ? 'animate-dash-flow' : ''}
            opacity={activeNode === 'DIGILOCKER' || activeNode === 'ALL' ? 1 : 0.25}
          />

          {/* Flowing Data Particles */}
          {isTransmitting && (
            <>
              <circle cx="170" cy="170" r="5" fill="#0054a3" filter="url(#glowEffect)" className="animate-pulse" />
              {(activeNode === 'BHOOMI' || activeNode === 'ALL') && (
                <circle cx="365" cy="98" r="5" fill="#0284c7" filter="url(#glowEffect)" className="animate-pulse" />
              )}
              {(activeNode === 'SARATHI' || activeNode === 'ALL') && (
                <circle cx="370" cy="144" r="5" fill="#d97706" filter="url(#glowEffect)" className="animate-pulse" />
              )}
              {(activeNode === 'MUNICIPAL' || activeNode === 'ALL') && (
                <circle cx="370" cy="196" r="5" fill="#059669" filter="url(#glowEffect)" className="animate-pulse" />
              )}
              {(activeNode === 'DIGILOCKER' || activeNode === 'ALL') && (
                <circle cx="365" cy="242" r="5" fill="#7c3aed" filter="url(#glowEffect)" className="animate-pulse" />
              )}
            </>
          )}
        </svg>

        {/* 1. CITIZEN SOVEREIGN VAULT NODE (Left) */}
        <div
          onClick={() => setActiveNode('CITIZEN')}
          onMouseEnter={() => setActiveNode('CITIZEN')}
          className="absolute left-1.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        >
          <div className={`p-3 sm:p-4 rounded-2xl bg-white border-2 transition-all duration-200 shadow-md ${
            activeNode === 'CITIZEN' ? 'border-gov-700 ring-4 ring-gov-100 scale-105' : 'border-slate-200 hover:border-gov-400'
          }`}>
            <div className="flex flex-col items-center text-center space-y-1.5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block font-serif">Verified Citizen</span>
                <span className="text-xs font-mono text-slate-600 font-semibold block">UID: •••• 9021</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full inline-block mt-1">
                  DPDP Consented
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SAMAVAY CORE GATEWAY HUB (Center) */}
        <div
          onClick={() => setActiveNode('SAMAVAY')}
          onMouseEnter={() => setActiveNode('SAMAVAY')}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        >
          <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-amber-50/95 via-white to-orange-50/60 border-2 border-saffron-500 shadow-xl transition-all duration-200 flex flex-col items-center text-center space-y-2 ring-4 ring-saffron-200/70 ${
            activeNode === 'SAMAVAY' || activeNode === 'ALL' ? 'scale-105 shadow-2xl' : 'hover:scale-105'
          }`}>
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-amber-50 border-2 border-saffron-500 flex items-center justify-center text-saffron-700 shadow-inner group-hover:rotate-6 transition-transform">
              <Layers className="w-7 h-7 text-saffron-600 animate-pulse" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-black tracking-wider uppercase font-serif text-slate-900 block">
                SAMAVAY
              </span>
              <span className="text-xs text-saffron-800 font-bold font-mono">DPI Mesh Gateway</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 px-3 py-0.5 rounded-full text-xs text-emerald-800 font-mono font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>38ms SLA</span>
            </div>
          </div>
        </div>

        {/* 3. FOUR CONNECTED REGISTRIES (Right Column) */}
        <div className="absolute right-1.5 sm:right-4 inset-y-2 flex flex-col justify-between z-20 w-36 sm:w-44">
          {registryNodes.map((n) => {
            const isSelected = activeNode === n.id;
            return (
              <div
                key={n.id}
                onClick={() => setActiveNode(n.id)}
                onMouseEnter={() => setActiveNode(n.id)}
                className={`p-2 sm:p-2.5 rounded-xl bg-white border-2 transition-all duration-200 shadow-xs cursor-pointer flex items-center space-x-2.5 ${
                  isSelected
                    ? n.activeBorder + ' scale-105 shadow-md'
                    : 'border-slate-200 hover:border-slate-400 hover:shadow-xs'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${n.bgColor} border flex items-center justify-center ${n.textColor} flex-shrink-0`}>
                  <n.icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 truncate font-serif">{n.name}</span>
                  </div>
                  <span className="text-xs text-slate-600 block truncate font-medium">{n.ministry}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

      {/* Dynamic Telemetry & Live Payload Inspector */}
      <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 rounded-2xl text-xs sm:text-sm relative z-10 space-y-2.5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-gov-700" />
            <h5 className="font-bold text-slate-900 font-serif text-sm sm:text-base">
              {activeNode === 'BHOOMI'
                ? 'Bhoomi LRS — Department of Revenue'
                : activeNode === 'SARATHI'
                ? 'SARATHI 4.0 — Ministry of Road Transport'
                : activeNode === 'MUNICIPAL'
                ? 'e-NagarPalika — Directorate of Municipal Administration'
                : activeNode === 'DIGILOCKER'
                ? 'DigiLocker Sovereign Credential Repository'
                : activeNode === 'CITIZEN'
                ? 'Citizen Sovereign Vault & DPDP Token Gateway'
                : 'National Digital Public Infrastructure Interoperability Conduits'}
            </h5>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-mono font-bold text-gov-950 bg-gov-50 border border-gov-300 px-3 py-0.5 rounded-full shadow-2xs">
              38ms Latency
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-0.5 rounded-full shadow-2xs">
              mTLS 1.3
            </span>
          </div>
        </div>

        {/* Live Payload Stream Text */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
            <span className="text-gov-800 font-bold font-sans">Verified Payload:</span>
            <span className="text-slate-700 truncate font-semibold">
              {activeNode === 'BHOOMI'
                ? 'Plot #402/A • Survey RoR Ownership Authenticated • 0 Photocopies Required'
                : activeNode === 'SARATHI'
                ? 'DL #KA-05-2018-00912 • Class: LMV/MCWG • Valid Till 2038 • Active'
                : activeNode === 'MUNICIPAL'
                ? 'Ward #14 • Municipal Property ID #8849-REV • Assessment Dues Cleared'
                : activeNode === 'DIGILOCKER'
                ? 'IT Act 2000 Section 4 & 5 Digitally Signed Legal Certificate Issued'
                : activeNode === 'CITIZEN'
                ? 'Single Citizen Identity • Purpose-Bound DPDP Consent Token Granted'
                : 'Auto-fills and authenticates 62% of citizen fields across 8 authoritative registries.'}
            </span>
          </div>
          <span className="text-xs text-slate-600 font-sans font-semibold flex-shrink-0 hidden sm:inline">
            Zero Local Storage
          </span>
        </div>

        {/* Cryptographic Assurance Footnote */}
        <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-600 pt-1 font-medium">
          <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            DPDP Act 2023 Enforced — Citizen Consent Revocable Anytime
          </span>
          <span className="text-slate-700 font-semibold hidden md:inline">
            NIC Hosted • mTLS PKI_X509 Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};
