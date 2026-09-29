import React, { useState, useEffect } from 'react';
import { GovernmentService, ServiceRequest, ServiceReadinessResult, DynamicFormDto } from '../../types';
import { requestsApi, orchestrationApi, consentApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { FormMinimizationBanner } from './FormMinimizationBanner';
import {
  X,
  CheckCircle2,
  FileText,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Database,
  Lock,
  Server,
  Layers,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Printer
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OfficialCertificateModal } from '../applications/OfficialCertificateModal';

interface ServiceApplyModalProps {
  service: GovernmentService;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (createdRequest: ServiceRequest) => void;
}

export const ServiceApplyModal: React.FC<ServiceApplyModalProps> = ({
  service,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { user } = useAuth();
  const { refreshNotifications } = useNotifications();
  const navigate = useNavigate();

  // Wizard Steps:
  // 1: Service Preparation & Readiness Animation
  // 2: Readiness Summary, Form Minimization & Plain-Language Consent Review
  // 3: Dynamic Form (Only Missing Fields!)
  // 4: Submission & Orchestration Confirmation
  const [step, setStep] = useState<number>(1);
  const [prepProgress, setPrepProgress] = useState<number>(0);
  const [readinessData, setReadinessData] = useState<ServiceReadinessResult | null>(null);
  const [dynamicFormData, setDynamicFormData] = useState<DynamicFormDto | null>(null);
  const [consentsGranted, setConsentsGranted] = useState<{ [key: number]: boolean }>({});
  const [showWhyNeeded, setShowWhyNeeded] = useState<{ [key: number]: boolean }>({});

  // Dynamic Form Field Values state
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    propertyId: 'M-WARD-40982',
    occupancyType: 'Self Occupied',
    remarks: 'Pre-verified records attached via Bhoomi LRS.'
  });

  const [applicantName, setApplicantName] = useState(user?.fullName || 'Aarav Sharma');
  const [applicantEmail, setApplicantEmail] = useState(user?.email || 'citizen.demo@samavay.gov.in');
  const [applicantPhone, setApplicantPhone] = useState(user?.mobileNumber || '9876543210');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdReq, setCreatedReq] = useState<ServiceRequest | null>(null);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState<boolean>(false);

  // Load Readiness and simulate the preparation steps
  useEffect(() => {
    if (isOpen && service) {
      setStep(1);
      setPrepProgress(1);

      const timer1 = setTimeout(() => setPrepProgress(2), 400);
      const timer2 = setTimeout(() => setPrepProgress(3), 800);
      const timer3 = setTimeout(() => {
        setPrepProgress(4);
        orchestrationApi.getReadiness(service.id, user?.id || 1).then((res) => {
          setReadinessData(res);
          const initialConsents: { [key: number]: boolean } = {};
          res.availableRequirements.forEach((r) => { initialConsents[r.id] = true; });
          res.consentRequiredRequirements.forEach((r) => { initialConsents[r.id] = true; });
          setConsentsGranted(initialConsents);

          orchestrationApi.getDynamicForm(service.id, user?.id || 1).then((formRes) => {
            setDynamicFormData(formRes);
            setTimeout(() => setStep(2), 500);
          });
        });
      }, 1200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen, service, user]);

  if (!isOpen) return null;

  const handleToggleConsent = (id: number) => {
    setConsentsGranted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleWhyNeeded = (id: number) => {
    setShowWhyNeeded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Record any newly authorized citizen consents
      if (readinessData) {
        for (const req of [...readinessData.availableRequirements, ...readinessData.consentRequiredRequirements]) {
          if (consentsGranted[req.id]) {
            await consentApi.grantConsent({
              userId: user?.id || 1,
              userName: applicantName,
              serviceId: service.id,
              serviceName: service.name,
              dataRequirementId: req.id,
              fieldName: req.fieldName,
              sourceDepartmentName: req.sourceDepartment,
              sourcePlatformName: req.sourcePlatform,
              purpose: req.purpose || 'Verification'
            });
          }
        }
      }

      const combinedFormData = {
        applicantName,
        applicantEmail,
        applicantPhone,
        serviceCode: service.code,
        department: service.departmentName,
        dynamicInputs: formValues,
        reusedRecords: readinessData?.availableRequirements.map((r) => `${r.sourceDepartment} (${r.fieldName})`) || []
      };

      const result = await requestsApi.create({
        userId: user?.id || 1,
        applicantName,
        applicantEmail,
        applicantPhone,
        serviceId: service.id,
        formDataJson: JSON.stringify(combinedFormData),
        remarks: 'Citizen granted sovereign data-reuse permission. Service Orchestration triggered.'
      });

      // Trigger Service Orchestration Engine
      await orchestrationApi.startOrchestration(result.id);

      setCreatedReq(result);
      setStep(4); // Confirmation step
      await refreshNotifications();
      if (onSuccess) onSuccess(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    onClose();
    if (createdReq?.applicationNumber) {
      navigate(`/applications?track=${encodeURIComponent(createdReq.applicationNumber)}`);
    } else {
      navigate('/applications');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-modal border border-stone-200 overflow-hidden animate-fade-in-scale">
        {/* Modal Header */}
        <div className="bg-gov-900 text-white px-6 py-4 flex items-center justify-between border-b border-gov-800 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E65100] via-[#FAF8F5] to-[#1B5E20]" />
          <div>
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
              {service.departmentName}
            </span>
            <h3 className="text-base font-bold leading-snug font-serif mt-0.5">{service.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-xl transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-medium">
          <div className={`flex items-center space-x-1.5 ${step >= 1 ? 'text-gov-800 font-bold' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step >= 1 ? 'bg-gov-700 text-white shadow-xs' : 'bg-stone-200 text-stone-600'}`}>
              1
            </span>
            <span className="hidden sm:inline">Verification</span>
          </div>

          <div className="w-6 h-0.5 bg-stone-300"></div>

          <div className={`flex items-center space-x-1.5 ${step >= 2 ? 'text-gov-800 font-bold' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step >= 2 ? 'bg-gov-700 text-white shadow-xs' : 'bg-stone-200 text-stone-600'}`}>
              2
            </span>
            <span className="hidden sm:inline">Data Access & Consent</span>
          </div>

          <div className="w-6 h-0.5 bg-stone-300"></div>

          <div className={`flex items-center space-x-1.5 ${step >= 3 ? 'text-gov-800 font-bold' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step >= 3 ? 'bg-gov-700 text-white shadow-xs' : 'bg-stone-200 text-stone-600'}`}>
              3
            </span>
            <span className="hidden sm:inline">Dynamic Form</span>
          </div>

          <div className="w-6 h-0.5 bg-stone-300"></div>

          <div className={`flex items-center space-x-1.5 ${step === 4 ? 'text-emerald-800 font-bold' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${step === 4 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-200 text-stone-600'}`}>
              4
            </span>
            <span className="hidden sm:inline">Confirmation</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: SERVICE PREPARATION & READINESS ANIMATION */}
          {step === 1 && (
            <div className="py-6 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gov-50 border border-gov-200 text-gov-800 flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-8 h-8 text-gov-700 animate-pulse" />
              </div>

              <div>
                <h4 className="text-lg font-black text-stone-900 font-serif">
                  Preparing Your Government Service
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  SAMAVAY Interoperability Core is coordinating with registered government platforms...
                </p>
              </div>

              <div className="max-w-md mx-auto text-left space-y-3 bg-sandstone-100 border border-stone-200 rounded-2xl p-4 text-xs">
                <div className="flex items-center space-x-2.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${prepProgress >= 1 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'}`}>
                    {prepProgress >= 1 ? '✓' : '1'}
                  </span>
                  <span className={prepProgress >= 1 ? 'font-bold text-stone-800' : 'text-stone-400'}>
                    Understanding service requirements
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${prepProgress >= 2 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'}`}>
                    {prepProgress >= 2 ? '✓' : '2'}
                  </span>
                  <span className={prepProgress >= 2 ? 'font-bold text-stone-800' : 'text-stone-400'}>
                    Checking connected government registries
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${prepProgress >= 3 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'}`}>
                    {prepProgress >= 3 ? '✓' : '3'}
                  </span>
                  <span className={prepProgress >= 3 ? 'font-bold text-stone-800' : 'text-stone-400'}>
                    Verifying available data records
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${prepProgress >= 4 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'}`}>
                    {prepProgress >= 4 ? '✓' : '●'}
                  </span>
                  <span className={prepProgress >= 4 ? 'font-bold text-stone-800' : 'text-gov-800 font-bold'}>
                    Generating lean dynamic application form...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: READINESS SUMMARY, FORM MINIMIZATION & CONSENT */}
          {step === 2 && readinessData && (
            <div className="space-y-5">
              {/* FORM MINIMIZATION INDICATOR */}
              <FormMinimizationBanner
                totalRequired={(readinessData.availableRequirements?.length || 0) + (readinessData.consentRequiredRequirements?.length || 0) + (readinessData.missingRequirements?.length || 0) || 8}
                automaticallyAvailable={(readinessData.availableRequirements?.length || 0) + (readinessData.consentRequiredRequirements?.length || 0) || 5}
                neededFromCitizen={readinessData.missingRequirements?.length || 3}
              />

              {/* REVIEW INFORMATION ACCESS (PLAIN LANGUAGE CONSENT) */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 font-serif">
                    Review Information Access (DPDP Act 2023)
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    To eliminate repetitive document uploads, the following records will be queried from authoritative government registries:
                  </p>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {[...readinessData.availableRequirements, ...readinessData.consentRequiredRequirements].map((req) => (
                    <div
                      key={req.id}
                      className="p-3.5 bg-gov-50/60 border border-gov-200 rounded-2xl space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-2.5">
                          <input
                            type="checkbox"
                            checked={!!consentsGranted[req.id]}
                            onChange={() => handleToggleConsent(req.id)}
                            className="mt-0.5 rounded border-stone-300 text-gov-700 focus:ring-gov-600 cursor-pointer"
                          />
                          <div>
                            <p className="font-bold text-stone-900 font-serif">{req.fieldName}</p>
                            <p className="text-[11px] text-stone-600 mt-0.5">
                              Source: <strong className="text-stone-800">{req.sourceDepartment}</strong> ({req.sourcePlatform})
                            </p>
                            <p className="text-[11px] text-gov-800 font-medium">
                              Purpose: {req.purpose || 'Verification for ' + service.name}
                            </p>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full flex-shrink-0">
                          {consentsGranted[req.id] ? 'Access Allowed' : 'Disabled'}
                        </span>
                      </div>

                      {/* Expandable "Why is this needed?" Accordion */}
                      <div className="pt-1.5 border-t border-gov-200/60">
                        <button
                          type="button"
                          onClick={() => toggleWhyNeeded(req.id)}
                          className="text-[11px] font-bold text-gov-700 hover:text-gov-900 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Why is this needed?</span>
                          {showWhyNeeded[req.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {showWhyNeeded[req.id] && (
                          <div className="mt-1.5 p-2.5 bg-white border border-stone-200 rounded-xl text-[11px] text-stone-600 leading-relaxed animate-fade-in">
                            {req.fieldName} is required by {service.departmentName} to legally validate your eligibility for {service.name}. Fetching this record directly from {req.sourceDepartment} eliminates manual document scanning and physical attestation.
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Information Needed from Citizen Notice */}
              {readinessData.missingRequirements.length > 0 && (
                <div className="p-3 bg-sandstone-100 border border-stone-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider">
                    Only Missing Details Needed in Next Step:
                  </span>
                  <p className="text-stone-600 font-medium">
                    {readinessData.missingRequirements.map((r) => r.fieldName).join(', ')}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2 text-xs font-bold text-white bg-gov-700 hover:bg-gov-800 rounded-xl shadow-gov transition inline-flex items-center cursor-pointer"
                >
                  Continue to Form
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DYNAMIC FORM ENGINE — ONLY MISSING FIELDS! */}
          {step === 3 && dynamicFormData && (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Pre-Verified Summary Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1 text-emerald-950">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Authoritative Information Reused (5 Details)</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                    Auto-Filled
                  </span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  Citizen Identity, Bhoomi Land RoR, and Aadhaar e-KYC have been matched and attached to your application automatically.
                </p>
              </div>

              {/* Dynamic Missing Fields Section */}
              <div className="space-y-3">
                <h5 className="font-bold text-stone-800 uppercase tracking-wider text-[11px]">
                  Please Provide the Remaining {(dynamicFormData.requiredFields || []).length} Detail(s):
                </h5>

                {(dynamicFormData.requiredFields || []).map((field) => (
                  <div key={field.id} className="space-y-1">
                    <label className="block font-bold text-stone-800">
                      {field.label} {field.required && <span className="text-rose-600">*</span>}
                    </label>

                    {field.fieldType === 'DROPDOWN' ? (
                      <select
                        value={formValues[field.fieldName] || ''}
                        onChange={(e) => handleFieldChange(field.fieldName, e.target.value)}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-1 focus:ring-gov-600 bg-white text-stone-900"
                        required={field.required}
                      >
                        <option value="Self Occupied">Self Occupied</option>
                        <option value="Tenant Occupied">Tenant Occupied</option>
                        <option value="Commercial Lease">Commercial Lease</option>
                      </select>
                    ) : (
                      <input
                        type={field.fieldType === 'NUMBER' ? 'number' : 'text'}
                        value={formValues[field.fieldName] || ''}
                        onChange={(e) => handleFieldChange(field.fieldName, e.target.value)}
                        placeholder={field.placeholder || 'Enter value...'}
                        required={field.required}
                        className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-1 focus:ring-gov-600 text-stone-900"
                      />
                    )}

                    {field.helpText && (
                      <span className="text-[10px] text-stone-500 block">{field.helpText}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 rounded-xl transition inline-flex items-center cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gov-700 hover:bg-gov-800 rounded-xl shadow-gov transition inline-flex items-center disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Submitting & Orchestrating...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      Submit Application
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION & ORCHESTRATION DISPATCH */}
          {step === 4 && createdReq && (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-gov-100 text-gov-800 border-2 border-gov-300 mx-auto flex items-center justify-center shadow-gov">
                <CheckCircle2 className="w-9 h-9 text-gov-700" />
              </div>

              <div>
                <h4 className="text-xl font-black text-stone-900 font-serif">
                  Application Submitted & Orchestration Initiated
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Your request is queued on the SAMAVAY interoperability mesh.
                </p>
              </div>

              <div className="p-4 bg-sandstone-100 border border-stone-200 rounded-2xl max-w-md mx-auto space-y-2 text-xs text-left">
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Tracking Number:</span>
                  <span className="font-mono font-bold text-gov-900 bg-white px-2 py-0.5 rounded border border-stone-200">{createdReq.applicationNumber}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Service:</span>
                  <span className="font-bold text-stone-800 font-serif">{createdReq.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Current Stage:</span>
                  <span className="font-bold text-gov-800">{createdReq.currentStage}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSlipModalOpen(true)}
                  className="px-5 py-2.5 text-xs font-bold text-gov-900 bg-saffron-50 hover:bg-saffron-100 border border-saffron-300 rounded-xl shadow-xs transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-gov-800" />
                  Print Acknowledgement Slip / रसीद
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gov-700 hover:bg-gov-800 rounded-xl shadow-gov transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Track Live Progress</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Government Acknowledgement Slip Modal */}
      {createdReq && (
        <OfficialCertificateModal
          isOpen={isSlipModalOpen}
          onClose={() => setIsSlipModalOpen(false)}
          request={createdReq}
          mode="ACKNOWLEDGEMENT"
        />
      )}
    </div>
  );
};
