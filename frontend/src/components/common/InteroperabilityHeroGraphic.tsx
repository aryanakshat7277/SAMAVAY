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
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-gov-950 via-[#071d33] to-[#041224] border border-gov-700/80 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden select-none text-white ring-1 ring-white/10">
      {/* Top Sovereign Tricolor Micro-Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />

      {/* Subtle Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-gov-grid opacity-15 pointer-events-none" />

      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-1 shadow-sm">
            <NationalEmblem size="sm" variant="gold" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white font-serif tracking-wide">
              National Interoperability Mesh
            </h4>
            <p className="text-[10px] text-slate-300 font-mono">Autonomous mTLS Data Pipeline</p>
          </div>
        </div>

        <button
          onClick={() => setIsTransmitting(!isTransmitting)}
          className="text-[10px] font-bold text-emerald-300 bg-white/10 hover:bg-white/20 border border-emerald-500/30 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 transition cursor-pointer"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isTransmitting ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
          <span>{isTransmitting ? 'Live Stream' : 'Paused'}</span>
        </button>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="relative h-64 sm:h-72 my-2 flex items-center justify-center z-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280">
          <defs>
            <linearGradient id="lineGradMesh" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glowAmber" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines from Citizen to Center (SAMAVAY) */}
          <line
            x1="70"
            y1="140"
            x2="200"
            y2="140"
            stroke="#38bdf8"
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
            stroke="#60a5fa"
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
            stroke="#fbbf24"
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
            stroke="#34d399"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            className={isTransmitting ? 'animate-dash-flow' : ''}
          />

          {/* Traveling Data Packet Glowing Circles (Simulated telemetry) */}
          {isTransmitting && (
            <>
              <circle cx="135" cy="140" r="4" fill="#38bdf8" filter="url(#glowCyan)" className="animate-pulse" />
              <circle cx="265" cy="100" r="4" fill="#60a5fa" filter="url(#glowCyan)" className="animate-pulse" />
              <circle cx="270" cy="140" r="4" fill="#fbbf24" filter="url(#glowAmber)" className="animate-pulse" />
              <circle cx="265" cy="180" r="4" fill="#34d399" filter="url(#glowCyan)" className="animate-pulse" />
            </>
          )}
        </svg>

        {/* 1. CITIZEN NODE (Left) */}
        <div
          onMouseEnter={() => setActiveNode('CITIZEN')}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border-2 border-slate-600 group-hover:border-cyan-400 shadow-xl flex flex-col items-center justify-center transition-all group-hover:scale-105 backdrop-blur-md">
            <div className="w-8 h-8 rounded-full bg-cyan-950/80 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 flex items-center justify-center transition">
              <User className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-slate-200 mt-0.5">Citizen</span>
          </div>
        </div>

        {/* 2. SAMAVAY CORE NODE (Center) */}
        <div
          onMouseEnter={() => setActiveNode('SAMAVAY')}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group animate-float-gentle"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#0e3b6a] to-gov-950 border-2 border-saffron-400 shadow-[0_0_25px_rgba(230,81,0,0.35)] flex flex-col items-center justify-center text-white transition-all group-hover:scale-110 ring-4 ring-saffron-500/20 backdrop-blur-md">
            <Layers className="w-6 h-6 text-saffron-400 mb-0.5 animate-pulse" />
            <span className="text-[10px] font-black tracking-wider uppercase font-serif text-white">SAMAVAY</span>
            <span className="text-[8px] text-saffron-300 font-semibold font-mono">DPI Mesh</span>
          </div>
        </div>

        {/* 3. REVENUE REGISTRY (Top Right) */}
        <div
          onMouseEnter={() => setActiveNode('REVENUE')}
          className="absolute right-2 sm:right-4 top-4 z-20 cursor-pointer group"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border-2 border-blue-500/70 group-hover:border-blue-400 shadow-xl flex flex-col items-center justify-center transition-all group-hover:scale-105 backdrop-blur-md">
            <div className="w-7 h-7 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-bold text-slate-200 mt-0.5">Bhoomi</span>
          </div>
        </div>

        {/* 4. TRANSPORT REGISTRY (Middle Right) */}
        <div
          onMouseEnter={() => setActiveNode('TRANSPORT')}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer group"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border-2 border-amber-500/70 group-hover:border-amber-400 shadow-xl flex flex-col items-center justify-center transition-all group-hover:scale-105 backdrop-blur-md">
            <div className="w-7 h-7 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center">
              <Car className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-bold text-slate-200 mt-0.5">SARATHI</span>
          </div>
        </div>

        {/* 5. MUNICIPAL REGISTRY (Bottom Right) */}
        <div
          onMouseEnter={() => setActiveNode('MUNICIPAL')}
          className="absolute right-2 sm:right-4 bottom-4 z-20 cursor-pointer group"
        >
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/70 group-hover:border-emerald-400 shadow-xl flex flex-col items-center justify-center transition-all group-hover:scale-105 backdrop-blur-md">
            <div className="w-7 h-7 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center">
              <Landmark className="w-3.5 h-3.5" />
            </div>
            <span className="text-[9px] font-bold text-slate-200 mt-0.5">e-Palika</span>
          </div>
        </div>
      </div>

      {/* Dynamic Node Context Bar */}
      <div className="p-3 bg-white/10 border border-white/15 rounded-2xl text-xs relative z-10 space-y-1 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white font-serif flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-saffron-400" />
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
          <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            38ms Latency
          </span>
        </div>
        <p className="text-[11px] text-slate-300 leading-tight">
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
