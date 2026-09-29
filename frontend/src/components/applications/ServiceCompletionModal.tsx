import React from 'react';
import { CheckCircle2, ShieldCheck, Download, ArrowRight, X, FileText, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationNumber: string;
  serviceName: string;
  departmentName: string;
  submittedAt: string;
}

export const ServiceCompletionModal: React.FC<ServiceCompletionModalProps> = ({
  isOpen,
  onClose,
  applicationNumber,
  serviceName,
  departmentName,
  submittedAt
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-modal border border-stone-200 space-y-6 animate-fade-in-scale text-xs">
        {/* Success Icon Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gov-100 text-gov-800 border-2 border-gov-300 mx-auto flex items-center justify-center shadow-gov">
            <CheckCircle2 className="w-9 h-9 text-gov-700" />
          </div>
          <span className="text-[10px] font-bold text-gov-800 uppercase tracking-widest bg-gov-50 border border-gov-200 px-3 py-1 rounded-full inline-block">
            ORCHESTRATION INITIATED
          </span>
          <h2 className="text-2xl font-black text-stone-900 font-serif">
            Service Request Submitted
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
            Cross-departmental verifications, authoritative lookups, and PKI security checks are actively executing in the background.
          </p>
        </div>

        {/* Application Summary Box */}
        <div className="p-4 bg-sandstone-100 border border-stone-200 rounded-2xl space-y-2 text-xs">
          <div className="flex justify-between border-b border-stone-200/80 pb-2">
            <span className="text-stone-500 font-medium">Tracking Identifier:</span>
            <span className="font-mono font-bold text-gov-900 bg-white px-2 py-0.5 rounded border border-stone-200">{applicationNumber}</span>
          </div>
          <div className="flex justify-between border-b border-stone-200/80 pb-2">
            <span className="text-stone-500 font-medium">Service:</span>
            <span className="font-bold text-stone-800 font-serif">{serviceName}</span>
          </div>
          <div className="flex justify-between border-b border-stone-200/80 pb-2">
            <span className="text-stone-500 font-medium">Nodal Authority:</span>
            <span className="font-bold text-stone-800">{departmentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-medium">Submission Timestamp:</span>
            <span className="font-mono text-stone-700">{new Date(submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* DPDP Privacy Notice */}
        <div className="p-3.5 bg-gov-50 border border-gov-200 rounded-2xl flex items-start space-x-2.5 text-xs text-gov-900">
          <ShieldCheck className="w-4 h-4 text-gov-700 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <strong>DPDP Act 2023 Compliance:</strong> Your data permissions are active for this transaction. You can review or revoke them anytime from your Citizen Dashboard.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => {
              onClose();
              navigate('/applications');
            }}
            className="w-full py-2.5 px-4 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs rounded-xl transition inline-flex items-center justify-center cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4 mr-1.5 text-gov-700" />
            Track Application
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/dashboard');
            }}
            className="w-full py-2.5 px-4 bg-gov-700 hover:bg-gov-800 text-white font-bold text-xs rounded-xl shadow-gov transition inline-flex items-center justify-center cursor-pointer"
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
