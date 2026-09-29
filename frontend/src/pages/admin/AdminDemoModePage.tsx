import React, { useState } from 'react';
import { demoApi } from '../../services/api';
import { DemoScenarioResultDto } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ShieldAlert,
  Server,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Terminal,
  Activity
} from 'lucide-react';

export const AdminDemoModePage: React.FC = () => {
  const [runningScenarioId, setRunningScenarioId] = useState<number | null>(null);
  const [scenarioResults, setScenarioResults] = useState<{ [key: number]: DemoScenarioResultDto }>({});
  const [selectedPlatform, setSelectedPlatform] = useState<string>('BHOOMI-LRS');
  const [selectedMode, setSelectedMode] = useState<string>('NORMAL');
  const [modeMessage, setModeMessage] = useState<string | null>(null);

  const scenarios = [
    {
      id: 1,
      name: 'Scenario 1: Successful Interoperability',
      badge: 'NORMAL FLOW',
      desc: 'All connected sovereign platforms respond successfully. Cadastral records matched and verified with zero duplicate entry.',
      buttonText: 'Execute Scenario 1'
    },
    {
      id: 2,
      name: 'Scenario 2: Citizen DPDP Consent Required',
      badge: 'CONSENT ENFORCEMENT',
      desc: 'Protected biometric/identity record queried without prior citizen authorization. System pauses and requests citizen consent.',
      buttonText: 'Execute Scenario 2'
    },
    {
      id: 3,
      name: 'Scenario 3: Dynamic Missing Information Collection',
      badge: 'FORM MINIMIZATION',
      desc: 'Government platforms provide 5 verified fields; dynamic form suppresses them and asks citizen for only 1 missing field.',
      buttonText: 'Execute Scenario 3'
    },
    {
      id: 4,
      name: 'Scenario 4: Platform Failure & Automatic Failover',
      badge: 'RESILIENCE & FAILOVER',
      desc: 'Primary transport node experiences timeout. Fallback Strategy automatically engages DigiLocker sovereign proxy.',
      buttonText: 'Execute Scenario 4'
    },
    {
      id: 5,
      name: 'Scenario 5: Service Impact Analysis',
      badge: 'DEPENDENCY EVALUATION',
      desc: 'Upstream land records cluster experiences latency elevation. Health Engine analyzes 3 downstream affected citizen services.',
      buttonText: 'Execute Scenario 5'
    }
  ];

  const handleRunScenario = async (scenarioId: number) => {
    setRunningScenarioId(scenarioId);
    try {
      const result = await demoApi.runScenario(scenarioId);
      setScenarioResults((prev) => ({ ...prev, [scenarioId]: result }));
    } finally {
      setRunningScenarioId(null);
    }
  };

  const handleApplyPlatformMode = async () => {
    await demoApi.setPlatformMode(selectedPlatform, selectedMode);
    setModeMessage(`Platform ${selectedPlatform} simulation mode configured to ${selectedMode}`);
    setTimeout(() => setModeMessage(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="SMART INDIA HACKATHON 2026 EVALUATION ENGINE"
        categoryIcon={Sparkles}
        title="Interactive SIH Demonstration Console"
        description="Execute live end-to-end interoperability scenarios, test platform timeouts, evaluate DPDP consent gates, and trigger automatic gateway failovers."
        badge={
          <span className="bg-saffron-50 border border-saffron-300 text-saffron-800 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-saffron-500 animate-ping" />
            Live SIH Demo Mode Active
          </span>
        }
      />

      {/* 2. DEMONSTRATION NOTICE CARD */}
      <div className="bg-gov-950 text-white rounded-3xl p-5 border border-gov-800 flex items-center justify-between gap-4 text-xs shadow-gov">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
            <Terminal className="w-5 h-5 text-saffron-400" />
          </div>
          <div>
            <p className="font-bold text-white font-serif">Demonstration Telemetry Engine Active</p>
            <p className="text-gov-300 text-[11px] leading-snug mt-0.5">
              All scenarios trigger live event stream packets on the Interoperability Gateway, simulate real-time PKI handshakes, and emit citizen stage updates.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-widest text-saffron-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
          Evaluator Mode
        </span>
      </div>

      {/* 3. 5 SCENARIOS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2">
          <h3 className="text-sm font-bold text-stone-900 font-serif">
            SIH Live Presentation Scenarios (Click to Execute)
          </h3>
          <span className="text-[11px] font-medium text-stone-500">Instant Execution & Response Telemetry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.map((sc) => {
            const isRunning = runningScenarioId === sc.id;
            const res = scenarioResults[sc.id];

            return (
              <Card
                key={sc.id}
                padding="md"
                className="flex flex-col justify-between space-y-4 hover:border-gov-400 transition shadow-card bg-white"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gov-800 bg-gov-50 px-2.5 py-0.5 rounded-full border border-gov-200">
                      {sc.badge}
                    </span>
                    {res && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border border-emerald-200 font-mono">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {res.executionTimeMs}ms
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 font-serif">{sc.name}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{sc.desc}</p>
                </div>

                {/* Execution Results Step-Log if run */}
                {res && (
                  <div className="p-3.5 bg-sandstone-100 border border-stone-200 rounded-xl space-y-2 text-xs">
                    <span className="font-bold text-stone-700 block text-[10px] uppercase tracking-wider">
                      Telemetry Execution Steps:
                    </span>
                    <ul className="space-y-1 text-[11px] text-stone-700">
                      {res.stepsExecuted.map((stepStr, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 font-mono text-[10px]">
                          <span className="text-gov-700 font-bold">[{idx + 1}]</span>
                          <span>{stepStr}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-2.5 bg-white border border-stone-200 rounded-lg text-gov-900 font-medium text-[11px] mt-1">
                      <strong>Outcome:</strong> {res.resultSummary}
                    </div>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleRunScenario(sc.id)}
                  isLoading={isRunning}
                  icon={Play}
                  fullWidth
                >
                  {isRunning ? 'Executing Scenario...' : sc.buttonText}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 4. PLATFORM CONNECTOR SIMULATION MODE SWITCHER */}
      <Card padding="lg" className="space-y-4 bg-white border-stone-200 shadow-card">
        <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
          <Server className="w-4 h-4 text-gov-700" />
          <h3 className="text-sm font-bold text-stone-900 font-serif">
            Live Platform Connector Simulation Mode
          </h3>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          Simulate abnormal network conditions, latency spikes, or outage events on any connected sovereign platform to evaluate the gateway's automatic retry and fallback handling in real time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
          <div>
            <Select
              label="Target Government Platform"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              options={[
                { value: 'BHOOMI-LRS', label: 'Bhoomi Land Records (BHOOMI-LRS)' },
                { value: 'SARATHI-DL-4', label: 'SARATHI 4.0 Transport (SARATHI-DL-4)' },
                { value: 'EPALIKA-CORE', label: 'e-NagarPalika Municipal (EPALIKA-CORE)' },
                { value: 'DIGILOCKER-GW', label: 'DigiLocker Document Gateway' }
              ]}
            />
          </div>

          <div>
            <Select
              label="Simulation Mode"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              options={[
                { value: 'NORMAL', label: 'NORMAL (Fast Response, Success)' },
                { value: 'SLOW', label: 'SLOW (1.8s Latency Spikes)' },
                { value: 'UNAVAILABLE', label: 'UNAVAILABLE (Triggers Failover)' },
                { value: 'FAILURE', label: 'FAILURE (Handshake Failure)' },
                { value: 'CONSENT_REQUIRED', label: 'CONSENT_REQUIRED (Enforces DPDP Token)' }
              ]}
            />
          </div>

          <div className="flex items-end">
            <Button
              variant="secondary"
              size="md"
              onClick={handleApplyPlatformMode}
              fullWidth
            >
              Apply Simulation Mode
            </Button>
          </div>
        </div>

        {modeMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{modeMessage}</span>
          </div>
        )}
      </Card>
    </div>
  );
};
