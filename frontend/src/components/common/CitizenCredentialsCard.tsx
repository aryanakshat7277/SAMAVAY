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
    <div className="w-full bg-slate-50/90 border-2 border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 text-slate-900 space-y-4 sm:space-y-5 select-none relative overflow-hidden shadow-card">
      {/* Official Government Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200/90 pb-4 relative z-10 gap-3">
        <div className="flex items-center space-x-3.5">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gov-900 text-white flex items-center justify-center p-2.5 shadow-md ring-2 ring-gov-700/50 flex-shrink-0">
            <NationalEmblem size="md" variant="gold" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5 text-xs sm:text-[13px] font-bold tracking-wider uppercase text-saffron-800 font-serif">
              <span>भारत सरकार</span>
              <span className="text-slate-400">•</span>
              <span>Government of India</span>
            </div>
            <h4 className="text-base sm:text-xl font-black text-slate-900 font-serif tracking-tight mt-0.5">
              National DigiLocker & Registry Vault
            </h4>
          </div>
        </div>

        <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border-2 border-emerald-300 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-xs flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Statutory Active</span>
        </span>
      </div>

      {/* 3 Pre-Verified Sovereign Credentials (Large Light Clean Card Aesthetic) */}
      <div className="space-y-3.5 relative z-10">
        {/* 1. UIDAI Aadhaar Verification */}
        <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 hover:border-emerald-400 rounded-2xl flex items-center justify-between gap-4 shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0 shadow-2xs">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-slate-900 font-serif">Aadhaar Identity Authentication</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-md">
                  UIDAI Verified
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-slate-700 font-medium mt-1 leading-normal">
                VID: •••• •••• 9021 • Demographic & Biometric Match Validated
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
        </div>

        {/* 2. Transport Department SARATHI 4.0 */}
        <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 hover:border-amber-400 rounded-2xl flex items-center justify-between gap-4 shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-700 flex-shrink-0 shadow-2xs">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-slate-900 font-serif">Driving Licence Endorsement</span>
                <span className="text-xs sm:text-sm font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-md">
                  SARATHI 4.0
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-slate-700 font-medium mt-1 leading-normal">
                DL-1420110023412 • Class: LMV/MCWG • Valid Till 2038
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
        </div>

        {/* 3. Revenue & Land Records (Bhoomi LRS) */}
        <div className="p-4 sm:p-5 bg-white border-2 border-slate-200 hover:border-blue-400 rounded-2xl flex items-center justify-between gap-4 shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0 shadow-2xs">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-slate-900 font-serif">State Land Revenue Record (RoR)</span>
                <span className="text-xs sm:text-sm font-bold text-gov-800 bg-gov-100 border border-gov-300 px-2.5 py-0.5 rounded-md">
                  Bhoomi LRS
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-slate-700 font-medium mt-1 leading-normal">
                Plot 402/A • Cadastral Survey RoR Verified • Zero Physical Copies
              </p>
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
        </div>
      </div>

      {/* Statutory Footer with Cryptographic Seal */}
      <div className="pt-3.5 sm:pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-700 relative z-10">
        <div className="flex items-center gap-2 text-emerald-800 font-bold">
          <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <span>DPDP Act 2023 Governed</span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-gov-950 font-bold bg-gov-50 border border-gov-300 px-3 py-1 rounded-lg shadow-2xs text-sm">
            62% Paperwork Eliminated
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700 font-semibold">IT Act 2000 §4 & §5</span>
        </div>
      </div>
    </div>
  );
};
