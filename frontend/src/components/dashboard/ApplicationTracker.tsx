import React, { useState } from 'react';
import { ServiceRequest } from '../../types';
import {
  CheckCircle2,
  Clock,
  FileCheck,
  ShieldCheck,
  Building2,
  Database,
  ArrowRight,
  Info
} from 'lucide-react';

interface ApplicationTrackerProps {
  request: ServiceRequest;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ request }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);

  // Enhanced 5-Stage Interoperable Citizen Journey (Feature 6 & 7)
  const stages = [
    {
      key: 'SUBMITTED',
      title: 'Application Submitted',
      shortDesc: 'Registered on SAMAVAY sovereign network.',
      longDesc: 'Your application has been registered with an immutable tracking ID and dispatched to the nodal department.',
      statusText: 'Completed',
      icon: Clock
    },
    {
      key: 'INTEROP_VERIFICATION',
      title: 'Cross-Registry Verification',
      shortDesc: 'Matched via secure gateway.',
      longDesc: 'Required citizen identity and property title records have been cross-verified with authoritative registries (Bhoomi Land Records / VAHAN).',
      statusText: 'Completed',
      icon: Database
    },
    {
      key: 'UNDER_REVIEW',
      title: 'Department Scrutiny',
      shortDesc: 'Nodal officer reviewing ledger.',
      longDesc: 'The designated Circle Officer / Revenue Inspector is reviewing the verified particulars and self-assessment declaration.',
      statusText: 'In Progress',
      icon: FileCheck
    },
    {
      key: 'PROCESSING',
      title: 'Digital Seal Processing',
      shortDesc: 'Sovereign PKI digital signing.',
      longDesc: 'The official digital signature and QR verification seal are being applied to your certificate under IT Act standards.',
      statusText: 'Pending Approval',
      icon: ShieldCheck
    },
    {
      key: 'COMPLETED',
      title: 'Certificate Delivered',
      shortDesc: 'Available on Dashboard & DigiLocker.',
      longDesc: 'Your digitally signed certificate will be delivered to your portal dashboard and synced to your DigiLocker account.',
      statusText: 'Pending Delivery',
      icon: CheckCircle2
    },
  ];

  const getStageIndex = (status: string) => {
    switch (status.toUpperCase()) {
      case 'SUBMITTED':
        return 1;
      case 'UNDER_REVIEW':
        return 2;
      case 'PROCESSING':
        return 3;
      case 'COMPLETED':
        return 4;
      case 'REJECTED':
        return 2;
      default:
        return 1;
    }
  };

  const currentIndex = getStageIndex(request.status);
  const isRejected = request.status === 'REJECTED';

  const activeStepDetail = selectedStepIndex !== null ? stages[selectedStepIndex] : stages[currentIndex];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-gov-800 uppercase tracking-wider bg-gov-50 px-2 py-0.5 rounded">
              Unified Service Journey
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{request.departmentName}</span>
          </div>
          <h4 className="text-base font-bold text-slate-900 font-serif">{request.serviceName}</h4>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">Tracking ID:</span>
          <span className="font-mono text-xs font-bold text-gov-800 bg-gov-50 px-2.5 py-1 rounded-md border border-gov-200">
            {request.applicationNumber}
          </span>
        </div>
      </div>

      {/* Visual Timeline Steps */}
      <div className="relative pt-2 pb-2">
        <div className="hidden lg:flex items-start justify-between relative z-10">
          {stages.map((stage, idx) => {
            const isPassed = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isSelected = selectedStepIndex === idx;

            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => setSelectedStepIndex(idx)}
                className={`flex-1 flex flex-col items-center text-center relative px-2 cursor-pointer group focus:outline-none`}
              >
                {/* Connecting Line */}
                {idx !== 0 && (
                  <div
                    className={`absolute top-4 right-1/2 w-full h-1 -z-10 transition-colors ${
                      idx <= currentIndex ? 'bg-gov-600' : 'bg-slate-200'
                    }`}
                  />
                )}

                {/* Node Circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isSelected
                      ? 'ring-4 ring-gov-300 shadow-md'
                      : ''
                  } ${
                    isPassed
                      ? 'bg-gov-700 border-gov-700 text-white'
                      : isCurrent
                      ? isRejected
                        ? 'bg-rose-600 border-rose-600 text-white animate-pulse'
                        : 'bg-white border-gov-600 text-gov-800 ring-4 ring-gov-100 shadow-sm'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                {/* Title */}
                <p
                  className={`mt-2.5 text-xs font-bold ${
                    isCurrent
                      ? isRejected
                        ? 'text-rose-700'
                        : 'text-gov-800'
                      : isPassed
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {stage.title}
                </p>

                {/* Stage short citizen description */}
                <p className="text-[10px] text-slate-500 mt-1 max-w-[140px] leading-snug">
                  {stage.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Mobile & Small Screen Vertical View */}
        <div className="lg:hidden space-y-4 pl-4 border-l-2 border-slate-200 ml-3">
          {stages.map((stage, idx) => {
            const isPassed = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={stage.key}
                onClick={() => setSelectedStepIndex(idx)}
                className="relative cursor-pointer"
              >
                <div
                  className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full border-2 ${
                    isPassed
                      ? 'bg-gov-700 border-gov-700'
                      : isCurrent
                      ? 'bg-gov-500 border-gov-600'
                      : 'bg-white border-slate-300'
                  }`}
                />
                <p className={`text-xs font-bold ${isCurrent ? 'text-gov-800' : isPassed ? 'text-slate-800' : 'text-slate-400'}`}>
                  {stage.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">{stage.shortDesc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Step Details Card (Feature 7) */}
      {activeStepDetail && (
        <div className="bg-gov-50/70 border border-gov-200 rounded-xl p-4 text-xs space-y-1.5 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gov-900 font-serif text-xs flex items-center gap-1.5">
              <Info className="w-4 h-4 text-gov-700" />
              {activeStepDetail.title}
            </span>
            <span className="text-[10px] font-bold text-gov-800 bg-white border border-gov-200 px-2 py-0.5 rounded">
              {activeStepDetail.statusText}
            </span>
          </div>
          <p className="text-slate-700 text-[11px] leading-relaxed">
            {activeStepDetail.longDesc}
          </p>
        </div>
      )}

      {/* Real-time Status Card & Department Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gov-100 text-gov-800 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900">
              Current Status: <span className="text-gov-800">{request.currentStage || 'Application In-Flight'}</span>
            </p>
            {request.remarks && (
              <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                Department Update: {request.remarks}
              </p>
            )}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <span className="text-[11px] text-slate-500 block">Last Synchronized</span>
          <span className="text-xs font-semibold text-slate-700">Today, Real-time</span>
        </div>
      </div>
    </div>
  );
};
