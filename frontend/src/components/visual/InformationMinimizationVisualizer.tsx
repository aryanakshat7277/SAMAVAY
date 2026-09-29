import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Database,
  Zap,
  Lock,
  ArrowRight,
  Info,
  Clock
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface FieldItem {
  id: string;
  name: string;
  source: string;
  status: 'AUTO_FILLED' | 'REQUIRED_INPUT';
  latency?: string;
  legalBasis?: string;
}

export const InformationMinimizationVisualizer: React.FC<{ serviceName?: string }> = ({
  serviceName = 'Property Tax Assessment & NOC'
}) => {
  const [selectedField, setSelectedField] = useState<FieldItem | null>(null);

  const fields: FieldItem[] = [
    { id: '1', name: 'Citizen Name & Aadhaar Hash', source: 'DigiLocker Identity Vault', status: 'AUTO_FILLED', latency: '120ms', legalBasis: 'Aadhaar Act 2016 §4(3)' },
    { id: '2', name: 'Land Record of Rights (RoR #42/1A)', source: 'Bhoomi LRS Cadastral DB', status: 'AUTO_FILLED', latency: '240ms', legalBasis: 'Karnataka Land Revenue Act' },
    { id: '3', name: 'Municipal Ward & Assessment ID', source: 'e-NagarPalika Property Registry', status: 'AUTO_FILLED', latency: '180ms', legalBasis: 'Municipal Act 1976' },
    { id: '4', name: 'Primary Mobile Verification Token', source: 'UIDAI OTP Gateway', status: 'AUTO_FILLED', latency: '90ms', legalBasis: 'DPDP Act 2023 §6' },
    { id: '5', name: 'Driving Licence Credential', source: 'SARATHI 4.0 MoRTH', status: 'AUTO_FILLED', latency: '210ms', legalBasis: 'Motor Vehicles Act §9' },
    { id: '6', name: 'Current Floor Area & Usage Type', source: 'Citizen Form Input', status: 'REQUIRED_INPUT' },
    { id: '7', name: 'Annual Rental Valuation Declaration', source: 'Citizen Form Input', status: 'REQUIRED_INPUT' },
    { id: '8', name: 'Applicant Signature Consent', source: 'Citizen Form Input', status: 'REQUIRED_INPUT' },
  ];

  const autoFilledCount = fields.filter((f) => f.status === 'AUTO_FILLED').length;
  const totalCount = fields.length;
  const percentage = Math.round((autoFilledCount / totalCount) * 100);

  return (
    <div className="bg-white border-2 border-gov-300 rounded-3xl p-6 sm:p-8 shadow-card-hover space-y-6">
      {/* Header with 62% Hero Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold text-gov-800 uppercase tracking-wider bg-gov-50 border border-gov-200 px-3 py-1 rounded-full">
              Form Minimization Engine (DPDP §6)
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              62% Auto-Reused
            </span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 font-serif">
            Intelligent Data Availability Breakdown
          </h3>
          <p className="text-xs text-stone-600">
            Authoritative state databases pre-verify <strong>{autoFilledCount} out of {totalCount} fields</strong>, requiring you to enter only <strong>{totalCount - autoFilledCount} missing details</strong>.
          </p>
        </div>

        {/* Circular Progress Gauge */}
        <div className="flex items-center space-x-3 bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-2xl flex-shrink-0">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-stone-200"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-gov-700"
                strokeDasharray={`${percentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-black font-mono text-gov-900">
              <AnimatedCounter end={percentage} suffix="%" />
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Time Saved</span>
            <span className="text-xs font-extrabold text-stone-900">14 Days ➔ 5 Mins</span>
          </div>
        </div>
      </div>

      {/* Visual Multi-Bar Reduction Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-stone-700">
          <span>Total Service Requirements: {totalCount} Records</span>
          <span className="text-gov-800">{autoFilledCount} Auto-Populated • {totalCount - autoFilledCount} Needed</span>
        </div>
        <div className="h-3.5 bg-stone-100 rounded-full overflow-hidden flex p-0.5 border border-stone-200 shadow-inner">
          <div
            style={{ width: `${percentage}%` }}
            className="bg-gradient-to-r from-gov-600 to-gov-700 h-full rounded-full transition-all duration-1000 shadow-xs"
          />
          <div
            style={{ width: `${100 - percentage}%` }}
            className="bg-saffron-400 h-full rounded-full transition-all duration-1000 ml-1 shadow-xs"
          />
        </div>
        <div className="flex justify-between text-[11px] text-stone-500 pt-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gov-700"></span>
            <span>Pre-Verified from Sovereign Registries (62.5%)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-saffron-400"></span>
            <span>Manual Citizen Entry Required (37.5%)</span>
          </span>
        </div>
      </div>

      {/* Interactive Interactive Field Cards Grid */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-stone-800 font-serif block">
          Click on any requirement below to inspect its authoritative data pipeline:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {fields.map((field) => {
            const isAuto = field.status === 'AUTO_FILLED';
            const isSelected = selectedField?.id === field.id;

            return (
              <button
                key={field.id}
                onClick={() => setSelectedField(field)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer space-y-2 ${
                  isSelected
                    ? 'border-gov-700 bg-gov-50/70 ring-4 ring-gov-100 shadow-sm scale-102'
                    : isAuto
                    ? 'border-gov-200 bg-white hover:border-gov-400 hover:shadow-xs'
                    : 'border-saffron-200 bg-saffron-50/30 hover:border-saffron-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  {isAuto ? (
                    <span className="text-[10px] font-bold text-gov-800 bg-gov-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-gov-700" />
                      Auto-Reused
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-saffron-800 bg-saffron-100 px-2 py-0.5 rounded-full">
                      User Input
                    </span>
                  )}
                  {field.latency && (
                    <span className="text-[9px] font-mono text-stone-400">{field.latency}</span>
                  )}
                </div>

                <div>
                  <h5 className="font-bold text-stone-900 line-clamp-1">{field.name}</h5>
                  <p className="text-[10px] text-stone-500 truncate mt-0.5">Source: {field.source}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Field Inspector Drawer / Card */}
      {selectedField && (
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl animate-in fade-in zoom-in-95 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-stone-900 font-serif flex items-center gap-1.5">
              <Database className="w-4 h-4 text-gov-700" />
              <span>Inspection: {selectedField.name}</span>
            </span>
            <button
              onClick={() => setSelectedField(null)}
              className="text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
            <div className="p-2.5 bg-white border border-stone-200 rounded-xl">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Authoritative Source</span>
              <span className="font-bold text-stone-800">{selectedField.source}</span>
            </div>
            <div className="p-2.5 bg-white border border-stone-200 rounded-xl">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Protocol & Security</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                mTLS PKI_X509 Verified
              </span>
            </div>
            <div className="p-2.5 bg-white border border-stone-200 rounded-xl">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">DPDP Legal Basis</span>
              <span className="font-bold text-gov-900">{selectedField.legalBasis || 'Citizen Application Consent'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
