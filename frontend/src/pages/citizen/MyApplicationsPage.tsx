import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { requestsApi } from '../../services/api';
import { ServiceRequest, RequestStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ApplicationTracker } from '../../components/dashboard/ApplicationTracker';
import { AnimatedMilestoneTracker } from '../../components/visual';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { OfficialCertificateModal } from '../../components/applications/OfficialCertificateModal';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Eye,
  ArrowRight,
  Filter,
  Layers,
  Printer,
  Search,
  Compass,
  X
} from 'lucide-react';

export const MyApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trackParam = searchParams.get('track') || '';

  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState(trackParam);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [activeRequest, setActiveRequest] = useState<ServiceRequest | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState<boolean>(false);
  const [docModalMode, setDocModalMode] = useState<'ACKNOWLEDGEMENT' | 'CERTIFICATE'>('ACKNOWLEDGEMENT');

  useEffect(() => {
    const loadRequests = async () => {
      setIsLoading(true);
      try {
        const userReqs = await requestsApi.getByUser(user?.id || 1);
        setRequests(userReqs);

        if (trackParam) {
          const match = userReqs.find(
            (r) => r.applicationNumber.toLowerCase() === trackParam.toLowerCase()
          );
          if (match) {
            setActiveRequest(match);
          } else if (userReqs.length > 0) {
            setActiveRequest(userReqs[0]);
          }
        } else if (userReqs.length > 0 && !activeRequest) {
          setActiveRequest(userReqs[0]);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadRequests();
  }, [user, trackParam]);

  const statuses = [
    { key: 'ALL', label: 'All Applications' },
    { key: 'SUBMITTED', label: 'Submitted' },
    { key: 'UNDER_REVIEW', label: 'Under Review' },
    { key: 'PROCESSING', label: 'Processing' },
    { key: 'COMPLETED', label: 'Completed' },
  ];

  const filtered = requests.filter((req) => {
    if (selectedStatus !== 'ALL' && req.status.toUpperCase() !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        req.applicationNumber.toLowerCase().includes(q) ||
        req.serviceName.toLowerCase().includes(q) ||
        req.departmentName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handlePrintAcknowledgement = (req: ServiceRequest) => {
    setActiveRequest(req);
    setDocModalMode('ACKNOWLEDGEMENT');
    setIsDocModalOpen(true);
  };

  const handleViewCertificate = (req: ServiceRequest) => {
    setActiveRequest(req);
    setDocModalMode('CERTIFICATE');
    setIsDocModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* 1. PAGE HEADER (PART 10) */}
      <PageHeader
        category="CITIZEN SERVICE REQUEST TRACKER"
        categoryIcon={FileText}
        title="My Applications"
        description="Track status, review departmental inquiries, and download digitally signed certificates across all connected government ministries."
        actions={
          <Link to="/services">
            <Button variant="primary" size="sm" icon={Compass}>
              Apply for New Service
            </Button>
          </Link>
        }
      />

      {/* 2. FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {statuses.map((st) => (
            <button
              key={st.key}
              onClick={() => setSelectedStatus(st.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedStatus === st.key
                  ? 'bg-gov-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID or service..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-gov-600 focus:ring-1 focus:ring-gov-600 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. 2-COLUMN VIEW: APPLICATION LIST + SELECTED DETAIL TRACKER */}
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Applications List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Applications ({filtered.length})
            </h3>

            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {filtered.map((req) => {
                const isSelected = activeRequest?.id === req.id;

                return (
                  <div
                    key={req.id}
                    onClick={() => setActiveRequest(req)}
                    className={`p-4 rounded-2xl border transition cursor-pointer text-xs space-y-2 ${
                      isSelected
                        ? 'bg-gov-50/80 border-gov-300 shadow-sm ring-2 ring-gov-200'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-card'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-xs text-slate-600 font-semibold block">{req.departmentName}</span>
                        <h4 className="font-bold text-slate-900 font-serif text-base">{req.serviceName}</h4>
                      </div>
                      <StatusBadge status={req.status} size="sm" />
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 pt-2.5 border-t border-slate-200">
                      <span className="font-mono font-bold text-slate-800">{req.applicationNumber}</span>
                      <span className="font-medium">Submitted {new Date(req.submittedAt || Date.now()).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Application Tracker & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {activeRequest ? (
              <div className="space-y-6">
                <AnimatedMilestoneTracker
                  applicationNumber={activeRequest.applicationNumber}
                  serviceName={activeRequest.serviceName}
                  currentStageName={activeRequest.currentStage}
                  submittedAt={activeRequest.submittedAt}
                />

                {/* Actions Box */}
                <Card padding="md" className="space-y-3 text-xs">
                  <h4 className="font-bold text-slate-900 font-serif text-sm">
                    Citizen Documents & Actions
                  </h4>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePrintAcknowledgement(activeRequest)}
                      icon={Printer}
                    >
                      Print Acknowledgement Receipt
                    </Button>

                    {activeRequest.status === 'COMPLETED' && (
                      <Button
                        variant="success"
                        size="sm"
                        icon={Download}
                        onClick={() => handleViewCertificate(activeRequest)}
                      >
                        Download Digital Certificate
                      </Button>
                    )}
                  </div>
                </Card>
              </div>
            ) : (
              <EmptyState
                title="Select an Application"
                description="Click any application on the left to inspect its live stage timeline and download receipts."
                actionIcon={Eye}
              />
            )}
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Applications Found"
          description="You haven't submitted any applications matching your filters. Explore available services to get started."
          actionText="Browse Services"
          onAction={() => navigate('/services')}
          actionIcon={Compass}
        />
      )}

      {/* Official Government Document & Certificate Modal */}
      {activeRequest && (
        <OfficialCertificateModal
          isOpen={isDocModalOpen}
          onClose={() => setIsDocModalOpen(false)}
          request={activeRequest}
          mode={docModalMode}
        />
      )}
    </div>
  );
};
