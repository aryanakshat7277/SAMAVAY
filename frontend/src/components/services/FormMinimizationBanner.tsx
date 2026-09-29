import React from 'react';
import { ShieldCheck, CheckCircle2, FileText, ArrowRight, Database } from 'lucide-react';

interface FormMinimizationBannerProps {
  totalRequired: number;
  automaticallyAvailable: number;
  neededFromCitizen: number;
}

export const FormMinimizationBanner: React.FC<FormMinimizationBannerProps> = ({
  totalRequired = 8,
  automaticallyAvailable = 5,
  neededFromCitizen = 3
}) => {
  return (
    <div className="bg-gradient-to-r from-gov-50 via-emerald-50/70 to-gov-50 border-2 border-gov-300 rounded-3xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gov-700 text-white flex items-center justify-center shadow-gov">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-black text-stone-900 font-serif">
              Information Minimization Engine Active
            </h4>
            <p className="text-xs text-gov-900 font-medium">
              Verified from connected government registries with zero repeated entry.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-full shadow-xs">
          62% Zero-Entry Benefit
        </span>
      </div>

      {/* 3-Column Reduction Metric Pill */}
      <div className="grid grid-cols-3 gap-2.5 pt-1 text-center text-xs">
        <div className="p-3 bg-white border border-stone-200 rounded-2xl shadow-xs">
          <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Total Required</span>
          <span className="font-mono font-black text-stone-800 text-lg">{totalRequired} Fields</span>
          <span className="text-[10px] text-stone-500 block font-medium">Statutory Standard</span>
        </div>

        <div className="p-3 bg-gov-100/70 border border-gov-300 rounded-2xl shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gov-800 block tracking-wider">Pre-Verified</span>
          <span className="font-mono font-black text-gov-900 text-lg">✓ {automaticallyAvailable} Fields</span>
          <span className="text-[10px] text-gov-800 font-bold block">Auto-Reused</span>
        </div>

        <div className="p-3 bg-saffron-50 border border-saffron-300 rounded-2xl shadow-xs">
          <span className="text-[10px] uppercase font-bold text-saffron-800 block tracking-wider">Needed From You</span>
          <span className="font-mono font-black text-saffron-900 text-lg">{neededFromCitizen} Fields</span>
          <span className="text-[10px] text-saffron-800 font-bold block">1 Short Step</span>
        </div>
      </div>
    </div>
  );
};
