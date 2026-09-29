import React, { useState } from 'react';
import {
  Landmark,
  User,
  Car,
  Building2,
  Lock,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const InteroperabilityHeroGraphic: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>('ALL');
  const [isTransmitting, setIsTransmitting] = useState<boolean>(true);

  return (
    <div className="w-full max-w-lg mx-auto bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-7 shadow-card-hover relative overflow-hidden select-none">
      {/* Background Subtle Grid Layer */}
      <div className="absolute inset-0 bg-gov-grid opacity-50 pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gov-900 text-white flex items-center justify-center font-bold shadow-xs">
            <Landmark className="w-4 h-4 text-saffron-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 font-serif">
              National Interoperability Mesh
            </h4>
            <p className="text-[10px] text-stone-500">Autonomous mTLS Data Pipeline</p>
          </div>
        </div>

        <button
          onClick={() => setIsTransmitting(!isTransmitting)}
          className="text-[10px] font-bold text-gov-800 bg-gov-50 hover:bg-gov-100 border border-gov-200 px-2.5 py-1 rounded-full inline-flex items-center gap-1 transition cursor-pointer"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isTransmitting ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`}></span>
          <span>{isTransmitting ? 'Live Stream' : 'Paused'}</span>
        </button>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative h-64 sm:h-72 my-2 flex items-center justify-center z-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280">
          <defs>
            {/* Gradients */}
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#003366" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="revenueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0054a3" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Connection Lines from Citizen to Center (SAMAVAY) */}
          <line
            x1="70"
            y1="140"
            x2="200"
            y2="140"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="4 4"
            className={isTransmitting ? 'animate-dash-flow' : ''}
          />

          {/* Lines from SAMAVAY to Revenue (Top Right) */}
          <line
            x1="200"
            y1="140"
            x2="330"
            y2="60"
            stroke="#0284c7"
            strokeWidth="2"
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
            strokeWidth="2"
            strokeDasharray="5 5"
            className={isTransmitting ? 'animate-dash-flow' : ''}
          />

          {/* Lines from SAMAVAY to Municipal (Bottom Right) */}
          <line
            x1="200"
            y1="140"
            x2="330"
            y2="220"
            stroke="#b45309"
            strokeWidth="2"
            strokeDasharray="5 5"
            className={isTransmitting ? 'animate-dash-flow' : ''}
          />

          {/* Traveling Data Packet Circles (Simulated telemetry) */}
          {isTransmitting && (
            <>
              <circle cx="135" cy="140" r="3.5" fill="#0284c7" className="animate-pulse" />
              <circle cx="265" cy="100" r="3.5" fill="#0284c7" className="animate-pulse" />
              <circle cx="270" cy="140" r="3.5" fill="#d97706" className="animate-pulse" />
              <circle cx="265" cy="180" r="3.5" fill="#b45309" className="animate-pulse" />
            </>
          )}
        </svg>

        {/* 1. CITIZEN NODE (Left) */}
        <div
          onMouseEnter={() => setActiveNode('CITIZEN')}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white border-2 border-stone-300 group-hover:border-gov-600 shadow-card flex flex-col items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-card-hover">
            <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-gov-50 text-stone-700 group-hover:text-gov-700 flex items-center justify-center transition">
              <User className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-stone-800 mt-0.5">Citizen</span>
          </div>
        </div>

        {/* 2. SAMAVAY CORE NODE (Center) */}
        <div
          onMouseEnter={() => setActiveNode('SAMAVAY')}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group animate-float-gentle"
        >
          <div className="w-20 h-20 rounded-3xl bg-gov-950 border-2 border-gov-500 shadow-xl flex flex-col items-center justify-center text-white transition-all group-hover:scale-110 ring-4 ring-gov-100">
            <Sparkles className="w-6 h-6 text-saffron-400 mb-0.5 animate-pulse" />
            <span className="text-[10px] font-extrabold tracking-wider uppercase font-serif text-white">SAMAVAY</span>
            <span className="text-[8px] text-gov-300 font-semibold">Core Mesh</span>
          </div>
        </div>

        {/* 3. REVENUE REGISTRY (Top Right) */}
        <div
          onMouseEnter={() => setActiveNode('REVENUE')}
          className="absolute right-2 sm:right-4 top-4 z-20 cursor-pointer group"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-gov-400 group-hover:border-gov-600 shadow-card flex flex-col items-center justify-center transition-all group-hover:scale-105">
            <div className="w-7 h-7 rounded-full bg-gov-50 text-gov-700 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-bold text-stone-800 mt-0.5">Bhoomi LRS</span>
          </div>
        </div>

        {/* 4. TRANSPORT REGISTRY (Middle Right) */}
        <div
          onMouseEnter={() => setActiveNode('TRANSPORT')}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-saffron-300 group-hover:border-saffron-600 shadow-card flex flex-col items-center justify-center transition-all group-hover:scale-105">
            <div className="w-7 h-7 rounded-full bg-saffron-50 text-saffron-700 flex items-center justify-center">
              <Car className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-bold text-stone-800 mt-0.5">SARATHI</span>
          </div>
        </div>

        {/* 5. MUNICIPAL REGISTRY (Bottom Right) */}
        <div
          onMouseEnter={() => setActiveNode('MUNICIPAL')}
          className="absolute right-2 sm:right-4 bottom-4 z-20 cursor-pointer group"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-amber-300 group-hover:border-amber-600 shadow-card flex flex-col items-center justify-center transition-all group-hover:scale-105">
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
              <Landmark className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-bold text-stone-800 mt-0.5">e-Palika</span>
          </div>
        </div>
      </div>

      {/* Dynamic Node Context Bar */}
      <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl text-xs relative z-10 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-stone-900 font-serif flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-gov-700" />
            {activeNode === 'REVENUE'
              ? 'Bhoomi Land Records Registry (Revenue)'
              : activeNode === 'TRANSPORT'
              ? 'SARATHI 4.0 & VAHAN (Transport Ministry)'
              : activeNode === 'MUNICIPAL'
              ? 'e-NagarPalika Municipal Tax Gateway'
              : activeNode === 'CITIZEN'
              ? 'Single Citizen Identity & DPDP Consent Gate'
              : 'Autonomous Cross-Registry Interoperability Pipeline'}
          </span>
          <span className="text-[10px] font-mono font-bold text-gov-800 bg-gov-100 px-2 py-0.5 rounded-full">
            240ms Latency
          </span>
        </div>
        <p className="text-[11px] text-stone-600 leading-tight">
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
