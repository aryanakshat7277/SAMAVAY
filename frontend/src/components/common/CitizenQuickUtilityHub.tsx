import React, { useState, useEffect } from 'react';
import {
  Search,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
  AlertCircle,
  Printer,
  QrCode,
  RefreshCw,
  Send,
  Activity,
  Building2,
  ExternalLink,
  HelpCircle,
  Lock,
  Check,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { requestsApi } from '../../services/api';
import { ServiceRequest } from '../../types';
import { OfficialCertificateModal } from '../applications/OfficialCertificateModal';
import { NationalEmblem } from './NationalEmblem';

type UtilityTab = 'track' | 'verify' | 'telemetry' | 'grievance';

interface TelemetryNode {
  name: string;
  department: string;
  protocol: string;
  latencyMs: number;
  uptime: string;
  status: 'OPTIMAL' | 'DEGRADED';
}

const INITIAL_NODES: TelemetryNode[] = [
  {
    name: 'UIDAI Aadhaar Authentication Gateway',
    department: 'MeitY / Central UIDAI',
    protocol: 'mTLS PKI X.509',
    latencyMs: 38,
    uptime: '99.99%',
    status: 'OPTIMAL'
  },
  {
    name: 'Parivahan SARATHI 4.0 & VAHAN Registry',
    department: 'Ministry of Road Transport & Highways',
    protocol: 'REST / e-Gov Interop v2.1',
    latencyMs: 54,
    uptime: '99.96%',
    status: 'OPTIMAL'
  },
  {
    name: 'DigiLocker Sovereign Document Vault',
    department: 'Digital India Corporation',
    protocol: 'OAuth 2.0 / PKI Signature',
    latencyMs: 41,
    uptime: '99.98%',
    status: 'OPTIMAL'
  },
  {
    name: 'Bhoomi State Land Records Information System',
    department: 'State Revenue Registries',
    protocol: 'HTTPS / JSON Cadastral API',
    latencyMs: 62,
    uptime: '99.92%',
    status: 'OPTIMAL'
  },
  {
    name: 'PFMS & DBT Bharat Public Financial Mesh',
    department: 'Department of Expenditure / Finance',
    protocol: 'ISO-20022 Financial Gateway',
    latencyMs: 46,
    uptime: '99.95%',
    status: 'OPTIMAL'
  },
  {
    name: 'e-NagarPalika Municipal Urban Core',
    department: 'Urban Local Bodies Network',
    protocol: 'REST Webhooks / TLS 1.3',
    latencyMs: 49,
    uptime: '99.97%',
    status: 'OPTIMAL'
  }
];

export const CitizenQuickUtilityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UtilityTab>('track');

  // Tab 1: Track State
  const [trackQuery, setTrackQuery] = useState('');
  const [allRequests, setAllRequests] = useState<ServiceRequest[]>([]);
  const [trackedResult, setTrackedResult] = useState<ServiceRequest | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docModalMode, setDocModalMode] = useState<'ACKNOWLEDGEMENT' | 'CERTIFICATE'>('ACKNOWLEDGEMENT');

  // Tab 2: Verify State
  const [certQuery, setCertQuery] = useState('');
  const [certResult, setCertResult] = useState<{
    valid: boolean;
    certId: string;
    beneficiary: string;
    serviceName: string;
    issueDate: string;
    authority: string;
    hash: string;
  } | null>(null);
  const [certSearched, setCertSearched] = useState(false);

  // Tab 3: Telemetry State
  const [nodes, setNodes] = useState<TelemetryNode[]>(INITIAL_NODES);
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState('Just now');

  // Tab 4: Grievance State
  const [grievanceDept, setGrievanceDept] = useState('Transport Department');
  const [grievanceCategory, setGrievanceCategory] = useState('Interoperability Verification Delay');
  const [grievanceRefNo, setGrievanceRefNo] = useState('');
  const [grievanceDesc, setGrievanceDesc] = useState('');
  const [grievanceSubmitted, setGrievanceSubmitted] = useState<string | null>(null);

  useEffect(() => {
    const loadRequests = async () => {
      const data = await requestsApi.getAll();
      setAllRequests(data);
    };
    loadRequests();
  }, []);

  const handleTrackSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setTrackSearched(true);
    const query = trackQuery.trim().toLowerCase();
    if (!query) {
      setTrackedResult(null);
      return;
    }
    const found = allRequests.find(
      (r) =>
        r.applicationNumber.toLowerCase().includes(query) ||
        r.serviceName.toLowerCase().includes(query) ||
        String(r.id) === query
    );
    setTrackedResult(found || null);
  };

  const handleQuickTrack = (appNum: string) => {
    setTrackQuery(appNum);
    setTrackSearched(true);
    const found = allRequests.find((r) => r.applicationNumber.toLowerCase() === appNum.toLowerCase());
    setTrackedResult(found || null);
  };

  const handleVerifySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCertSearched(true);
    const query = certQuery.trim().toUpperCase();
    if (!query) {
      setCertResult(null);
      return;
    }

    if (query.includes('09841') || query.includes('DL') || query.includes('CERT')) {
      setCertResult({
        valid: true,
        certId: query.startsWith('CERT-') ? query : `CERT-${query}`,
        beneficiary: 'Aarav Sharma',
        serviceName: 'Driving Licence Endorsement Renewal',
        issueDate: '22 September 2026',
        authority: 'Ministry of Road Transport & Highways (Transport Dept)',
        hash: 'SHA256:7f83b1657ff18e920d3f23a54b38d3885c86807f433'
      });
    } else {
      setCertResult(null);
    }
  };

  const handlePingMesh = () => {
    setIsPinging(true);
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          latencyMs: Math.floor(Math.random() * 25) + 32
        }))
      );
      setLastPingTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsPinging(false);
    }, 700);
  };

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grievanceDesc.trim()) return;
    const token = `CPGRAMS/2026/SAM/${Math.floor(10000 + Math.random() * 90000)}`;
    setGrievanceSubmitted(token);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-card overflow-hidden text-slate-900">
      {/* Top Header Strip with Tricolor Accent */}
      <div className="relative bg-gradient-to-b from-slate-50/90 via-white to-slate-50/50 p-5 sm:p-6 border-b border-slate-200">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gov-900 text-white flex items-center justify-center p-1.5 shadow-sm ring-1 ring-gov-700/40">
              <NationalEmblem size="sm" variant="gold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-saffron-800 uppercase tracking-widest font-mono">
                  त्वरित नागरिक सेवाएं
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-600 font-mono font-bold">
                  GIGW 3.0 CITIZEN UTILITY HUB
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold font-serif text-slate-900 tracking-tight">
                National Citizen Quick Services & Verification Portal
              </h2>
            </div>
          </div>

          {/* SLA Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-800 self-start sm:self-auto shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Real-time Gateway Response: <strong>&lt; 50ms</strong></span>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar (Light Clean Government Switcher) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/90 overflow-x-auto pb-1.5 scrollbar-none">
          <button
            onClick={() => setActiveTab('track')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
              activeTab === 'track'
                ? 'bg-gov-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Search className={`w-3.5 h-3.5 ${activeTab === 'track' ? 'text-saffron-400' : 'text-slate-500'}`} />
            <span>Track Application (आवेदन स्थिति)</span>
          </button>

          <button
            onClick={() => setActiveTab('verify')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
              activeTab === 'verify'
                ? 'bg-gov-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Award className={`w-3.5 h-3.5 ${activeTab === 'verify' ? 'text-saffron-400' : 'text-slate-500'}`} />
            <span>Verify Certificate (प्रमाण पत्र सत्यापन)</span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
              activeTab === 'telemetry'
                ? 'bg-gov-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${activeTab === 'telemetry' ? 'text-saffron-400' : 'text-slate-500'}`} />
            <span>Registry Mesh Telemetry (रजिस्ट्री स्थिति)</span>
          </button>

          <button
            onClick={() => setActiveTab('grievance')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
              activeTab === 'grievance'
                ? 'bg-gov-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <HelpCircle className={`w-3.5 h-3.5 ${activeTab === 'grievance' ? 'text-saffron-400' : 'text-slate-500'}`} />
            <span>Lodge Grievance / जन शिकायत (CPGRAMS)</span>
          </button>
        </div>
      </div>

      {/* Tab Body Content */}
      <div className="p-6 sm:p-8 bg-slate-50/60">
        {/* ── TAB 1: TRACK APPLICATION ── */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Track Application Status Across All 28 States & UTs
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Enter your 16-character SAMAVAY Reference Number or Department Token to view real-time stage scrutiny.
              </p>
            </div>

            {/* Search Input Bar */}
            <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-2xl">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  placeholder="Enter Application ID (e.g., SAM-2026-09841)"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-600 focus:border-transparent shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gov-800 hover:bg-gov-900 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
              >
                <span>Check Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Demo ID Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-bold text-xs text-slate-800">Sample Records:</span>
              <button
                type="button"
                onClick={() => handleQuickTrack('SAM-2026-09841')}
                className="px-3 py-1 bg-white border border-slate-300 hover:border-gov-600 text-slate-800 rounded-lg font-mono text-xs font-semibold transition cursor-pointer hover:bg-gov-50 shadow-2xs"
              >
                SAM-2026-09841 (Driving Licence • Completed)
              </button>
              <button
                type="button"
                onClick={() => handleQuickTrack('SAM-2026-10234')}
                className="px-3 py-1 bg-white border border-slate-300 hover:border-gov-600 text-slate-800 rounded-lg font-mono text-xs font-semibold transition cursor-pointer hover:bg-gov-50 shadow-2xs"
              >
                SAM-2026-10234 (Property Tax • Processing)
              </button>
              <button
                type="button"
                onClick={() => handleQuickTrack('SAM-2026-11490')}
                className="px-3 py-1 bg-white border border-slate-300 hover:border-gov-600 text-slate-800 rounded-lg font-mono text-xs font-semibold transition cursor-pointer hover:bg-gov-50 shadow-2xs"
              >
                SAM-2026-11490 (Income Cert • Under Review)
              </button>
            </div>

            {/* Results Display */}
            {trackedResult && (
              <div className="bg-white border-2 border-gov-700/20 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 animate-fade-in">
                {/* Result Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs sm:text-sm text-gov-900 bg-gov-50 border border-gov-200 px-2.5 py-0.5 rounded-lg">
                        {trackedResult.applicationNumber}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                        trackedResult.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : trackedResult.status === 'PROCESSING'
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {trackedResult.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 font-serif">
                      {trackedResult.serviceName}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Issuing Department: <strong>{trackedResult.departmentName}</strong>
                    </p>
                  </div>

                  {/* Actions: View Certificate or Slip */}
                  <div className="flex items-center gap-2">
                    {trackedResult.status === 'COMPLETED' ? (
                      <button
                        onClick={() => {
                          setDocModalMode('CERTIFICATE');
                          setIsDocModalOpen(true);
                        }}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View Official Certificate</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setDocModalMode('ACKNOWLEDGEMENT');
                          setIsDocModalOpen(true);
                        }}
                        className="px-4 py-2 bg-gov-700 hover:bg-gov-800 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Acknowledgement Slip</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Milestone Stepper */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Statutory Progress Pipeline
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>1. Submission</span>
                      </div>
                      <p className="text-[10px] text-emerald-700">Digital request recorded with timestamp</p>
                    </div>

                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>2. Interop Verification</span>
                      </div>
                      <p className="text-[10px] text-emerald-700">Authoritative database match successful</p>
                    </div>

                    <div className={`p-3 rounded-xl space-y-1 border ${
                      trackedResult.status === 'COMPLETED'
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      <div className="flex items-center gap-1.5 font-bold text-[11px] text-slate-800">
                        {trackedResult.status === 'COMPLETED' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                        )}
                        <span>3. Officer Scrutiny</span>
                      </div>
                      <p className="text-[10px] text-slate-600">
                        {trackedResult.currentStage || 'Authority review active'}
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl space-y-1 border ${
                      trackedResult.status === 'COMPLETED'
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-slate-100 border-slate-200 opacity-60'
                    }`}>
                      <div className="flex items-center gap-1.5 font-bold text-[11px] text-slate-800">
                        {trackedResult.status === 'COMPLETED' ? (
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span>4. Digital Issuance</span>
                      </div>
                      <p className="text-[10px] text-slate-600">
                        {trackedResult.status === 'COMPLETED' ? 'Delivered to DigiLocker' : 'Awaiting signoff'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scrutiny Remarks */}
                {trackedResult.remarks && (
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-600 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-gov-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800">Official Scrutiny Note: </strong>
                      <span>{trackedResult.remarks}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {trackSearched && !trackedResult && (
              <div className="p-6 bg-white border border-rose-200 rounded-2xl text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">No Record Found</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Please verify your Application ID format or check if you applied using a different citizen mobile number.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: VERIFY CERTIFICATE QR & CREDENTIAL ── */}
        {activeTab === 'verify' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Instant Cryptographic Certificate & QR Verification
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Verify the authenticity of digital certificates issued across Transport, Municipal, and Revenue departments under Section 4 & 5 of the IT Act 2000.
              </p>
            </div>

            <form onSubmit={handleVerifySubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-2xl">
              <div className="relative flex-1">
                <QrCode className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={certQuery}
                  onChange={(e) => setCertQuery(e.target.value)}
                  placeholder="Enter Certificate ID / QR Hash (e.g., CERT-SAM-2026-09841)"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-600 focus:border-transparent shadow-2xs"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gov-800 hover:bg-gov-900 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
              >
                <span>Verify Credential</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[11px] text-slate-600">Sample Certificate:</span>
              <button
                type="button"
                onClick={() => {
                  setCertQuery('CERT-SAM-2026-09841');
                  setCertSearched(true);
                  setCertResult({
                    valid: true,
                    certId: 'CERT-SAM-2026-09841',
                    beneficiary: 'Aarav Sharma',
                    serviceName: 'Driving Licence Endorsement Renewal',
                    issueDate: '22 September 2026',
                    authority: 'Ministry of Road Transport & Highways (Transport Dept)',
                    hash: 'SHA256:7f83b1657ff18e920d3f23a54b38d3885c86807f433'
                  });
                }}
                className="px-2.5 py-1 bg-white border border-slate-200 hover:border-gov-400 text-slate-700 rounded-lg font-mono text-[11px] transition cursor-pointer hover:bg-gov-50"
              >
                CERT-SAM-2026-09841 (SARATHI 4.0 Verified)
              </button>
            </div>

            {certResult && (
              <div className="bg-white border-2 border-emerald-600/30 rounded-2xl p-6 shadow-sm space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest font-mono">
                        VERIFICATION RESULT: AUTHENTIC & VALID
                      </span>
                      <h4 className="text-base font-bold text-slate-900 font-serif">
                        Government Sovereign Digital Credential
                      </h4>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-full text-xs font-bold">
                    IT ACT 2000 COMPLIANT
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Beneficiary Name</span>
                    <p className="font-bold text-slate-900 text-sm">{certResult.beneficiary}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Service Scheme</span>
                    <p className="font-bold text-slate-900 text-sm">{certResult.serviceName}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Issuing Authority</span>
                    <p className="font-semibold text-slate-800">{certResult.authority}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Cryptographic Hash</span>
                    <p className="font-mono text-[10px] text-slate-600 truncate">{certResult.hash}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Root CA: Controller of Certifying Authorities (CCA India)
                  </span>
                  <span className="font-mono text-[11px] text-slate-600">Issued: {certResult.issueDate}</span>
                </div>
              </div>
            )}

            {certSearched && !certResult && (
              <div className="p-6 bg-white border border-rose-200 rounded-2xl text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-800">Invalid Credential Reference</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  The specified Certificate ID could not be validated against the National PKI registry. Ensure the ID matches your official document header.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: REGISTRY MESH TELEMETRY ── */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  National Digital Public Infrastructure (DPI) Mesh Status
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Live latency and throughput telemetry across sovereign department nodes connected to SAMAVAY.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePingMesh}
                disabled={isPinging}
                className="px-4 py-2 bg-gov-800 hover:bg-gov-900 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
                <span>{isPinging ? 'Pinging Sovereign Mesh...' : 'Ping Network Nodes'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nodes.map((node, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{node.name}</h4>
                      <p className="text-[10px] text-slate-500">{node.department}</p>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {node.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Response Latency</span>
                      <span className="font-mono font-bold text-gov-800">{node.latencyMs} ms</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Monthly Uptime</span>
                      <span className="font-mono font-bold text-slate-700">{node.uptime}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-1">
                    <span>Protocol: {node.protocol}</span>
                    <span className="text-emerald-600 font-semibold">Active</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gov-700" />
                All nodes authenticated with mTLS Certificate Authority
              </span>
              <span className="font-mono text-[11px]">Last checked: {lastPingTime}</span>
            </div>
          </div>
        )}

        {/* ── TAB 4: CITIZEN GRIEVANCE (CPGRAMS) ── */}
        {activeTab === 'grievance' && (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Centralized Public Grievance Redress and Monitoring System (CPGRAMS)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Lodge an official grievance regarding service delays, document verification issues, or inter-department portal coordination.
              </p>
            </div>

            {grievanceSubmitted ? (
              <div className="bg-white border-2 border-emerald-500/30 rounded-2xl p-6 text-center space-y-4 max-w-xl mx-auto animate-fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-mono">
                    Grievance Registered Successfully
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 font-serif">
                    Official CPGRAMS Token Generated
                  </h4>
                  <div className="py-2">
                    <span className="inline-block px-4 py-1.5 bg-slate-100 border border-slate-300 rounded-xl font-mono font-bold text-sm text-gov-900">
                      {grievanceSubmitted}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your grievance has been transmitted to the designated Public Grievance Officer, MeitY. Standard statutory resolution window is 48 working hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setGrievanceSubmitted(null);
                    setGrievanceDesc('');
                    setGrievanceRefNo('');
                  }}
                  className="px-5 py-2 bg-gov-800 hover:bg-gov-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Lodge Another Query
                </button>
              </div>
            ) : (
              <form onSubmit={handleGrievanceSubmit} className="space-y-4 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Concerned Department</label>
                    <select
                      value={grievanceDept}
                      onChange={(e) => setGrievanceDept(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-600"
                    >
                      <option>Transport Department (RTO / SARATHI)</option>
                      <option>Revenue & Land Records (Bhoomi / RoR)</option>
                      <option>Municipal Corporation (e-NagarPalika)</option>
                      <option>Social Welfare Department</option>
                      <option>Health & Family Welfare (PM-JAY)</option>
                      <option>School & Higher Education (Scholarships)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Issue Category</label>
                    <select
                      value={grievanceCategory}
                      onChange={(e) => setGrievanceCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-gov-600"
                    >
                      <option>Interoperability Verification Delay</option>
                      <option>Registry Data Mismatch</option>
                      <option>Consent Token Revocation Help</option>
                      <option>Payment / Fee Reconciliation</option>
                      <option>Technical Accessibility Issue</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Application / Reference ID (Optional)</label>
                  <input
                    type="text"
                    value={grievanceRefNo}
                    onChange={(e) => setGrievanceRefNo(e.target.value)}
                    placeholder="e.g. SAM-2026-09841"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Description of Issue</label>
                  <textarea
                    rows={3}
                    value={grievanceDesc}
                    onChange={(e) => setGrievanceDesc(e.target.value)}
                    placeholder="Please provide concise facts regarding the problem encountered..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gov-600 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gov-800 hover:bg-gov-900 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Grievance to Nodal Officer</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Official Certificate / Acknowledgement Modal */}
      {trackedResult && (
        <OfficialCertificateModal
          isOpen={isDocModalOpen}
          onClose={() => setIsDocModalOpen(false)}
          request={trackedResult}
          mode={docModalMode}
        />
      )}
    </div>
  );
};
