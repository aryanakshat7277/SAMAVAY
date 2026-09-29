import React, { useState } from 'react';
import {
  XCircle,
  CheckCircle2,
  Layers,
  ArrowRight,
  FileText,
  Building2,
  Server,
  Lock,
  Users
} from 'lucide-react';
import { Card } from './Card';

export const ScrollStorytellingSection: React.FC = () => {
  const [activeStoryStage, setActiveStoryStage] = useState<'BEFORE' | 'AFTER'>('AFTER');

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gov-800 bg-gov-50 border border-gov-200 px-3.5 py-1 rounded-full inline-block">
          INTEROPERABILITY STORYTELLING
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          The Transformation in Citizen Experience
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Compare the traditional fragmented government maze with the unified SAMAVAY Digital Public Infrastructure.
        </p>

        {/* Interactive Toggle Switch */}
        <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl shadow-inner mt-2">
          <button
            onClick={() => setActiveStoryStage('BEFORE')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStoryStage === 'BEFORE'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            ✕ The Fragmented Problem Today
          </button>
          <button
            onClick={() => setActiveStoryStage('AFTER')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeStoryStage === 'AFTER'
                ? 'bg-gov-700 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            ✓ SAMAVAY Connected Solution
          </button>
        </div>
      </div>

      {/* Story Stage Container */}
      {activeStoryStage === 'BEFORE' ? (
        /* BEFORE VIEW */
        <div className="bg-white border-2 border-rose-200 rounded-3xl p-6 sm:p-10 shadow-card space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold flex-shrink-0">
                <XCircle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">
                  TRADITIONAL DISCONNECTED ARCHITECTURE
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  Citizens Visiting 4+ Independent Portals
                </h3>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full self-start md:self-auto">
              High Citizen Burden & Form Duplication
            </span>
          </div>

          {/* 3 Siloed Portals Visual */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-5 bg-rose-50/50 border border-rose-200 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-900 text-base">Portal 1: Revenue</span>
                <span className="text-xs bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded">Isolated</span>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm">Separate login, manual land deed scanning, physical inquiry.</p>
              <div className="p-3 bg-white border border-rose-100 rounded-xl font-mono text-xs text-slate-600 space-y-1">
                <div>• Enters Name & Aadhaar #</div>
                <div>• Enters Address Proof</div>
                <div>• Uploads Survey Map</div>
              </div>
            </div>

            <div className="p-5 bg-rose-50/50 border border-rose-200 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-900 text-base">Portal 2: Municipal</span>
                <span className="text-xs bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded">Isolated</span>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm">Repeated form entry for property assessment and tax clearance.</p>
              <div className="p-3 bg-white border border-rose-100 rounded-xl font-mono text-xs text-slate-600 space-y-1">
                <div className="text-rose-700 font-bold">⚠️ RE-ENTERS SAME Name & Aadhaar</div>
                <div className="text-rose-700 font-bold">⚠️ RE-UPLOADS Address Proof</div>
                <div>• Enters Ward ID</div>
              </div>
            </div>

            <div className="p-5 bg-rose-50/50 border border-rose-200 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-rose-900 text-base">Portal 3: Transport</span>
                <span className="text-xs bg-rose-200 text-rose-900 font-bold px-2 py-0.5 rounded">Isolated</span>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm">Separate credential, physical NOC submission at local RTO.</p>
              <div className="p-3 bg-white border border-rose-100 rounded-xl font-mono text-xs text-slate-600 space-y-1">
                <div className="text-rose-700 font-bold">⚠️ RE-ENTERS SAME Details (3rd Time)</div>
                <div>• Physical Driving Record Verification</div>
                <div>• 14–21 Days Processing Queue</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* AFTER VIEW (SAMAVAY) */
        <div className="bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-10 shadow-card space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  SAMAVAY INTEROPERABILITY DPI
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                  1 Touchpoint • 62% Authoritative Information Reused
                </h3>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start md:self-auto">
              Automated mTLS Verification & DPDP Compliant
            </span>
          </div>

          {/* Unified Architecture Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch text-sm">
            {/* Step 1: Citizen */}
            <div className="md:col-span-4 p-5 bg-gov-50/80 border border-gov-200 rounded-2xl space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-gov-800 uppercase tracking-wider block">Single Touchpoint</span>
                <h4 className="text-base font-bold text-slate-900 font-serif">1 Citizen Portal & Account</h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Citizen selects any service. Identity, land records, and vehicle particulars are checked simultaneously.
                </p>
              </div>
            </div>

            {/* Step 2: SAMAVAY Mesh */}
            <div className="md:col-span-4 p-5 bg-gradient-to-br from-amber-50/90 via-white to-orange-50/60 border-2 border-saffron-400 text-slate-900 rounded-2xl space-y-2 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Interoperability Core</span>
                  <Layers className="w-4 h-4 text-amber-700" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-serif">Sovereign Interoperability Gateway</h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Reuses 5 authoritative details from Bhoomi & Municipal platforms. Dynamic forms ask only for 2 missing inputs.
                </p>
              </div>
            </div>

            {/* Step 3: Fast Completion */}
            <div className="md:col-span-4 p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Digital Delivery</span>
                <h4 className="text-base font-bold text-slate-900 font-serif">Instant Verification & Certificate</h4>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Time reduced from 14 days to 5 minutes. Certificate digitally signed and synced to DigiLocker.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
