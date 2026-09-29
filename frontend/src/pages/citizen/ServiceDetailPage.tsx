import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { servicesApi } from '../../services/api';
import { GovernmentService } from '../../types';
import { ServiceApplyModal } from '../../components/services/ServiceApplyModal';
import { ServiceRecommendationsWidget } from '../../components/services/ServiceRecommendationsWidget';
import { getDepartmentIcon } from '../../components/services/ServiceCard';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { InformationMinimizationVisualizer } from '../../components/visual';
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Building2,
  Lock,
  ArrowRight
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [service, setService] = useState<GovernmentService | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadService = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const found = await servicesApi.getById(Number(id));
        if (found) {
          setService(found);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadService();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500 text-xs">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-serif">Service Not Found</h2>
        <p className="text-xs text-slate-500">The requested government service does not exist or has been relocated.</p>
        <Link to="/services">
          <Button variant="primary" size="sm" icon={ArrowLeft}>
            Back to Services Directory
          </Button>
        </Link>
      </div>
    );
  }

  const DeptIcon = getDepartmentIcon(service.category);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb / Back button */}
      <div className="flex items-center justify-between">
        <Link
          to="/services"
          className="inline-flex items-center text-xs font-semibold text-gov-800 hover:text-gov-950 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Services Directory
        </Link>

        <span className="text-xs font-mono text-slate-400">Code: {service.code}</span>
      </div>

      {/* Main Service Header Card */}
      <Card padding="lg" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gov-800 bg-gov-50 px-3 py-1 rounded-full border border-gov-200">
                <DeptIcon className="w-3.5 h-3.5" />
                <span>{service.departmentName}</span>
              </span>
              <span className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-medium">
                Active Online DPI Service
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              {service.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </div>

          <div className="flex-shrink-0 pt-2 sm:pt-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsApplyModalOpen(true)}
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Start Service
            </Button>
          </div>
        </div>

        {/* Quick Service Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-slate-100">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
            <Clock className="w-4 h-4 text-gov-700 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Time</span>
              <span className="font-semibold text-slate-800">5–10 Minutes (Instant Pre-Fill)</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Authority Verification</span>
              <span className="font-semibold text-slate-800">Authoritative DPI Sources</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center space-x-3">
            <Lock className="w-4 h-4 text-purple-700 flex-shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">DPDP Act 2023</span>
              <span className="font-semibold text-slate-800">Explicit Consent Enforced</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. INTERACTIVE INFORMATION MINIMIZATION GRAPHICAL VISUALIZER */}
      <InformationMinimizationVisualizer serviceName={service.name} />

      {/* STRUCTURED SERVICE INFORMATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Eligibility Section */}
        <Card padding="md" className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Eligibility Criteria</span>
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-gov-600 font-bold">•</span>
              <span>Resident citizen with valid Aadhaar or state digital identity token.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gov-600 font-bold">•</span>
              <span>Property or record registered within the municipal/revenue jurisdiction.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gov-600 font-bold">•</span>
              <span>No active legal stay orders or conflicting partition disputes on record.</span>
            </li>
          </ul>
        </Card>

        {/* Required Details Section */}
        <Card padding="md" className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-gov-700" />
            <span>Information Sources Used</span>
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>Bhoomi LRS:</strong> Land RoR ownership and survey coordinates.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span><strong>e-NagarPalika:</strong> Property boundary and municipal ward index.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gov-600 font-bold">•</span>
              <span><strong>Citizen Input:</strong> Self/Tenant occupancy declaration & contact info.</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Recommendations Widget */}
      <ServiceRecommendationsWidget currentServiceId={service.id} />

      {/* Service Apply Modal */}
      <ServiceApplyModal
        service={service}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
};
