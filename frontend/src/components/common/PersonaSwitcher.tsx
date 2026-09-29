import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Users,
  ShieldAlert,
  UserCheck,
  Building2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Zap,
  Lock,
  X
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
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white/95 hover:bg-white text-slate-800 text-xs font-bold transition-all duration-200 border border-slate-200 shadow-lg hover:shadow-xl backdrop-blur-md cursor-pointer group"
          title="Switch Demo Persona or Jump to Evaluation Views"
        >
          {/* Persona Avatar Indicator */}
          <div className="relative">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                currentRole === 'CITIZEN'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : currentRole === 'DEPARTMENT_ADMIN'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-indigo-100 text-indigo-800 border border-indigo-300'
              }`}
            >
              {currentRole === 'CITIZEN' ? '👤' : currentRole === 'DEPARTMENT_ADMIN' ? '🏛️' : '⚡'}
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white animate-pulse" />
          </div>

          <div className="text-left hidden sm:block">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block leading-none">
              DEMO PERSONA
            </span>
            <span className="text-xs font-bold text-slate-800 leading-tight block mt-0.5">
              {currentRole === 'CITIZEN'
                ? 'Citizen: Aarav'
                : currentRole === 'DEPARTMENT_ADMIN'
                ? 'Officer: Priya'
                : 'Super Admin'}
            </span>
          </div>

          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 ml-0.5" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-600 ml-0.5" />
          )}
        </button>

        {/* Quick Jump to SIH Evaluator Console */}
        <button
          onClick={() => navigate('/admin/demo')}
          className="bg-gov-800 hover:bg-gov-900 text-white px-3.5 py-2.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 border border-gov-700 cursor-pointer hidden md:flex"
          title="Jump directly to SIH Interactive Evaluation Scenarios"
        >
          <Zap className="w-3.5 h-3.5 text-saffron-400 fill-current" />
          <span>SIH Scenarios</span>
        </button>
      </div>

      {/* Expanded Persona Switcher Drawer Modal */}
      {isOpen && (
        <div className="absolute bottom-14 left-0 w-84 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 text-slate-800 backdrop-blur-xl animate-fade-in-scale">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-gov-50 text-gov-800 text-[10px] font-bold border border-gov-200">
                SIH DEMO PERSONA SELECTOR
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mb-3">
            Experience SAMAVAY from 3 distinct stakeholder vantage points:
          </p>

          {/* Persona Options */}
          <div className="space-y-2 mb-4">
            {/* 1. Citizen */}
            <button
              onClick={() => handleSelectPersona('CITIZEN', '/dashboard')}
              className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                currentRole === 'CITIZEN'
                  ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-400/20 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold text-base shadow-xs">
                  🧑‍🌾
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Citizen Persona</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono font-bold">
                      Aarav Sharma
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Browse services, 62% auto-reuse, DPDP consent
                  </p>
                </div>
              </div>
              {currentRole === 'CITIZEN' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
            </button>

            {/* 2. Department Officer */}
            <button
              onClick={() => handleSelectPersona('OFFICER', '/admin/control-center')}
              className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                currentRole === 'DEPARTMENT_ADMIN'
                  ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-bold text-base shadow-xs">
                  🏛️
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Department Officer</span>
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">
                      Priya Singh
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Municipal review, cadastral approvals, audit logs
                  </p>
                </div>
              </div>
              {currentRole === 'DEPARTMENT_ADMIN' && (
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
              )}
            </button>

            {/* 3. Super Admin / Evaluator */}
            <button
              onClick={() => handleSelectPersona('SUPER_ADMIN', '/admin/control-center')}
              className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                currentRole === 'SUPER_ADMIN'
                  ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-400/20 shadow-xs'
                  : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-300 text-indigo-800 flex items-center justify-center font-bold text-base shadow-xs">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Super Admin / Evaluator</span>
                    <span className="text-[9px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-mono font-bold">
                      Mission Director
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Full orchestration control, circuit breakers, live logs
                  </p>
                </div>
              </div>
              {currentRole === 'SUPER_ADMIN' && (
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          </div>

          {/* Quick Teleport Links for Jury */}
          <div className="border-t border-slate-100 pt-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
              Jury Instant Teleport Links:
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                onClick={() => {
                  navigate('/admin/demo');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition flex items-center gap-1.5 border border-slate-200 cursor-pointer text-left"
              >
                <span>🧪 5 Live Scenarios</span>
              </button>
              <button
                onClick={() => {
                  navigate('/services');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition flex items-center gap-1.5 border border-slate-200 cursor-pointer text-left"
              >
                <span>📝 Auto-Fill Form</span>
              </button>
              <button
                onClick={() => {
                  navigate('/dashboard/permissions');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition flex items-center gap-1.5 border border-slate-200 cursor-pointer text-left"
              >
                <span>🛡️ DPDP Permissions</span>
              </button>
              <button
                onClick={() => {
                  navigate('/admin/platform-status');
                  setIsOpen(false);
                }}
                className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition flex items-center gap-1.5 border border-slate-200 cursor-pointer text-left"
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
