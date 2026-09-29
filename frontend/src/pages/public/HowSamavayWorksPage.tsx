import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
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
import { DpiVisualSlideshow } from '../../components/common/DpiVisualSlideshow';

export const HowSamavayWorksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-gov-800 bg-gov-50 border border-gov-200 px-3.5 py-1 rounded-full inline-block">
          DIGITAL PUBLIC INFRASTRUCTURE — NATIONAL SOVEREIGN ARCHITECTURE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 font-serif leading-tight">
          How SAMAVAY Solves Government Platform Fragmentation
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
          From disconnected departmental silos to an interoperable, privacy-preserving digital public infrastructure uniting citizens, ministries, and connected service workflows.
        </p>
      </div>

      {/* Interactive DPI Architecture & Workflow Slideshow */}
      <div className="max-w-5xl mx-auto">
        <DpiVisualSlideshow initialSlide={0} />
      </div>

      {/* 2. SIDE-BY-SIDE COMPARISON: THE PROBLEM VS. THE SAMAVAY SOLUTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BEFORE: FRAGMENTED GOVERNMENT (THE PROBLEM) */}
        <div className="bg-white border border-red-200/90 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center space-x-3 border-b border-red-100 pb-4">
            <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold flex-shrink-0">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-red-800 uppercase tracking-wider block">Existing Landscape</span>
              <h3 className="text-xl font-bold text-stone-900 font-serif">Fragmented Digital Portals</h3>
            </div>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-red-900 block text-sm sm:text-base">1. Disconnected Departmental Silos</span>
              <p className="leading-relaxed">Citizens must visit 4+ separate portals (Municipal, Revenue, Transport, DigiLocker) with separate logins and unfamiliar UIs.</p>
            </div>

            <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-red-900 block text-sm sm:text-base">2. Repetitive Citizen Data Entry</span>
              <p className="leading-relaxed">Citizens repeatedly upload Aadhaar scans, address proofs, and land records that the government already owns.</p>
            </div>

            <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-red-900 block text-sm sm:text-base">3. Manual Inter-Department Coordination</span>
              <p className="leading-relaxed">Applications stall for weeks in manual inter-departmental physical inquiries and verification queues.</p>
            </div>

            <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-red-900 block text-sm sm:text-base">4. Zero Operational Transparency</span>
              <p className="leading-relaxed">No unified tracking; citizens are unaware of where or why their application is blocked.</p>
            </div>
          </div>
        </div>

        {/* AFTER: SAMAVAY INTEROPERABILITY (THE SOLUTION) */}
        <div className="bg-white border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center space-x-3 border-b border-emerald-100 pb-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">SAMAVAY Ecosystem</span>
              <h3 className="text-xl font-bold text-stone-900 font-serif">One Connected Government</h3>
            </div>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-emerald-950 block text-sm sm:text-base">1. One Unified Citizen Touchpoint</span>
              <p className="leading-relaxed">All state and central public services accessible through a single, friendly, accessible citizen portal.</p>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-emerald-950 block text-sm sm:text-base">2. 62% Information Reuse & Form Minimization</span>
              <p className="leading-relaxed">Authoritative government databases pre-fill verified details. Citizens only provide missing fields.</p>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-emerald-950 block text-sm sm:text-base">3. Automated Cross-Department Orchestration</span>
              <p className="leading-relaxed">Cross-departmental verifications execute seamlessly via the secure Interoperability Gateway.</p>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-emerald-950 block text-sm sm:text-base">4. DPDP Consent & High Availability</span>
              <p className="leading-relaxed">Strict citizen consent enforcement with automatic failovers preventing service interruptions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 5-STAGE CITIZEN INTEROPERABILITY WORKFLOW */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card space-y-8 border border-slate-200 relative overflow-hidden">
        <div className="relative z-10 text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs sm:text-sm font-bold text-gov-800 uppercase tracking-widest bg-gov-50 px-3.5 py-1 rounded-full inline-block border border-gov-200">
            END-TO-END CITIZEN JOURNEY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">
            How An Application Flows Through SAMAVAY
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            A seamless, guided experience designed for complete ease of use.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs sm:text-sm">
          <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2.5">
            <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs">1</span>
            <h4 className="font-bold text-slate-900 font-serif text-sm sm:text-base">Service Discovery</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              Citizen selects service. System instantly discovers required data and authoritative sources.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2.5">
            <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs">2</span>
            <h4 className="font-bold text-slate-900 font-serif text-sm sm:text-base">Data Availability</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              Orchestrator queries connected platforms via mTLS gateway to locate verified records.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2.5">
            <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs">3</span>
            <h4 className="font-bold text-slate-900 font-serif text-sm sm:text-base">DPDP Consent</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              Citizen reviews plain-language access requests and grants permission with one click.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2.5">
            <span className="w-8 h-8 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs">4</span>
            <h4 className="font-bold text-slate-900 font-serif text-sm sm:text-base">Lean Dynamic Form</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              Verified fields are omitted. Citizen enters only the 1 or 2 missing details.
            </p>
          </div>

          <div className="p-5 bg-emerald-50/70 border border-emerald-300 rounded-2xl space-y-2.5 shadow-2xs">
            <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs">5</span>
            <h4 className="font-bold text-emerald-950 font-serif text-sm sm:text-base">Live Delivery</h4>
            <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed font-medium">
              Application is tracked live across stages and digitally delivered upon approval.
            </p>
          </div>
        </div>
      </div>

      {/* Sovereign Guarantee & Document Minimization Standards */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-card bg-gradient-to-br from-amber-50/80 via-white to-stone-50 text-slate-900 max-w-4xl mx-auto select-none p-6 sm:p-8">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20] z-20" />
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200/90 pb-4">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-emerald-800 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>DPDP ACT 2023 & IT ACT 2000 COMPLIANT</span>
            </div>
            <span className="text-xs sm:text-sm font-mono font-bold text-gov-800 bg-gov-50 border border-gov-200 px-3 py-1 rounded-lg">
              Section 4 & 5 Legally Enforceable
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
              62% Document Submissions Eliminated at Source
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              By connecting directly to authoritative state databases (VAHAN, Bhoomi, e-NagarPalika, DigiLocker), citizens never have to scan or re-upload documents the Government of India already maintains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1.5">
              <span className="text-2xl font-black font-mono text-gov-800">62.4%</span>
              <h4 className="text-sm font-bold text-slate-900">Document Elimination</h4>
              <p className="text-xs text-slate-600">Zero physical photocopies or attestations needed across 58+ services.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1.5">
              <span className="text-2xl font-black font-mono text-emerald-700">&lt; 1.8s</span>
              <h4 className="text-sm font-bold text-slate-900">Master Verification</h4>
              <p className="text-xs text-slate-600">Real-time authoritative sync with Bhoomi, SARATHI, and VAHAN registries.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-1.5">
              <span className="text-2xl font-black font-mono text-amber-700">1-Click</span>
              <h4 className="text-sm font-bold text-slate-900">Revocable Consent</h4>
              <p className="text-xs text-slate-600">DPDP Act Section 6 citizen privacy controls with instant revocation rights.</p>
            </div>
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
