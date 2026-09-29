import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  Building2,
  Server,
  Lock,
  Cpu,
  RefreshCw,
  Clock,
  FileCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const HowSamavayWorksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gov-800 bg-gov-50 border border-gov-200 px-3.5 py-1 rounded-full inline-block">
          SMART INDIA HACKATHON 2026 — PROBLEM ID SIH26129
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 font-serif leading-tight">
          How SAMAVAY Solves Government Platform Fragmentation
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          From disconnected departmental silos to an interoperable, privacy-preserving digital public infrastructure uniting citizens, ministries, and autonomous service workflows.
        </p>
      </div>

      {/* 2. SIDE-BY-SIDE COMPARISON: THE PROBLEM VS. THE SAMAVAY SOLUTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BEFORE: FRAGMENTED GOVERNMENT (THE PROBLEM) */}
        <div className="bg-white border-2 border-rose-200 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center space-x-3 border-b border-rose-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">Existing Landscape</span>
              <h3 className="text-xl font-bold text-stone-900 font-serif">Fragmented Digital Portals</h3>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-4 bg-rose-50/60 border border-rose-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-rose-900 block">1. Disconnected Departmental Silos</span>
              <p>Citizens must visit 4+ separate portals (Municipal, Revenue, Transport, DigiLocker) with separate logins and unfamiliar UIs.</p>
            </div>

            <div className="p-4 bg-rose-50/60 border border-rose-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-rose-900 block">2. Repetitive Citizen Data Entry</span>
              <p>Citizens repeatedly upload Aadhaar scans, address proofs, and land records that the government already owns.</p>
            </div>

            <div className="p-4 bg-rose-50/60 border border-rose-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-rose-900 block">3. Manual Inter-Department Coordination</span>
              <p>Applications stall for weeks in manual inter-departmental physical inquiries and verification queues.</p>
            </div>

            <div className="p-4 bg-rose-50/60 border border-rose-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-rose-900 block">4. Zero Operational Transparency</span>
              <p>No unified tracking; citizens are unaware of where or why their application is blocked.</p>
            </div>
          </div>
        </div>

        {/* AFTER: SAMAVAY INTEROPERABILITY (THE SOLUTION) */}
        <div className="bg-white border-2 border-gov-300 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center space-x-3 border-b border-gov-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-gov-100 text-gov-800 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-6 h-6 text-gov-700" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gov-800 uppercase tracking-wider block">SAMAVAY Ecosystem</span>
              <h3 className="text-xl font-bold text-stone-900 font-serif">One Connected Government</h3>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-4 bg-gov-50/60 border border-gov-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-gov-900 block">1. One Unified Citizen Touchpoint</span>
              <p>All state and central public services accessible through a single, friendly, accessible citizen portal.</p>
            </div>

            <div className="p-4 bg-gov-50/60 border border-gov-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-gov-900 block">2. 62% Information Reuse & Form Minimization</span>
              <p>Authoritative government databases pre-fill verified details. Citizens only provide missing fields.</p>
            </div>

            <div className="p-4 bg-gov-50/60 border border-gov-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-gov-900 block">3. Intelligent Service Orchestration</span>
              <p>Cross-departmental verifications execute autonomously via the secure Interoperability Gateway.</p>
            </div>

            <div className="p-4 bg-gov-50/60 border border-gov-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-gov-900 block">4. DPDP Consent & High Availability</span>
              <p>Strict citizen consent enforcement with automatic failovers preventing service interruptions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 5-STAGE CITIZEN INTEROPERABILITY WORKFLOW */}
      <div className="bg-gov-950 text-white rounded-3xl p-8 sm:p-10 shadow-gov-lg space-y-8 border border-gov-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gov-grid opacity-20 pointer-events-none" />
        <div className="relative z-10 text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[11px] font-bold text-saffron-300 uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full inline-block border border-white/10">
            END-TO-END CITIZEN JOURNEY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif">
            How An Application Flows Through SAMAVAY
          </h2>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
          <div className="p-5 bg-white/6 border border-white/10 rounded-2xl space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">1</span>
            <h4 className="font-bold text-white font-serif">Service Discovery</h4>
            <p className="text-gov-300 text-[11px] leading-relaxed">
              Citizen selects service. System instantly discovers required data and authoritative sources.
            </p>
          </div>

          <div className="p-5 bg-white/6 border border-white/10 rounded-2xl space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">2</span>
            <h4 className="font-bold text-white font-serif">Data Availability</h4>
            <p className="text-gov-300 text-[11px] leading-relaxed">
              Orchestrator queries connected platforms via mTLS gateway to locate verified records.
            </p>
          </div>

          <div className="p-5 bg-white/6 border border-white/10 rounded-2xl space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">3</span>
            <h4 className="font-bold text-white font-serif">DPDP Consent</h4>
            <p className="text-gov-300 text-[11px] leading-relaxed">
              Citizen reviews plain-language access requests and grants permission with one click.
            </p>
          </div>

          <div className="p-5 bg-white/6 border border-white/10 rounded-2xl space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">4</span>
            <h4 className="font-bold text-white font-serif">Lean Dynamic Form</h4>
            <p className="text-gov-300 text-[11px] leading-relaxed">
              Verified fields are omitted. Citizen enters only the 1 or 2 missing details.
            </p>
          </div>

          <div className="p-5 bg-white/6 border border-white/10 rounded-2xl space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">5</span>
            <h4 className="font-bold text-emerald-300 font-serif">Live Delivery</h4>
            <p className="text-gov-300 text-[11px] leading-relaxed">
              Application is tracked live across stages and digitally delivered upon approval.
            </p>
          </div>
        </div>
      </div>

      {/* 4. CALL TO ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link to="/services">
          <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
            Explore Government Services
          </Button>
        </Link>
        <Link to="/admin/control-center">
          <Button variant="outline" size="lg" icon={ArrowRight} iconPosition="right">
            Open Administration Control Center
          </Button>
        </Link>
      </div>
    </div>
  );
};
