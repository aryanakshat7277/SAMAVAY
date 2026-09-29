import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  Building2,
  Car,
  Landmark,
  QrCode,
  ExternalLink,
  UserCheck
} from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';

export const CitizenCredentialsCard: React.FC = () => {
  return (
    <div className="w-full bg-[#0a1e36] border border-gov-700/80 rounded-2xl p-4 sm:p-5 text-white shadow-xl space-y-3.5 select-none relative overflow-hidden">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-gov-grid opacity-10 pointer-events-none" />

      {/* Official Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center p-1">
            <NationalEmblem size="sm" variant="gold" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-[10px] font-bold tracking-wider uppercase text-saffron-300">
              <span>भारत सरकार</span>
              <span className="text-white/40">•</span>
              <span>Government of India</span>
            </div>
            <h4 className="text-xs font-bold text-white font-serif">
              DigiLocker & Authoritative Registry Vault
            </h4>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Statutory Active</span>
        </span>
      </div>

      {/* 3 Pre-Verified Sovereign Credentials */}
      <div className="space-y-2.5 relative z-10">
        {/* 1. UIDAI Aadhaar Verification */}
        <div className="p-3 bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl flex items-center justify-between gap-3 transition">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Aadhaar Identity Authentication</span>
                <span className="text-[9px] font-semibold text-emerald-300 bg-emerald-950 border border-emerald-600/40 px-1.5 py-0.2 rounded">
                  UIDAI Verified
                </span>
              </div>
              <p className="text-[10px] text-slate-300">
                VID: •••• •••• 9021 • Demographic & Biometric Match Validated
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        </div>

        {/* 2. Transport Department SARATHI 4.0 */}
        <div className="p-3 bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl flex items-center justify-between gap-3 transition">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">Driving Licence Endorsement</span>
                <span className="text-[9px] font-semibold text-amber-300 bg-amber-950 border border-amber-600/40 px-1.5 py-0.2 rounded">
                  SARATHI 4.0
                </span>
              </div>
              <p className="text-[10px] text-slate-300">
                DL-1420110023412 • Class: LMV/MCWG • Valid Till 2038
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        </div>

        {/* 3. Revenue & Land Records (Bhoomi LRS) */}
        <div className="p-3 bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl flex items-center justify-between gap-3 transition">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">State Land Revenue Record (RoR)</span>
                <span className="text-[9px] font-semibold text-blue-300 bg-blue-950 border border-blue-600/40 px-1.5 py-0.2 rounded">
                  Bhoomi LRS
                </span>
              </div>
              <p className="text-[10px] text-slate-300">
                Plot 402/A • Survey RoR Khata Verified • Zero Physical Copies
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        </div>
      </div>

      {/* Statutory Footer with Cryptographic Seal */}
      <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-300 relative z-10">
        <div className="flex items-center gap-1.5 text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="font-semibold">DPDP Act 2023 Governed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-saffron-300 font-bold">62% Paperwork Eliminated</span>
          <span className="text-white/40">•</span>
          <span className="text-slate-400">IT Act 2000 §4 & §5</span>
        </div>
      </div>
    </div>
  );
};
