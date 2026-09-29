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
  UserCheck,
  BadgeCheck
} from 'lucide-react';
import { NationalEmblem } from './NationalEmblem';

export const CitizenCredentialsCard: React.FC = () => {
  return (
    <div className="w-full bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 text-slate-900 space-y-3.5 select-none relative overflow-hidden shadow-2xs">
      {/* Official Government Header */}
      <div className="flex items-center justify-between border-b border-slate-200/90 pb-3 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-xl bg-gov-900 text-white flex items-center justify-center p-1.5 shadow-sm ring-1 ring-gov-700/50">
            <NationalEmblem size="sm" variant="gold" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-[10px] font-bold tracking-wider uppercase text-saffron-700 font-serif">
              <span>भारत सरकार</span>
              <span className="text-slate-300">•</span>
              <span>Government of India</span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 font-serif">
              National DigiLocker & Registry Vault
            </h4>
          </div>
        </div>

        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Statutory Active</span>
        </span>
      </div>

      {/* 3 Pre-Verified Sovereign Credentials (Light Clean Card Aesthetic) */}
      <div className="space-y-2.5 relative z-10">
        {/* 1. UIDAI Aadhaar Verification */}
        <div className="p-3 bg-white border border-slate-200 hover:border-emerald-400 rounded-xl flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Aadhaar Identity Authentication</span>
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded">
                  UIDAI Verified
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                VID: •••• •••• 9021 • Demographic & Biometric Match Validated
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        </div>

        {/* 2. Transport Department SARATHI 4.0 */}
        <div className="p-3 bg-white border border-slate-200 hover:border-amber-400 rounded-xl flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 flex-shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">Driving Licence Endorsement</span>
                <span className="text-[9px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded">
                  SARATHI 4.0
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                DL-1420110023412 • Class: LMV/MCWG • Valid Till 2038
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        </div>

        {/* 3. Revenue & Land Records (Bhoomi LRS) */}
        <div className="p-3 bg-white border border-slate-200 hover:border-blue-400 rounded-xl flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">State Land Revenue Record (RoR)</span>
                <span className="text-[9px] font-bold text-gov-800 bg-gov-100 border border-gov-300 px-1.5 py-0.5 rounded">
                  Bhoomi LRS
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Plot 402/A • Cadastral Survey RoR Verified • Zero Physical Copies
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        </div>
      </div>

      {/* Statutory Footer with Cryptographic Seal */}
      <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-600 relative z-10">
        <div className="flex items-center gap-1.5 text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-semibold">DPDP Act 2023 Governed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gov-800 font-bold bg-gov-50 border border-gov-200 px-2 py-0.5 rounded">
            62% Paperwork Eliminated
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">IT Act 2000 §4 & §5</span>
        </div>
      </div>
    </div>
  );
};
