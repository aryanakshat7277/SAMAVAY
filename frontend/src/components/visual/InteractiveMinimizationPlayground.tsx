import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  Zap,
  Layers,
  ArrowRight,
  Database,
  Building2,
  Car,
  Landmark,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Button } from '../common/Button';

interface ServiceDemoScenario {
  id: string;
  name: string;
  dept: string;
  category: string;
  icon: string;
  totalFields: number;
  reusedFields: number;
  reusedSources: string[];
  reusedFieldNames: string[];
  citizenFields: string[];
  oldTimeDays: string;
  newTimeMins: string;
  oldCopiesNeeded: number;
  newCopiesNeeded: number;
}

export const InteractiveMinimizationPlayground: React.FC = () => {
  const scenarios: ServiceDemoScenario[] = [
    {
      id: 'property-tax',
      name: 'Property Tax Assessment & Mutation',
      dept: 'Revenue & Municipal Administration',
      category: 'Land & Property',
      icon: '🏛️',
      totalFields: 8,
      reusedFields: 5,
      reusedSources: ['Bhoomi LRS', 'DigiLocker', 'UIDAI e-KYC'],
      reusedFieldNames: [
        'Cadastral Khata & Plot #',
        'Registered Owner Legal Name',
        'Verified Aadhaar Identity',
        'Property Boundary Dimension',
        'Prior Tax Clearance Certificate'
      ],
      citizenFields: ['Current Occupancy Type', 'Water Meter Number', 'Contact Mobile'],
      oldTimeDays: '14–21 Days',
      newTimeMins: '90 Seconds',
      oldCopiesNeeded: 4,
      newCopiesNeeded: 0
    },
    {
      id: 'driving-licence',
      name: 'Driving Licence Renewal & Address Update',
      dept: 'Transport Department',
      category: 'Transport',
      icon: '🚗',
      totalFields: 7,
      reusedFields: 5,
      reusedSources: ['SARATHI 4.0', 'UIDAI Aadhaar', 'DigiLocker'],
      reusedFieldNames: [
        'Existing DL Number & Class',
        'Permanent Residential Address',
        'Medical Fitness Certificate Hash',
        'Digital Biometric Photograph',
        'Traffic E-Challan Clearance'
      ],
      citizenFields: ['Emergency Contact Person', 'Organ Donation Opt-in'],
      oldTimeDays: '7–12 Days',
      newTimeMins: '45 Seconds',
      oldCopiesNeeded: 3,
      newCopiesNeeded: 0
    },
    {
      id: 'farmer-subsidy',
      name: 'PM-KISAN Direct Farmer Assistance',
      dept: 'Agriculture & Social Welfare',
      category: 'Welfare',
      icon: '🌾',
      totalFields: 9,
      reusedFields: 6,
      reusedSources: ['Bhoomi LRS', 'PFMS', 'NPCI Aadhaar Bridge'],
      reusedFieldNames: [
        'Survey Land Holding Records',
        'Cultivable Acreage Verification',
        'Aadhaar-Seeded Bank Account',
        'PM-KISAN Beneficiary ID',
        'Kisan Credit Card Status',
        'Direct DBT Verification Hash'
      ],
      citizenFields: ['Crop Type for Current Season', 'Irrigation Source', 'Mobile OTP'],
      oldTimeDays: '30 Days',
      newTimeMins: '2 Minutes',
      oldCopiesNeeded: 5,
      newCopiesNeeded: 0
    }
  ];

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('property-tax');
  const [isRunningProbe, setIsRunningProbe] = useState(false);
  const [probeStep, setProbeStep] = useState<number>(0);
  const [probeCompleted, setProbeCompleted] = useState<boolean>(true);

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const handleRunSimulation = () => {
    setIsRunningProbe(true);
    setProbeCompleted(false);
    setProbeStep(1);

    setTimeout(() => setProbeStep(2), 600);
    setTimeout(() => setProbeStep(3), 1200);
    setTimeout(() => setProbeStep(4), 1800);
    setTimeout(() => {
      setIsRunningProbe(false);
      setProbeCompleted(true);
    }, 2400);
  };

  const reusePercentage = Math.round((activeScenario.reusedFields / activeScenario.totalFields) * 100);

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-card p-6 lg:p-8 space-y-6">
      {/* Header with Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-50 border border-saffron-200 text-saffron-800 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-saffron-600" />
            <span>Interactive SIH Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            Form Minimization & Interoperability Playground
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Experience how SAMAVAY queries sovereign registries to eliminate duplicate citizen inputs in real time.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRunSimulation}
          disabled={isRunningProbe}
          className="self-start sm:self-center px-4 py-2.5 rounded-xl bg-gov-800 hover:bg-gov-900 disabled:bg-gov-700 text-white font-bold text-xs shadow-gov flex items-center gap-2 transition-all cursor-pointer"
        >
          {isRunningProbe ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Querying Registries ({probeStep}/4)...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-saffron-400 fill-current" />
              <span>Simulate Live Probe</span>
            </>
          )}
        </button>
      </div>

      {/* Service Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map((sc) => {
          const isSelected = sc.id === activeScenario.id;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenarioId(sc.id);
                setProbeCompleted(true);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-gov-50 border-gov-600 text-gov-900 shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              <span className="text-base">{sc.icon}</span>
              <div className="text-left">
                <span className="block">{sc.name}</span>
                <span className="text-[10px] text-stone-400 font-normal">{sc.dept}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Probe Pipeline Telemetry (Animated when simulating) */}
      {isRunningProbe && (
        <div className="p-4 bg-gov-950 text-white rounded-2xl border border-gov-800 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between text-xs border-b border-gov-800 pb-2">
            <span className="font-mono text-saffron-400 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              mTLS Interoperability Gateway Dispatch
            </span>
            <span className="font-mono text-[10px] text-stone-400">Target: {activeScenario.name}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
            <div className={`p-2.5 rounded-xl border transition-all ${probeStep >= 1 ? 'bg-gov-900 border-emerald-500/50 text-emerald-300' : 'bg-gov-950 border-gov-800 text-stone-500'}`}>
              <span className="font-mono text-[10px] block">STEP 01</span>
              <p className="font-bold">DPDP Purpose Gating</p>
              <p className="text-[10px] opacity-80">Sec 7 Consent Verified</p>
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${probeStep >= 2 ? 'bg-gov-900 border-emerald-500/50 text-emerald-300' : 'bg-gov-950 border-gov-800 text-stone-500'}`}>
              <span className="font-mono text-[10px] block">STEP 02</span>
              <p className="font-bold">Bhoomi / SARATHI</p>
              <p className="text-[10px] opacity-80">Cadastral Hash in 38ms</p>
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${probeStep >= 3 ? 'bg-gov-900 border-emerald-500/50 text-emerald-300' : 'bg-gov-950 border-gov-800 text-stone-500'}`}>
              <span className="font-mono text-[10px] block">STEP 03</span>
              <p className="font-bold">DigiLocker / UIDAI</p>
              <p className="text-[10px] opacity-80">Title Deed Matched</p>
            </div>
            <div className={`p-2.5 rounded-xl border transition-all ${probeStep >= 4 ? 'bg-gov-900 border-emerald-500/50 text-emerald-300' : 'bg-gov-950 border-gov-800 text-stone-500'}`}>
              <span className="font-mono text-[10px] block">STEP 04</span>
              <p className="font-bold">Form Minimization</p>
              <p className="text-[10px] opacity-80">{activeScenario.reusedFields} Fields Suppressed</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Comparison Grid: Traditional vs SAMAVAY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Traditional Fragmented Way */}
        <div className="lg:col-span-5 bg-stone-50 border border-red-200/80 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span>❌</span> Traditional Process
              </span>
              <span className="text-[10px] text-stone-500 font-bold">4 Disconnected Portals</span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-2xl font-black text-red-600 font-mono">{activeScenario.totalFields}</span>
                <p className="text-[10px] text-stone-500 font-medium mt-0.5">Manual Inputs Needed</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-2xl font-black text-red-600 font-mono">{activeScenario.oldCopiesNeeded}</span>
                <p className="text-[10px] text-stone-500 font-medium mt-0.5">Photocopies Uploaded</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                Required Manual Typing:
              </span>
              <ul className="space-y-1.5 text-stone-600 text-[11px]">
                {activeScenario.reusedFieldNames.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-stone-200 text-red-950">
                    <span className="text-red-500 font-bold">✍️</span>
                    <span>{f} (Must retype manually)</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-xs font-bold text-stone-600">
            <span>Average Processing Delay:</span>
            <span className="text-red-700 font-mono text-sm">{activeScenario.oldTimeDays}</span>
          </div>
        </div>

        {/* Center: Transformation Bridge Arrow */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center gap-2 py-4">
          <div className="w-12 h-12 rounded-2xl bg-gov-800 text-white flex items-center justify-center font-bold shadow-gov">
            <Zap className="w-6 h-6 text-saffron-400 fill-current animate-pulse" />
          </div>
          <span className="text-[10px] font-mono font-bold text-gov-800 uppercase tracking-widest text-center">
            SAMAVAY DPI
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black font-mono">
            +{reusePercentage}% AUTO
          </span>
        </div>

        {/* Right: SAMAVAY Sovereign Interoperable Way */}
        <div className="lg:col-span-5 bg-gov-50/70 border-2 border-emerald-500/50 rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <span>✅</span> SAMAVAY Sovereign Mesh
              </span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-black px-2 py-0.5 rounded-full font-mono">
                {reusePercentage}% REUSED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
                <span className="text-2xl font-black text-emerald-700 font-mono">{activeScenario.reusedFields}</span>
                <p className="text-[10px] text-stone-600 font-medium mt-0.5">Pre-Verified from Registries</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
                <span className="text-2xl font-black text-saffron-600 font-mono">{activeScenario.citizenFields.length}</span>
                <p className="text-[10px] text-stone-600 font-medium mt-0.5">Missing Inputs Left</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">
                Auto-Retrieved via DPDP Token:
              </span>
              <ul className="space-y-1.5 text-stone-700 text-[11px]">
                {activeScenario.reusedFieldNames.map((f, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-white/90 p-2 rounded-lg border border-emerald-200 text-emerald-900">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="font-medium">{f}</span>
                    </span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-mono px-1.5 py-0.5 rounded font-bold">
                      VERIFIED
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-emerald-200 flex justify-between items-center text-xs font-bold text-stone-700">
            <span>Execution Delivery:</span>
            <span className="text-emerald-700 font-mono text-sm">{activeScenario.newTimeMins} (Instant)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
