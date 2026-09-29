import React, { useState, useEffect } from 'react';
import {
  Sparkles, Play, CheckCircle2, ShieldCheck, Database, Server,
  Lock, RefreshCw, Zap, ArrowRight, Check, Activity, FileCheck, Landmark,
  Clock, FileText, CheckCircle, AlertCircle, ArrowUpRight, Award, UserCheck
} from 'lucide-react';

interface SimulationScenario {
  id: string;
  title: string;
  category: string;
  sourcePlatform: string;
  targetPlatform: string;
  totalFields: number;
  autoReusedFields: number;
  timeReduction: string;
  oldProcessingTime: string;
  oldPhysicalCopies: number;
  oldOfficeVisits: number;
  description: string;
  fieldsList: { name: string; source: string; status: 'AUTO_FILLED' | 'MANUAL'; description: string }[];
}

const scenarios: SimulationScenario[] = [
  {
    id: 'prop-tax',
    title: 'Property Tax Assessment & Bhoomi Land Mutation',
    category: 'MUNICIPAL & REVENUE',
    sourcePlatform: 'Bhoomi LRS (Revenue Department)',
    targetPlatform: 'e-NagarPalika (Municipal Administration)',
    totalFields: 8,
    autoReusedFields: 6,
    timeReduction: '2.4 Minutes',
    oldProcessingTime: '14 to 21 Days',
    oldPhysicalCopies: 5,
    oldOfficeVisits: 4,
    description: 'When applying for property tax assessment, SAMAVAY securely queries the state land registry so you never need to photocopy title deeds or survey maps.',
    fieldsList: [
      { name: 'Cadastral Survey & Khata Number', source: 'Bhoomi LRS Registry', status: 'AUTO_FILLED', description: 'Authoritative land parcel record' },
      { name: 'Khata & Legal Title Holder Name', source: 'Bhoomi LRS Registry', status: 'AUTO_FILLED', description: 'Matched with registered deed' },
      { name: 'Aadhaar Identity (e-KYC)', source: 'UIDAI Sovereign Service', status: 'AUTO_FILLED', description: 'Demographic match verified' },
      { name: 'Property Plot Coordinates & Area', source: 'Bhoomi GIS Registry', status: 'AUTO_FILLED', description: 'Geo-tagged boundary data' },
      { name: 'Encumbrance Certificate Status', source: 'Registration Department', status: 'AUTO_FILLED', description: 'Zero dues / clean title' },
      { name: 'Municipal Ward & Zone Identifier', source: 'e-NagarPalika Master', status: 'AUTO_FILLED', description: 'Jurisdiction auto-mapped' },
      { name: 'Current Occupancy (Owner/Tenant)', source: 'Citizen Direct Entry', status: 'MANUAL', description: 'Simple 1-click selection' },
      { name: 'Floor Construction Year', source: 'Citizen Direct Entry', status: 'MANUAL', description: 'Self-declared value' },
    ]
  },
  {
    id: 'transport-noc',
    title: 'Driving Licence Renewal & Inter-State Vehicle NOC',
    category: 'TRANSPORT',
    sourcePlatform: 'SARATHI 4.0 & VAHAN Engine',
    targetPlatform: 'State Transport Department',
    totalFields: 6,
    autoReusedFields: 5,
    timeReduction: '90 Seconds',
    oldProcessingTime: '7 to 12 Days',
    oldPhysicalCopies: 4,
    oldOfficeVisits: 3,
    description: 'Renew your driving licence or obtain a vehicle NOC without standing in RTO lines. Existing valid biometrics, PUCC, and insurance are verified digitally.',
    fieldsList: [
      { name: 'Existing DL Number & Biometrics', source: 'SARATHI 4.0 Central DB', status: 'AUTO_FILLED', description: 'Validated licence record' },
      { name: 'Vehicle Chassis & Engine Number', source: 'VAHAN National Registry', status: 'AUTO_FILLED', description: 'RC records cross-verified' },
      { name: 'PUCC Emission Test Token', source: 'MoRTH Gateway', status: 'AUTO_FILLED', description: 'Valid digital pollution token' },
      { name: 'Motor Insurance Policy Hash', source: 'IIB Gateway', status: 'AUTO_FILLED', description: 'Active policy verified' },
      { name: 'Permanent Residential Address', source: 'DigiLocker / Aadhaar', status: 'AUTO_FILLED', description: 'Proof of residence verified' },
      { name: 'Self-Medical Fitness Declaration', source: 'Citizen Direct Entry', status: 'MANUAL', description: 'Standard Form 1-A check' },
    ]
  },
  {
    id: 'welfare-scheme',
    title: 'Farmer Welfare & PM-KISAN Benefit Transfer',
    category: 'AGRICULTURE & WELFARE',
    sourcePlatform: 'PM-KISAN & State Agriculture Registry',
    targetPlatform: 'Direct Benefit Transfer (DBT)',
    totalFields: 7,
    autoReusedFields: 6,
    timeReduction: '3 Minutes',
    oldProcessingTime: '21 to 30 Days',
    oldPhysicalCopies: 6,
    oldOfficeVisits: 5,
    description: 'Farmers access fertilizer subsidies and direct income support with zero paperwork. Land holdings and Aadhaar-seeded bank accounts are pre-verified.',
    fieldsList: [
      { name: 'Farmer Land Holding & Acreage', source: 'Bhoomi LRS Registry', status: 'AUTO_FILLED', description: 'Verified cultivable land' },
      { name: 'Aadhaar Linked Bank Account (NPCI)', source: 'PFMS Sovereign Gateway', status: 'AUTO_FILLED', description: 'Direct credit account active' },
      { name: 'PM-KISAN Beneficiary ID', source: 'State Agri Registry', status: 'AUTO_FILLED', description: 'Registered farmer record' },
      { name: 'Soil Nutrient Test Score', source: 'Soil Health Portal', status: 'AUTO_FILLED', description: 'Latest regional lab result' },
      { name: 'Crop Season Details', source: 'State Agri GIS Registry', status: 'AUTO_FILLED', description: 'Kharif / Rabi seasonal crop' },
      { name: 'Aadhaar Demographic Proof', source: 'UIDAI Sovereign Service', status: 'AUTO_FILLED', description: 'Biometric verification passed' },
      { name: 'Fertilizer Preference & Quantity', source: 'Citizen Direct Entry', status: 'MANUAL', description: 'Seasonal requirement' },
    ]
  }
];

