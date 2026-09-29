import React, { useState } from 'react';
import {
  Landmark,
  User,
  Car,
  Building2,
  Lock,
  ShieldCheck,
  Activity,
  CheckCircle2,
  FileText,
  Layers
} from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';

export const InteroperabilityHeroGraphic: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>('ALL');
  const [isTransmitting, setIsTransmitting] = useState<boolean>(true);

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-50/80 border border-slate-200 rounded-2xl p-5 text-slate-900 shadow-2xs relative overflow-hidden select-none">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-gov-grid opacity-20 pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-slate-200/90 pb-3 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gov-900 text-white flex items-center justify-center p-1 shadow-sm">
            <NationalEmblem size="sm" variant="gold" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 font-serif tracking-wide">
              National Interoperability Mesh
            </h4>
            <p className="text-[10px] text-slate-500 font-mono">Sovereign mTLS Data Gateway</p>
          </div>
        </div>

        <button
          onClick={() => setIsTransmitting(!isTransmitting)}
          className="text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 transition cursor-pointer"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isTransmitting ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
          <span>{isTransmitting ? 'Live Stream' : 'Paused'}</span>
        </button>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative h-64 sm:h-72 my-2 flex items-center justify-center z-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280">
          {/* Connection Lines from Citizen to Center (SAMAVAY) */}
          <line
            x1="70"
            y1="140"
            x2="200"
            y2="140"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            className={isTransmitting ? 'animate-dash-flow' : ''}
          />

          {/* Lines from SAMAVAY to Revenue (Top Right) */}
          <line
            x1="200"
            y1="140"
            x2="330"
            y2="60"
            stroke="#0054a3"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            className={isTransmitting ? 'animate-dash-flow' : ''}
          />

          {/* Lines from SAMAVAY to Transport (Middle Right) */}
          <line
            x1="200"
            y1="140"
            x2="340"
            y2="140"
            stroke="#d97706"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            className={isTransmitting ? 'animate-dash-flow' : ''}
          />

          {/* Lines from SAMAVAY to Municipal (Bottom Right) */}
          <line
            x1="200"
            y1="140"
            x2="330"
            y2="220"
            stroke="#059669"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            className={isTransmitting ? 'animate-dash-flow' : ''}
          />

          {/* Traveling Data Packet Circles */}
          {isTransmitting && (
            <>
              <circle cx="135" cy="140" r="4" fill="#0284c7" className="animate-pulse" />
              <circle cx="265" cy="100" r="4" fill="#0054a3" className="animate-pulse" />
              <circle cx="270" cy="140" r="4" fill="#d97706" className="animate-pulse" />
              <circle cx="265" cy="180" r="4" fill="#059669" className="animate-pulse" />
            </>
          )}
        </svg>

        {/* 1. CITIZEN NODE (Left) */}
        <div
          onMouseEnter={() => setActiveNode('CITIZEN')}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-300 group-hover:border-gov-600 shadow-sm flex flex-col items-center justify-center transition-all group-hover:scale-105">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 group-hover:bg-gov-50 group-hover:text-gov-700 flex items-center justify-center transition">
              <User className="w-4.5 h-4.5" />
            </div>
            <span className="text-xs font-bold text-slate-900 mt-0.5">Citizen</span>
          </div>
        </div>

        {/* 2. SAMAVAY CORE NODE (Center) */}
        <div
          onMouseEnter={() => setActiveNode('SAMAVAY')}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group animate-float-gentle"
        >
          <div className="w-22 h-22 rounded-3xl bg-gov-900 border-2 border-saffron-400 shadow-xl flex flex-col items-center justify-center text-white transition-all group-hover:scale-110 ring-4 ring-gov-100 p-2">
            <Layers className="w-7 h-7 text-saffron-400 mb-0.5 animate-pulse" />
            <span className="text-xs font-black tracking-wider uppercase font-serif text-white">SAMAVAY</span>
            <span className="text-[10px] text-saffron-300 font-bold font-mono">DPI Mesh</span>
          </div>
        </div>

        {/* 3. REVENUE REGISTRY (Top Right) */}
        <div
          onMouseEnter={() => setActiveNode('REVENUE')}
          className="absolute right-2 sm:right-4 top-3 z-20 cursor-pointer group"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-blue-400 group-hover:border-blue-600 shadow-sm flex flex-col items-center justify-center transition-all group-hover:scale-105">
            <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 mt-0.5">Bhoomi</span>
          </div>
        </div>

        {/* 4. TRANSPORT REGISTRY (Middle Right) */}
        <div
          onMouseEnter={() => setActiveNode('TRANSPORT')}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-amber-400 group-hover:border-amber-600 shadow-sm flex flex-col items-center justify-center transition-all group-hover:scale-105">
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 mt-0.5">SARATHI</span>
          </div>
        </div>

        {/* 5. MUNICIPAL REGISTRY (Bottom Right) */}
        <div
          onMouseEnter={() => setActiveNode('MUNICIPAL')}
          className="absolute right-2 sm:right-4 bottom-3 z-20 cursor-pointer group"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-emerald-400 group-hover:border-emerald-600 shadow-sm flex flex-col items-center justify-center transition-all group-hover:scale-105">
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-900 mt-0.5">e-Palika</span>
          </div>
        </div>
      </div>

      {/* Dynamic Node Context Bar */}
      <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs relative z-10 space-y-1.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 font-serif flex items-center gap-1.5 text-xs sm:text-sm">
            <Activity className="w-4 h-4 text-gov-700" />
            {activeNode === 'REVENUE'
              ? 'Bhoomi Land Records Registry (Revenue)'
              : activeNode === 'TRANSPORT'
              ? 'SARATHI 4.0 & VAHAN (Transport Ministry)'
              : activeNode === 'MUNICIPAL'
              ? 'e-NagarPalika Municipal Tax Gateway'
              : activeNode === 'CITIZEN'
              ? 'Single Citizen Identity & DPDP Consent Gate'
              : 'National Cross-Registry Interoperability Gateway'}
          </span>
          <span className="text-xs font-mono font-bold text-gov-900 bg-gov-50 border border-gov-300 px-2.5 py-0.5 rounded-full">
            38ms Latency
          </span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {activeNode === 'REVENUE'
            ? 'Auto-verifies Land Record of Rights (RoR), survey coordinates, and mutation history.'
            : activeNode === 'TRANSPORT'
            ? 'Pre-populates Driving Licence credentials and Vehicle Registration certificates.'
            : activeNode === 'MUNICIPAL'
            ? 'Validates municipal assessment identifiers, property boundary records, and civic dues.'
            : activeNode === 'CITIZEN'
            ? 'Grants purpose-bound, revocable data authorization with zero redundant paperwork.'
            : 'Pre-verifies and reuses 62% of required citizen information across 8 sovereign platforms.'}
        </p>
      </div>
    </div>
  );
};
