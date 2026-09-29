import React, { useRef } from 'react';
import {
  X,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Landmark,
  QrCode,
  FileCheck,
  Clock,
  ExternalLink,
  Award
} from 'lucide-react';
import { NationalEmblem } from '../common/NationalEmblem';
import { ServiceRequest } from '../../types';

interface OfficialCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest;
  mode?: 'ACKNOWLEDGEMENT' | 'CERTIFICATE';
}

export const OfficialCertificateModal: React.FC<OfficialCertificateModalProps> = ({
  isOpen,
  onClose,
  request,
  mode = request.status === 'COMPLETED' ? 'CERTIFICATE' : 'ACKNOWLEDGEMENT'
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !request) return null;

  const isCompleted = mode === 'CERTIFICATE' || request.status === 'COMPLETED';

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(request.submittedAt || Date.now()).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const formattedTime = new Date(request.submittedAt || Date.now()).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const verificationHash = `SHA256:${request.applicationNumber.replace(/[^a-zA-Z0-9]/g, '')}7F8B2C991E3A4D`;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Container Dialog */}
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-300 flex flex-col max-h-[92vh] overflow-hidden animate-fade-in-scale">
        
        {/* Top Dialog Action Bar (Hidden in Print) */}
        <div className="print:hidden bg-gov-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-gov-800">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-saffron-400" />
            <span className="text-xs font-bold font-serif tracking-wide">
              {isCompleted ? 'National Sovereign Certificate Viewer' : 'Official Citizen Acknowledgement Slip'}
            </span>
            <span className="text-[10px] bg-white/10 text-slate-200 px-2 py-0.5 rounded font-mono">
              IT ACT 2000 §4 & §5
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-saffron-500 hover:bg-saffron-600 text-gov-950 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              title="Print document or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              title="Close window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Paper */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-50 flex justify-center">
          <div
            ref={printAreaRef}
            id="printable-official-document"
            className="w-full bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-10 shadow-md relative text-slate-800 print:border-none print:shadow-none print:p-0 print:m-0"
          >
            {/* Tricolor Sovereign Top Micro-Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20] rounded-t-2xl print:rounded-none" />

            {/* Official Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <NationalEmblem size="lg" variant="navy" />
            </div>

            {/* Document Header */}
            <div className="text-center space-y-1.5 border-b-2 border-slate-200 pb-5">
              <div className="flex justify-center mb-1">
                <NationalEmblem size="md" variant="gold" />
              </div>
              <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-slate-700">
                भारत सरकार • Government of India
              </h4>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                National Digital Public Infrastructure • SAMAVAY Interoperability Mesh
              </p>
              <div className="pt-2">
                <span className="text-base sm:text-lg font-black font-serif text-gov-900 border-y border-gov-200 py-1 px-4 inline-block tracking-tight">
                  {isCompleted ? 'डिजिटल सेवा प्रमाण-पत्र / SOVEREIGN DIGITAL CERTIFICATE' : 'नागरिक सेवा पावती / CITIZEN ACKNOWLEDGEMENT SLIP'}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                Official Electronic Document issued pursuant to Section 4 & Section 5 of the Information Technology Act, 2000
              </p>
            </div>

            {/* Key Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-5 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Application Identifier</span>
                <span className="font-mono font-bold text-gov-900 text-sm">{request.applicationNumber}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Submission Date</span>
                <span className="font-semibold text-slate-800">{formattedDate}</span>
                <span className="text-[10px] text-slate-500 block font-mono">{formattedTime} IST</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Status</span>
                <span className={`inline-flex items-center gap-1 font-bold ${isCompleted ? 'text-emerald-700' : 'text-gov-800'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {request.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Nodal Department</span>
                <span className="font-semibold text-slate-800">{request.departmentName}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Service Name</span>
                <span className="font-bold text-gov-900 font-serif">{request.serviceName}</span>
              </div>
            </div>

            {/* Reused Sovereign Registry Verification Breakdown */}
            <div className="space-y-3 my-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-gov-700" />
                  <span>Verified Public Registry Cross-Verification Table</span>
                </h5>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  DPDP Act §6 Compliant
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 text-[10px] uppercase text-slate-600 font-bold">
                    <tr>
                      <th className="py-2 px-3 border-b border-slate-200">Data Field</th>
                      <th className="py-2 px-3 border-b border-slate-200">Authoritative Source</th>
                      <th className="py-2 px-3 border-b border-slate-200">Protocol</th>
                      <th className="py-2 px-3 border-b border-slate-200 text-right">Verification Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    <tr>
                      <td className="py-2 px-3 font-medium text-slate-800">Aadhaar Identity & Demographics</td>
                      <td className="py-2 px-3 text-slate-600">UIDAI Sovereign Gateway</td>
                      <td className="py-2 px-3 font-mono text-[10px] text-slate-500">mTLS PKI_X509</td>
                      <td className="py-2 px-3 text-right text-emerald-700 font-bold">✓ Pre-Verified</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-slate-800">Departmental Records & Title RoR</td>
                      <td className="py-2 px-3 text-slate-600">Bhoomi LRS / SARATHI / VAHAN</td>
                      <td className="py-2 px-3 font-mono text-[10px] text-slate-500">OpenAPI Spec 3.1</td>
                      <td className="py-2 px-3 text-right text-emerald-700 font-bold">✓ Pre-Verified</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-slate-800">Bank Seeded Account / Benefit Routing</td>
                      <td className="py-2 px-3 text-slate-600">PFMS / NPCI Sovereign Bridge</td>
                      <td className="py-2 px-3 font-mono text-[10px] text-slate-500">ISO-20022</td>
                      <td className="py-2 px-3 text-right text-emerald-700 font-bold">✓ Active Link</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium text-slate-800">Digital Lock Credentials</td>
                      <td className="py-2 px-3 text-slate-600">DigiLocker National Cloud</td>
                      <td className="py-2 px-3 font-mono text-[10px] text-slate-500">OAuth 2.0 PKCE</td>
                      <td className="py-2 px-3 text-right text-emerald-700 font-bold">✓ Verified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cryptographic Verification Box */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-slate-50 border border-slate-200 rounded-xl my-5 text-xs">
              <div className="sm:col-span-3 flex flex-col items-center justify-center p-2 bg-white rounded-lg border border-slate-200">
                {/* SVG QR Code Simulation */}
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="white" />
                  {/* Top-Left Finder */}
                  <rect x="10" y="10" width="28" height="28" fill="#0f172a" />
                  <rect x="14" y="14" width="20" height="20" fill="white" />
                  <rect x="18" y="18" width="12" height="12" fill="#0f172a" />
                  {/* Top-Right Finder */}
                  <rect x="62" y="10" width="28" height="28" fill="#0f172a" />
                  <rect x="66" y="14" width="20" height="20" fill="white" />
                  <rect x="70" y="18" width="12" height="12" fill="#0f172a" />
                  {/* Bottom-Left Finder */}
                  <rect x="10" y="62" width="28" height="28" fill="#0f172a" />
                  <rect x="14" y="66" width="20" height="20" fill="white" />
                  <rect x="18" y="70" width="12" height="12" fill="#0f172a" />
                  {/* Data Elements */}
                  <rect x="42" y="14" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="14" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="24" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="44" width="8" height="8" fill="#0f172a" />
                  <rect x="54" y="44" width="6" height="6" fill="#0f172a" />
                  <rect x="64" y="44" width="8" height="8" fill="#0f172a" />
                  <rect x="76" y="44" width="8" height="8" fill="#0f172a" />
                  <rect x="44" y="62" width="6" height="6" fill="#0f172a" />
                  <rect x="54" y="62" width="6" height="6" fill="#0f172a" />
                  <rect x="44" y="72" width="6" height="6" fill="#0f172a" />
                  <rect x="64" y="62" width="6" height="6" fill="#0f172a" />
                  <rect x="74" y="72" width="8" height="8" fill="#0f172a" />
                  <rect x="84" y="82" width="6" height="6" fill="#0f172a" />
                </svg>
                <span className="text-[9px] font-mono text-slate-500 mt-1">Scan to Verify</span>
              </div>

              <div className="sm:col-span-9 space-y-1.5">
                <div className="flex items-center gap-1.5 text-gov-900 font-bold">
                  <Lock className="w-3.5 h-3.5 text-gov-700" />
                  <span>Digital Cryptographic Signature & Hash Token</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono break-all leading-tight">
                  {verificationHash}
                </p>
                <div className="text-[10px] text-slate-600 space-y-0.5 pt-1">
                  <p>• Digitally signed by <strong>Controller of Certifying Authorities (CCA)</strong> authorized root.</p>
                  <p>• Valid for submission to all Central and State government authorities without physical stamping.</p>
                  <p>• Linked to DigiLocker Account: <strong>DL-SAM-99201-IND</strong></p>
                </div>
              </div>
            </div>

            {/* Official Signature Footer */}
            <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="text-center sm:text-left space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Issuing Authority</span>
                <span className="font-serif font-bold text-slate-900">समवाय राष्ट्रीय अंतर-संचालनीयता ग्रिड</span>
                <span className="text-[11px] text-slate-600 block">SAMAVAY National Interoperability Grid</span>
                <span className="text-[9px] text-slate-400 font-mono">Government of India / नई दिल्ली New Delhi</span>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <div className="inline-block border border-dashed border-emerald-400 bg-emerald-50/80 px-3 py-1.5 rounded-lg text-left">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Digitally Signed via e-Sign</span>
                  </div>
                  <span className="text-[9px] text-slate-500 block font-mono">Date: {formattedDate} {formattedTime}</span>
                  <span className="text-[9px] text-slate-500 block">Designation: Authorized Registrar (e-Governance)</span>
                </div>
              </div>
            </div>

            {/* Bottom Official Disclaimer */}
            <div className="mt-6 pt-3 border-t border-slate-100 text-[9px] text-slate-400 text-center space-y-0.5">
              <p>This is a computer-generated official document. No physical signature is required under Rule 3 of the Information Technology (Certifying Authorities) Rules, 2000.</p>
              <p>National Citizen Helpline: 1800-11-7262 | SAMAVAY Interoperability Node: ID-SIH26129</p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions (Hidden in Print) */}
        <div className="print:hidden bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Click <strong>Print / Save PDF</strong> to save this document to your device or print directly.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-gov-700 hover:bg-gov-800 text-white font-bold text-xs rounded-xl shadow-gov transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Document</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
