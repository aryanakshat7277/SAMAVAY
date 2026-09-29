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
import dpiDataFlowImg from '../../assets/dpi_data_flow.jpg';
import banner2 from '../../assets/gov_banner_2.jpg';

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

      {/* Visual Architecture Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-card bg-white max-w-4xl mx-auto">
        <img
          src={dpiDataFlowImg}
          alt="SAMAVAY Interoperability Architecture: Citizen 1-Click Consent connecting official pillars to instant certificate delivery"
          className="w-full h-auto object-cover max-h-[380px]"
        />
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-700">
          <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs sm:text-sm">
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
            Connected Public Infrastructure Pipeline
          </span>
          <span className="text-xs text-slate-600 text-center sm:text-right font-medium">
            Zero paper photocopies • Authoritative data reuse • 100% DPDP Act compliance
          </span>
        </div>
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

          <div className="space-y-3.5 text-xs sm:text-[13px]">
            <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-red-900 block text-sm">1. Disconnected Departmental Silos</span>
              <p className="leading-relaxed">Citizens must visit 4+ separate portals (Municipal, Revenue, Transport, DigiLocker) with separate logins and unfamiliar UIs.</p>
            </div>

            <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-red-900 block text-sm">2. Repetitive Citizen Data Entry</span>
              <p className="leading-relaxed">Citizens repeatedly upload Aadhaar scans, address proofs, and land records that the government already owns.</p>
            </div>

            <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-red-900 block text-sm">3. Manual Inter-Department Coordination</span>
              <p className="leading-relaxed">Applications stall for weeks in manual inter-departmental physical inquiries and verification queues.</p>
            </div>

            <div className="p-4 bg-red-50/60 border border-red-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-red-900 block text-sm">4. Zero Operational Transparency</span>
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

          <div className="space-y-3.5 text-xs sm:text-[13px]">
            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-emerald-950 block text-sm">1. One Unified Citizen Touchpoint</span>
              <p className="leading-relaxed">All state and central public services accessible through a single, friendly, accessible citizen portal.</p>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-emerald-950 block text-sm">2. 62% Information Reuse & Form Minimization</span>
              <p className="leading-relaxed">Authoritative government databases pre-fill verified details. Citizens only provide missing fields.</p>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-emerald-950 block text-sm">3. Automated Cross-Department Orchestration</span>
              <p className="leading-relaxed">Cross-departmental verifications execute seamlessly via the secure Interoperability Gateway.</p>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-1 text-stone-700">
              <span className="font-bold text-emerald-950 block text-sm">4. DPDP Consent & High Availability</span>
              <p className="leading-relaxed">Strict citizen consent enforcement with automatic failovers preventing service interruptions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 5-STAGE CITIZEN INTEROPERABILITY WORKFLOW */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-card space-y-8 border border-slate-200 relative overflow-hidden">
        <div className="relative z-10 text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-gov-800 uppercase tracking-widest bg-gov-50 px-3.5 py-1 rounded-full inline-block border border-gov-200">
            END-TO-END CITIZEN JOURNEY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">
            How An Application Flows Through SAMAVAY
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            A seamless, guided experience designed for complete ease of use.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-5 gap-4 text-xs">
          <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">1</span>
            <h4 className="font-bold text-slate-900 font-serif">Service Discovery</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Citizen selects service. System instantly discovers required data and authoritative sources.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">2</span>
            <h4 className="font-bold text-slate-900 font-serif">Data Availability</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Orchestrator queries connected platforms via mTLS gateway to locate verified records.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">3</span>
            <h4 className="font-bold text-slate-900 font-serif">DPDP Consent</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Citizen reviews plain-language access requests and grants permission with one click.
            </p>
          </div>

          <div className="p-5 bg-slate-50/80 border border-slate-200 rounded-2xl space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">4</span>
            <h4 className="font-bold text-slate-900 font-serif">Lean Dynamic Form</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Verified fields are omitted. Citizen enters only the 1 or 2 missing details.
            </p>
          </div>

          <div className="p-5 bg-emerald-50/70 border border-emerald-300 rounded-2xl space-y-2.5 shadow-2xs">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">5</span>
            <h4 className="font-bold text-emerald-950 font-serif">Live Delivery</h4>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              Application is tracked live across stages and digitally delivered upon approval.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Showcase: Paperless Digital Verification */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-card bg-gradient-to-br from-amber-50/70 via-white to-stone-50 text-slate-900 max-w-4xl mx-auto select-none">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20] z-20" />
        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-stone-200 shadow-xs flex-shrink-0">
            <img
              src={banner2}
              alt="DigiLocker Paperless Governance Experience"
              className="w-full h-48 sm:h-56 object-cover"
            />
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 w-fit shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>DPDP ACT 2023 & IT ACT 2000 COMPLIANT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
              62% Document Submissions Eliminated at Source
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              By connecting directly to authoritative state databases (VAHAN, Bhoomi, e-NagarPalika, DigiLocker), citizens never have to scan or re-upload documents the Government of India already maintains.
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