export const NationalInteroperabilityShowcase: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(scenarios[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);

  const runSimulation = () => {
    setIsRunning(true);
    setSimStep(1);

    setTimeout(() => {
      setSimStep(2);
    }, 700);

    setTimeout(() => {
      setSimStep(3);
    }, 1400);

    setTimeout(() => {
      setSimStep(4);
      setIsRunning(false);
    }, 2200);
  };

  useEffect(() => {
    setSimStep(0);
  }, [selectedScenario]);

  const minimizationPercentage = Math.round((selectedScenario.autoReusedFields / selectedScenario.totalFields) * 100);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card p-6 sm:p-10 space-y-8 relative overflow-hidden">
      {/* Decorative subtle background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-gov-800 uppercase tracking-widest bg-gov-50 px-3 py-1 rounded-full border border-gov-200/70 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gov-700" />
              National DPI Interoperability Demo
            </span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Citizen Evaluator
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900 tracking-tight">
            See How Unified Registries Eliminate Paperwork
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Select a common citizen transaction below to experience how SAMAVAY securely queries official government registries with your consent — saving you days of office visits and photo-copy runs.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="px-6 py-3.5 bg-gov-800 hover:bg-gov-900 text-white font-bold text-xs rounded-2xl shadow-gov hover:shadow-gov-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 flex-shrink-0"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Verifying Registries...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current text-saffron-400" />
              <span>Run Live Auto-Verification</span>
            </>
          )}
        </button>
      </div>

      {/* Scenario Selector Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenario(sc)}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gov-50/70 border-gov-600 ring-2 ring-gov-600/20 shadow-sm'
                  : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gov-800 uppercase tracking-wider block">
                  {sc.category}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-gov-700" />
                )}
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-serif mt-1 line-clamp-1">{sc.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {sc.description}
              </p>
              <div className="flex justify-between items-center text-[11px] text-slate-600 mt-3 pt-2.5 border-t border-slate-200/70 font-medium">
                <span className="text-gov-800 font-bold">{sc.autoReusedFields} of {sc.totalFields} Fields Auto-Filled</span>
                <span className="text-emerald-700 font-bold">⏱️ {sc.timeReduction}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Comparison Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Real-Time Form Auto-Fill Visualizer */}
        <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200 rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-serif">
                Citizen Form Field Breakdown
              </h4>
              <p className="text-[11px] text-slate-500">
                Authoritative data safely pulled with DPDP Act purpose-bound consent
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-emerald-700">{minimizationPercentage}%</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Paperwork Saved</span>
            </div>
          </div>

          {/* Clean Progress Meter */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-600 font-medium">
              <span>Auto-Verification Progress</span>
              <span className="font-bold text-gov-800">
                {simStep >= 3 ? `${selectedScenario.autoReusedFields} of ${selectedScenario.totalFields} Fields Auto-Populated` : simStep > 0 ? 'Connecting to Sovereign Bus...' : 'Ready to simulate'}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-gov-700 via-gov-600 to-emerald-600 h-full rounded-full transition-all duration-700"
                style={{ width: simStep >= 3 ? `${minimizationPercentage}%` : simStep === 2 ? '45%' : simStep === 1 ? '20%' : '5%' }}
              />
            </div>
          </div>

          {/* Field Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
            {selectedScenario.fieldsList.map((f, idx) => {
              const isAuto = f.status === 'AUTO_FILLED';
              const isRevealed = simStep >= 3;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-2.5 transition-all duration-300 ${
                    isRevealed && isAuto
                      ? 'bg-emerald-50/80 border-emerald-300/80 text-emerald-950 shadow-2xs'
                      : isRevealed && !isAuto
                      ? 'bg-blue-50/60 border-blue-200/80 text-blue-950'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="truncate flex-1">
                    <span className="font-bold block truncate text-slate-900">{f.name}</span>
                    <span className="text-[10px] text-slate-500 truncate block mt-0.5">{f.source}</span>
                  </div>
                  <span className="flex-shrink-0">
                    {isRevealed && isAuto ? (
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Auto-Filled
                      </span>
                    ) : isRevealed && !isAuto ? (
                      <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        User Input
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px] font-medium">Ready</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="p-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <p className="text-[11px] leading-relaxed">
              <strong>Zero Duplicate Document Uploads:</strong> You only review pre-verified data and input new information once.
            </p>
          </div>
        </div>

        {/* Right Column: Citizen Impact & Security Stepper */}
        <div className="lg:col-span-5 space-y-4">
          {/* Before vs After Impact Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-gov-700" />
              Citizen Impact Comparison
            </h4>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Old Way */}
              <div className="p-3.5 bg-red-50/60 border border-red-200/70 rounded-2xl space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
                  Traditional Process
                </span>
                <p className="text-base font-extrabold text-red-900 font-mono">
                  {selectedScenario.oldProcessingTime}
                </p>
                <div className="text-[11px] text-red-700/90 space-y-1 pt-1 border-t border-red-200/50">
                  <p>• {selectedScenario.oldOfficeVisits} In-person office visits</p>
                  <p>• {selectedScenario.oldPhysicalCopies} Physical paper copies</p>
                  <p>• Repetitive manual typing</p>
                </div>
              </div>

              {/* SAMAVAY Way */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-300/80 rounded-2xl space-y-1.5 shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  With SAMAVAY DPI
                </span>
                <p className="text-base font-extrabold text-emerald-900 font-mono">
                  {selectedScenario.timeReduction}
                </p>
                <div className="text-[11px] text-emerald-800 space-y-1 pt-1 border-t border-emerald-200/60 font-medium">
                  <p>• 100% Online from home</p>
                  <p>• 0 Photocopies needed</p>
                  <p>• Instant digital certificate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Step Verification Journey */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                Live Verification Pipeline
              </h4>
              <span className="text-[10px] text-slate-400 font-medium">DPDP Act Compliant</span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Step 1 */}
              <div className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                simStep >= 1 ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                  simStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                }`}>
                  1
                </div>
                <div>
                  <span className="font-bold block text-slate-900">1-Click Purpose Consent</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Citizen grants strictly scoped permission for this transaction under DPDP Act 2023.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                simStep >= 2 ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                  simStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                }`}>
                  2
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Authoritative Registry Query</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Encrypted handshake with {selectedScenario.sourcePlatform}.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                simStep >= 3 ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                  simStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                }`}>
                  3
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Form Auto-Populated</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    {selectedScenario.autoReusedFields} fields pre-verified with official government seal.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className={`p-3 rounded-2xl border transition-all flex items-start gap-3 ${
                simStep >= 4 ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                  simStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-600'
                }`}>
                  4
                </div>
                <div>
                  <span className="font-bold block text-slate-900">Dispatched & Certified</span>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Delivered to {selectedScenario.targetPlatform} in under {selectedScenario.timeReduction}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
