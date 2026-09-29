import React, { useState, useEffect } from 'react';
import {
  Sparkles, Play, CheckCircle2, ShieldCheck, Database, Server,
  Lock, RefreshCw, Zap, ArrowRight, Check, Activity, FileCheck, Landmark
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
  fieldsList: { name: string; source: string; status: 'AUTO_FILLED' | 'MANUAL' }[];
}

const scenarios: SimulationScenario[] = [
  {
    id: 'prop-tax',
    title: 'Property Tax Assessment & Bhoomi Land Mutation',
    category: 'MUNICIPAL & REVENUE',
    sourcePlatform: 'Bhoomi LRS (Revenue & Land)',
    targetPlatform: 'e-NagarPalika Municipal Core',
    totalFields: 8,
    autoReusedFields: 6,
    timeReduction: '14 Days ➔ 2.4 Mins',
    fieldsList: [
      { name: 'Cadastral Survey Number', source: 'Bhoomi LRS', status: 'AUTO_FILLED' },
      { name: 'Khata & Title Holder Name', source: 'Bhoomi LRS', status: 'AUTO_FILLED' },
      { name: 'Aadhaar eKYC Verification', source: 'UIDAI Sovereign Bus', status: 'AUTO_FILLED' },
      { name: 'Property Plot Coordinates', source: 'Bhoomi GIS Registry', status: 'AUTO_FILLED' },
      { name: 'Encumbrance Certificate Status', source: 'Registration Dept', status: 'AUTO_FILLED' },
      { name: 'Municipal Ward ID', source: 'e-NagarPalika', status: 'AUTO_FILLED' },
      { name: 'Current Occupancy Type', source: 'Citizen Direct', status: 'MANUAL' },
      { name: 'Floor Construction Year', source: 'Citizen Direct', status: 'MANUAL' },
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
    timeReduction: '7 Days ➔ 90 Seconds',
    fieldsList: [
      { name: 'Existing DL Number & Biometrics', source: 'SARATHI 4.0', status: 'AUTO_FILLED' },
      { name: 'Vehicle Chassis & Engine No.', source: 'VAHAN Registry', status: 'AUTO_FILLED' },
      { name: 'PUCC Emission Certificate', source: 'MoRTH Gateway', status: 'AUTO_FILLED' },
      { name: 'Motor Insurance Policy Token', source: 'IIB Gateway', status: 'AUTO_FILLED' },
      { name: 'Aadhaar Address Record', source: 'DigiLocker Gateway', status: 'AUTO_FILLED' },
      { name: 'Self-Medical Fitness Declaration', source: 'Citizen Direct', status: 'MANUAL' },
    ]
  },
  {
    id: 'welfare-scheme',
    title: 'Farmer Welfare & Soil Health Card Subsidy',
    category: 'AGRICULTURE & WELFARE',
    sourcePlatform: 'PM-KISAN & State Agri Registry',
    targetPlatform: 'Direct Benefit Transfer (DBT)',
    totalFields: 7,
    autoReusedFields: 6,
    timeReduction: '21 Days ➔ 3 Mins',
    fieldsList: [
      { name: 'Farmer Land Holding Record', source: 'Bhoomi LRS', status: 'AUTO_FILLED' },
      { name: 'Aadhaar Linked Bank Account (NPCI)', source: 'PFMS Gateway', status: 'AUTO_FILLED' },
      { name: 'PM-KISAN Registration ID', source: 'Agri Registry', status: 'AUTO_FILLED' },
      { name: 'Soil Nutrient Test Hash', source: 'Soil Health Portal', status: 'AUTO_FILLED' },
      { name: 'Crop Season Details', source: 'State Agri GIS', status: 'AUTO_FILLED' },
      { name: 'Aadhaar Demographic Proof', source: 'UIDAI', status: 'AUTO_FILLED' },
      { name: 'Fertilizer Requirement Preference', source: 'Citizen Direct', status: 'MANUAL' },
    ]
  }
];

export const NationalInteroperabilityShowcase: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(scenarios[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const runSimulation = () => {
    setIsRunning(true);
    setSimStep(1);
    setTerminalLogs([
      `[INIT] Triggering SAMAVAY Interoperability Core for: ${selectedScenario.title}`,
      `[mTLS] Initiating mutual TLS handshake with ${selectedScenario.sourcePlatform}...`
    ]);

    setTimeout(() => {
      setSimStep(2);
      setTerminalLogs(prev => [
        ...prev,
        `[HANDSHAKE_OK] PKI_X509 Certificate verified. RSA-4096 Sovereign Root established.`,
        `[DPDP] Evaluating Digital Personal Data Protection Act purpose limitation token...`,
        `[CONSENT_GATE] Purpose token #DPDP-2026-VAL validated.`
      ]);
    }, 900);

    setTimeout(() => {
      setSimStep(3);
      setTerminalLogs(prev => [
        ...prev,
        `[QUERY] Querying authoritative data fields from ${selectedScenario.sourcePlatform}...`,
        `[MATCH] ${selectedScenario.autoReusedFields} of ${selectedScenario.totalFields} fields verified with zero manual entry!`,
        `[MINIMIZE] Form requirement reduced by ${Math.round((selectedScenario.autoReusedFields / selectedScenario.totalFields) * 100)}%.`
      ]);
    }, 1800);

    setTimeout(() => {
      setSimStep(4);
      setTerminalLogs(prev => [
        ...prev,
        `[DISPATCH] Orchestration payload sent to ${selectedScenario.targetPlatform}.`,
        `[COMPLETE] Process finished in 42ms. Estimated time saved: ${selectedScenario.timeReduction}.`
      ]);
      setIsRunning(false);
    }, 2700);
  };

  useEffect(() => {
    setSimStep(0);
    setTerminalLogs([]);
  }, [selectedScenario]);

  const minimizationPercentage = Math.round((selectedScenario.autoReusedFields / selectedScenario.totalFields) * 100);

  return (
    <div className="bg-gov-950 text-white rounded-3xl p-6 sm:p-10 shadow-gov-lg border border-gov-800 relative overflow-hidden space-y-8">
      <div className="absolute inset-0 bg-gov-grid opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gov-800/80 pb-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-saffron-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Interactive DPI Simulation Engine
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Evaluator Sandbox
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
            Experience Cross-Platform Interoperability in Action
          </h3>
          <p className="text-xs sm:text-sm text-gov-300 leading-relaxed">
            Select a real-world government transaction to simulate how SAMAVAY queries authoritative state registries, enforces DPDP consent, and eliminates redundant document uploads.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="px-6 py-3.5 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-gov-950 font-black text-xs rounded-2xl shadow-gov hover:shadow-gov-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 flex-shrink-0"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-gov-950" />
              <span>Orchestrating...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current text-gov-950" />
              <span>Simulate Live Interoperability</span>
            </>
          )}
        </button>
      </div>

      {/* Scenario Selector Pills */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3">
        {scenarios.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenario(sc)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gov-900 border-saffron-400 ring-2 ring-saffron-400/30 shadow-gov'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-[10px] font-bold text-saffron-400 uppercase tracking-wider block">
                {sc.category}
              </span>
              <h4 className="font-bold text-sm text-white font-serif mt-1 line-clamp-1">{sc.title}</h4>
              <div className="flex justify-between items-center text-[11px] text-gov-300 mt-2 font-mono">
                <span>{sc.autoReusedFields}/{sc.totalFields} Auto-Reused</span>
                <span className="text-emerald-400 font-bold">{sc.timeReduction}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Dynamic Fields Auto-Population Visualizer */}
        <div className="lg:col-span-7 bg-gov-900/90 border border-gov-800 rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-gov-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white font-serif">Data Field Minimization Status</h4>
              <p className="text-[11px] text-gov-400">Zero duplicate citizen data entry</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black font-mono text-saffron-400">{minimizationPercentage}%</span>
              <span className="text-[10px] text-gov-300 uppercase font-bold">Reduction</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gov-950 h-2.5 rounded-full overflow-hidden border border-gov-800">
            <div
              className="bg-gradient-to-r from-gov-500 via-emerald-400 to-saffron-400 h-full rounded-full transition-all duration-700"
              style={{ width: simStep >= 3 ? `${minimizationPercentage}%` : simStep === 2 ? '40%' : simStep === 1 ? '15%' : '0%' }}
            />
          </div>

          {/* Field Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {selectedScenario.fieldsList.map((f, idx) => {
              const isAuto = f.status === 'AUTO_FILLED';
              const isRevealed = simStep >= 3;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all duration-300 ${
                    isRevealed && isAuto
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                      : isRevealed && !isAuto
                      ? 'bg-saffron-950/40 border-saffron-500/40 text-saffron-200'
                      : 'bg-white/5 border-white/10 text-gov-300'
                  }`}
                >
                  <div className="truncate">
                    <span className="font-bold block truncate">{f.name}</span>
                    <span className="text-[10px] opacity-75 truncate block">{f.source}</span>
                  </div>
                  <span className="flex-shrink-0">
                    {isRevealed && isAuto ? (
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[9px] font-bold">
                        ✓ Auto-Reused
                      </span>
                    ) : isRevealed && !isAuto ? (
                      <span className="bg-saffron-500/20 text-saffron-300 border border-saffron-500/30 px-2 py-0.5 rounded text-[9px] font-bold">
                        Citizen Entry
                      </span>
                    ) : (
                      <span className="text-gov-500 text-[10px] font-mono">Pending</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live Telemetry Terminal & Gateway Pulse */}
        <div className="lg:col-span-5 bg-gov-950 border border-gov-800 rounded-3xl p-6 space-y-4 font-mono text-xs shadow-inner">
          <div className="flex items-center justify-between border-b border-gov-800 pb-3 font-sans">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h4 className="text-xs font-bold text-white font-serif">Gateway Telemetry Terminal</h4>
            </div>
            <span className="text-[10px] font-mono text-gov-400">mTLS PKI_X509</span>
          </div>

          <div className="h-56 overflow-y-auto space-y-1.5 text-[11px] text-gov-300 leading-relaxed pr-1 select-all">
            {terminalLogs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gov-500 font-sans space-y-2">
                <Database className="w-8 h-8 text-gov-700 animate-pulse" />
                <p>Click "Simulate Live Interoperability" above to trigger telemetry stream.</p>
              </div>
            ) : (
              terminalLogs.map((log, i) => (
                <div key={i} className="animate-fade-in flex items-start gap-1.5">
                  <span className="text-saffron-400 font-bold">›</span>
                  <span className={log.includes('HANDSHAKE_OK') || log.includes('COMPLETE') ? 'text-emerald-400 font-bold' : log.includes('DPDP') ? 'text-saffron-300' : 'text-gov-200'}>
                    {log}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Bottom stats summary */}
          <div className="pt-3 border-t border-gov-800 grid grid-cols-2 gap-2 text-[10px] text-gov-400 font-sans">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>DPDP Act 2023 Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-saffron-400" />
              <span>42ms Packet Latency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
