import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Users,
  ShieldAlert,
  UserCheck,
  Building2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Zap,
  Lock
} from 'lucide-react';
import { useAuth, PersonaType } from '../../context/AuthContext';

export const PersonaSwitcher: React.FC = () => {
  const { user, switchPersona } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectPersona = (persona: PersonaType, destination?: string) => {
    switchPersona(persona);
    if (destination) {
      navigate(destination);
    }
    setIsOpen(false);
  };

  const currentRole = user?.role || 'CITIZEN';

  return (
    <div className="fixed bottom-5 left-5 z-50 font-sans">
      {/* Floating Pill Trigger */}
      <div className="flex items-center gap-1.5 shadow-2xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-white transition-all duration-300 border shadow-lg backdrop-blur-md cursor-pointer ${
            currentRole === 'CITIZEN'
              ? 'bg-gov-950/95 border-emerald-500/40 hover:border-emerald-400'
              : currentRole === 'DEPARTMENT_ADMIN'
              ? 'bg-saffron-950/95 border-saffron-500/50 hover:border-saffron-400'
              : 'bg-slate-950/95 border-indigo-500/50 hover:border-indigo-400'
          }`}
          title="Switch Demo Persona or Jump to Evaluation Views"
        >
          {/* Persona Avatar Indicator */}
          <div className="relative">
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] ${
                currentRole === 'CITIZEN'
                  ? 'bg-emerald-600 text-white'
                  : currentRole === 'DEPARTMENT_ADMIN'
                  ? 'bg-saffron-600 text-white'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              {currentRole === 'CITIZEN' ? '👤' : currentRole === 'DEPARTMENT_ADMIN' ? '🏛️' : '⚡'}
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-black animate-ping" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-saffron-300 font-mono font-bold">
              <span>SIH DEMO PERSONA</span>
            </div>
            <p className="text-[11px] font-bold text-stone-100 max-w-[130px] truncate leading-tight">
              {currentRole === 'CITIZEN'
                ? 'Citizen: Aarav'
                : currentRole === 'DEPARTMENT_ADMIN'
                ? 'Officer: Priya'
                : 'Super Admin'}
            </p>
          </div>

          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-stone-400 ml-1" />
          ) : (
            <ChevronUp className="w-4 h-4 text-stone-400 ml-1" />
          )}
        </button>

        {/* Quick Jump to SIH Evaluator Console */}
        <button
          onClick={() => navigate('/admin/demo')}
          className="bg-saffron-600 hover:bg-saffron-500 text-white px-3 py-2.5 rounded-2xl text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 border border-saffron-400/40 cursor-pointer hidden md:flex"
          title="Jump directly to 5 SIH Interactive Evaluation Scenarios"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>SIH Scenarios</span>
        </button>
      </div>

      {/* Expanded Persona Switcher Drawer Modal */}
      {isOpen && (
        <div className="absolute bottom-14 left-0 w-84 sm:w-96 bg-[#092119]/98 border border-gov-700/80 rounded-3xl shadow-2xl p-4 text-stone-100 backdrop-blur-xl animate-fade-in-scale">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gov-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-saffron-500/20 text-saffron-300 font-mono text-[10px] font-bold border border-saffron-500/30">
                SIH26129 EVALUATOR DOCK
              </span>
            </div>
            <span className="text-[10px] text-stone-400">1-Click Live Switch</span>
          </div>

          <p className="text-[11px] text-stone-300 mb-3">
            Test the sovereign experience from 3 distinct stakeholder vantage points:
          </p>

          {/* Persona Options */}
          <div className="space-y-2 mb-4">
            {/* 1. Citizen */}
            <button
              onClick={() => handleSelectPersona('CITIZEN', '/dashboard')}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                currentRole === 'CITIZEN'
                  ? 'bg-gov-800/80 border-emerald-400 shadow-gov'
                  : 'bg-gov-900/60 border-gov-800 hover:border-gov-600 hover:bg-gov-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  🧑‍🌾
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Citizen Persona</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                      Aarav Sharma
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400">
                    Apply for services, 62% auto-reuse, DPDP consent
                  </p>
                </div>
              </div>
              {currentRole === 'CITIZEN' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* 2. Department Officer */}
            <button
              onClick={() => handleSelectPersona('OFFICER', '/admin/control-center')}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                currentRole === 'DEPARTMENT_ADMIN'
                  ? 'bg-saffron-950/80 border-saffron-400 shadow-gov'
                  : 'bg-gov-900/60 border-gov-800 hover:border-gov-600 hover:bg-gov-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-saffron-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  🏛️
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Department Officer</span>
                    <span className="text-[9px] bg-saffron-500/20 text-saffron-300 px-1.5 py-0.2 rounded font-mono">
                      Priya Singh
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400">
                    Municipal review, cadastral approvals, audit trail
                  </p>
                </div>
              </div>
              {currentRole === 'DEPARTMENT_ADMIN' && (
                <CheckCircle2 className="w-4 h-4 text-saffron-400" />
              )}
            </button>

            {/* 3. Super Admin / Evaluator */}
            <button
              onClick={() => handleSelectPersona('SUPER_ADMIN', '/admin/control-center')}
              className={`w-full text-left p-2.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                currentRole === 'SUPER_ADMIN'
                  ? 'bg-indigo-950/80 border-indigo-400 shadow-gov'
                  : 'bg-gov-900/60 border-gov-800 hover:border-gov-600 hover:bg-gov-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Super Admin / Evaluator</span>
                    <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">
                      Mission Director
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400">
                    mTLS mesh control, circuit breakers, live simulation
                  </p>
                </div>
              </div>
              {currentRole === 'SUPER_ADMIN' && (
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              )}
            </button>
          </div>

          {/* Quick Teleport Links for Jury */}
          <div className="border-t border-gov-800/80 pt-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-saffron-300 font-bold block mb-2">
              Jury Instant Teleport Links:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                onClick={() => {
                  navigate('/admin/demo');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 bg-gov-800/60 hover:bg-gov-800 rounded-xl text-stone-200 hover:text-white transition flex items-center gap-1.5 border border-gov-700 cursor-pointer"
              >
                <span>🧪 5 Live Scenarios</span>
              </button>
              <button
                onClick={() => {
                  navigate('/services');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 bg-gov-800/60 hover:bg-gov-800 rounded-xl text-stone-200 hover:text-white transition flex items-center gap-1.5 border border-gov-700 cursor-pointer"
              >
                <span>📝 62% Reuse Form</span>
              </button>
              <button
                onClick={() => {
                  navigate('/dashboard/permissions');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 bg-gov-800/60 hover:bg-gov-800 rounded-xl text-stone-200 hover:text-white transition flex items-center gap-1.5 border border-gov-700 cursor-pointer"
              >
                <span>🛡️ DPDP Permissions</span>
              </button>
              <button
                onClick={() => {
                  navigate('/admin/platform-status');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 bg-gov-800/60 hover:bg-gov-800 rounded-xl text-stone-200 hover:text-white transition flex items-center gap-1.5 border border-gov-700 cursor-pointer"
              >
                <span>📡 Platform Status</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
