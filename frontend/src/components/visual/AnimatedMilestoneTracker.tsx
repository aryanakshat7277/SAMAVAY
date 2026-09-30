import React from 'react';
import {
  CheckCircle2,
  Clock,
  Building2,
  ShieldCheck,
  FileCheck,
  Send,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface Stage {
  id: number;
  name: string;
  department: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  timestamp?: string;
  remarks?: string;
  officerRole?: string;
}

interface Props {
  applicationNumber: string;
  serviceName: string;
  currentStageName?: string;
  submittedAt?: string;
}

export const AnimatedMilestoneTracker: React.FC<Props> = ({
  applicationNumber,
  serviceName,
  currentStageName = 'Department Scrutiny',
  submittedAt
}) => {
  const stages: Stage[] = [
    {
      id: 1,
      name: 'Application Submitted & Identity Verified',
      department: 'SAMAVAY Citizen Portal (DigiLocker)',
      status: 'COMPLETED',
      timestamp: submittedAt ? new Date(submittedAt).toLocaleString('en-IN') : '29 Aug 2026, 10:30 AM',
      remarks: 'Aadhaar e-KYC & Mobile OTP authenticated successfully.',
      officerRole: 'Automated Gateway Verification'
    },
    {
      id: 2,
      name: 'Authoritative Land & RoR Cross-Verification',
      department: 'Revenue Department (Bhoomi LRS)',
      status: 'COMPLETED',
      timestamp: '29 Aug 2026, 10:31 AM',
      remarks: 'Cadastral Survey RoR #42/1A matched and validated.',
      officerRole: 'Bhoomi Database Integration Service'
    },
    {
      id: 3,
      name: 'Municipal Ward Inspection & Tax Clearance',
      department: 'e-NagarPalika Municipal Administration',
      status: 'IN_PROGRESS',
      timestamp: 'Estimated: Today, 04:00 PM',
      remarks: 'Assessing property boundary dues and structural classification.',
      officerRole: 'Revenue Inspector (Ward 14)'
    },
    {
      id: 4,
      name: 'Senior Nodal Officer Final Authorization',
      department: 'Directorate of Municipal Services',
      status: 'PENDING',
      remarks: 'Digital Signature (PKI_X509) to be stamped upon clearance.',
      officerRole: 'Assistant Commissioner'
    },
    {
      id: 5,
      name: 'Certificate Issuance & DigiLocker Sync',
      department: 'National Document Repository',
      status: 'PENDING',
      remarks: 'Tamper-proof verifiable PDF certificate with QR seal.',
      officerRole: 'DigiLocker Push Gateway'
    }
  ];

  const completedCount = stages.filter((s) => s.status === 'COMPLETED').length;
  const progressPercent = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
      {/* Top Application Hero */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold text-gov-800 uppercase tracking-wider bg-gov-50 border border-gov-200 px-3 py-1 rounded-full">
              Live Milestone Telemetry
            </span>
            <span className="font-mono font-bold text-xs text-stone-900 bg-stone-100 px-2.5 py-0.5 rounded-lg border border-stone-200">
              {applicationNumber}
            </span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 font-serif">
            {serviceName}
          </h3>
          <p className="text-xs text-stone-600">
            Real-time cross-department orchestration status. Stage <strong>{completedCount + 1} of {stages.length}</strong> currently active.
          </p>
        </div>

        {/* Progress summary card */}
        <div className="flex items-center space-x-3 bg-gov-50/70 border border-gov-200 px-4 py-3 rounded-2xl flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gov-700 text-white flex items-center justify-center font-bold font-mono text-sm shadow-xs">
            {progressPercent}%
          </div>
          <div>
            <span className="text-[10px] font-bold text-gov-800 uppercase tracking-wider block">Workflow Status</span>
            <span className="text-xs font-extrabold text-stone-900">In Active Scrutiny</span>
          </div>
        </div>
      </div>

      {/* Vertical Animated Timeline Flow */}
      <div className="space-y-6 relative pl-2 sm:pl-4">
        {stages.map((stage, idx) => {
          const isDone = stage.status === 'COMPLETED';
          const isCurrent = stage.status === 'IN_PROGRESS';
          const isPending = stage.status === 'PENDING';

          return (
            <div key={stage.id} className="relative flex items-start space-x-4 group">
              {/* Connecting vertical progress line */}
              {idx < stages.length - 1 && (
                <div
                  className={`absolute left-5 sm:left-5 top-10 -bottom-6 w-0.5 transition-all duration-500 ${
                    isDone ? 'bg-gov-700' : 'bg-stone-200'
                  }`}
                />
              )}

              {/* Node Icon Circle */}
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300 shadow-xs ${
                  isDone
                    ? 'bg-gov-700 text-white shadow-gov ring-4 ring-gov-100'
                    : isCurrent
                    ? 'bg-saffron-500 text-white ring-4 ring-saffron-100 animate-pulse'
                    : 'bg-stone-100 text-stone-400 border border-stone-300'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : isCurrent ? (
                  <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                ) : (
                  <span className="font-mono text-xs font-bold">{stage.id}</span>
                )}
              </div>

              {/* Stage Content Card */}
              <div
                className={`flex-1 p-4 rounded-2xl border transition-all duration-200 text-xs space-y-1.5 ${
                  isCurrent
                    ? 'bg-saffron-50/50 border-saffron-200 shadow-xs ring-2 ring-saffron-100'
                    : isDone
                    ? 'bg-white border-stone-200 hover:border-gov-300'
                    : 'bg-stone-50/50 border-stone-200 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-stone-900 text-sm font-serif">{stage.name}</h4>
                    {isCurrent && (
                      <span className="text-[9px] font-bold text-saffron-800 bg-saffron-100 px-2 py-0.5 rounded-full animate-pulse">
                        ● Active Stage
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">{stage.timestamp}</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone-600">
                  <span className="font-semibold text-gov-800 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-gov-700" />
                    {stage.department}
                  </span>
                  <span className="text-stone-300">|</span>
                  <span className="text-stone-500">Responsible: {stage.officerRole}</span>
                </div>

                {stage.remarks && (
                  <p className="text-[11px] text-stone-700 bg-white/80 p-2.5 rounded-xl border border-stone-100 leading-relaxed mt-1">
                    {stage.remarks}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
