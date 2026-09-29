import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { consentApi } from '../../services/api';
import { DataConsent } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import {
  ShieldCheck, Lock, Trash2, CheckCircle2, AlertTriangle,
  ArrowRight, Database, RefreshCw, Clock, X, Eye, FileText,
  Activity, KeyRound, Info
} from 'lucide-react';

// ── Visual: DPDP Rights banner items
const dpdpRights = [
  { icon: Eye,        title: 'Right to Know',    desc: 'See exactly what data is accessed and why' },
  { icon: X,          title: 'Right to Revoke',  desc: 'Cancel any data permission at any time' },
  { icon: FileText,   title: 'Right to Portability', desc: 'Download your consent history as PDF' },
  { icon: ShieldCheck,title: 'Purpose Bound',    desc: 'Data only used for stated government purpose' },
];

export const MyDataPermissionsPage: React.FC = () => {
  const { user } = useAuth();
  const [consents,         setConsents]         = useState<DataConsent[]>([]);
  const [isLoading,        setIsLoading]        = useState<boolean>(true);
  const [selectedConsent,  setSelectedConsent]  = useState<DataConsent | null>(null);
  const [isRevoking,       setIsRevoking]        = useState<boolean>(false);
  const [notificationMsg,  setNotificationMsg]  = useState<string>('');
  const [mounted,          setMounted]          = useState(false);

  const loadConsents = async () => {
    setIsLoading(true);
    try {
      const data = await consentApi.getByUser(user?.id || 1);
      setConsents(data);
    } finally {
      setIsLoading(false);
      setMounted(true);
    }
  };

  useEffect(() => { loadConsents(); }, [user]);

  const handleRevoke = async (id: number) => {
    setIsRevoking(true);
    try {
      const updated = await consentApi.revokeConsent(id);
      setConsents((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setNotificationMsg(`Permission for "${updated.fieldName}" has been revoked successfully.`);
      setTimeout(() => setNotificationMsg(''), 5000);
      setSelectedConsent(null);
    } finally {
      setIsRevoking(false);
    }
  };

  const activeCount  = consents.filter(c => c.status === 'GRANTED' || c.status === 'ACTIVE').length;
  const revokedCount = consents.length - activeCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ── PAGE HEADER ── */}
      <PageHeader
        category="SOVEREIGN CITIZEN CONSENT & DPDP GOVERNANCE"
        categoryIcon={Lock}
        title="My Data Permissions"
        description="Review and manage all data access authorizations granted to government services under the DPDP Act 2023."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={loadConsents} icon={RefreshCw}>
              Refresh
            </Button>
            <Link to="/dashboard">
              <Button variant="secondary" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        }
      />

      {/* ── SUCCESS TOAST ── */}
      {notificationMsg && (
        <div className="p-4 bg-gov-50 border border-gov-300 rounded-2xl text-xs text-gov-900 flex items-center justify-between shadow-xs animate-slide-in-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gov-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold">{notificationMsg}</span>
          </div>
          <button onClick={() => setNotificationMsg('')} className="text-gov-600 hover:text-gov-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── DPDP RIGHTS HEADER CARD ── */}
      <div className="bg-gov-950 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gov-grid opacity-20" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-saffron-500/20 border border-saffron-400/30 flex items-center justify-center">
                  <ShieldCheck className="w-4.5 h-4.5 text-saffron-400" />
                </div>
                <span className="text-saffron-300 text-xs font-bold uppercase tracking-widest">DPDP Act 2023 — Citizen Rights</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-serif">
                You Are in Complete Control of Your Data
              </h2>
              <p className="text-gov-200 text-sm max-w-lg leading-relaxed font-normal">
                Under the Digital Personal Data Protection Act 2023, no government service can access your records without
                your explicit, purpose-bound consent. You may revoke access at any time.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 flex-shrink-0">
              <div className="bg-white/8 border border-white/12 rounded-2xl p-4 text-center min-w-[80px]">
                <p className="text-2xl font-black text-white font-mono">{activeCount}</p>
                <p className="text-gov-300 text-xs font-semibold mt-0.5">Active</p>
              </div>
              <div className="bg-white/8 border border-white/12 rounded-2xl p-4 text-center min-w-[80px]">
                <p className="text-2xl font-black text-rose-400 font-mono">{revokedCount}</p>
                <p className="text-gov-300 text-xs font-semibold mt-0.5">Revoked</p>
              </div>
            </div>
          </div>

          {/* Rights strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {dpdpRights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/6 border border-white/10 rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-gov-300" />
                  <span className="text-white text-xs font-bold">{title}</span>
                </div>
                <p className="text-gov-200 text-xs leading-snug font-normal">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTIVE CONSENT CARDS ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <h3 className="font-bold text-stone-900 font-serif text-base">
              Active Data Permissions
            </h3>
            <p className="text-xs text-stone-600 mt-0.5 font-medium">
              {consents.length} authorization{consents.length !== 1 ? 's' : ''} on record
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
                <div className="skeleton-shimmer h-4 rounded-lg w-1/2" />
                <div className="skeleton-shimmer h-3 rounded-lg w-3/4" />
                <div className="skeleton-shimmer h-20 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : consents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {consents.map((consent, i) => {
              const isActive = consent.status === 'GRANTED' || consent.status === 'ACTIVE';
              return (
                <div
                  key={consent.id}
                  className={`animate-stagger-in bg-white rounded-2xl border text-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover ${
                    isActive ? 'border-stone-200' : 'border-stone-200 opacity-60'
                  }`}
                  style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
                >
                  {/* Card header */}
                  <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isActive ? 'bg-gov-50' : 'bg-stone-100'}`}>
                        <Database className={`w-3.5 h-3.5 ${isActive ? 'text-gov-700' : 'text-stone-400'}`} />
                      </div>
                      <span className={`text-xs font-bold ${isActive ? 'text-gov-800' : 'text-stone-500'}`}>
                        {consent.sourceDepartmentName}
                      </span>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                      isActive
                        ? 'bg-gov-50 text-gov-800 border border-gov-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {isActive && <span className="w-1.5 h-1.5 bg-gov-500 rounded-full animate-pulse" />}
                      {isActive ? 'Active' : 'Revoked'}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-bold text-stone-900 font-serif text-sm">{consent.fieldName}</h4>
                      <p className="text-xs text-stone-600 mt-0.5 font-medium">
                        Platform: <strong className="text-stone-900 font-bold">{consent.sourcePlatformName}</strong>
                      </p>
                    </div>

                    <div className="p-2.5 bg-sandstone-100 border border-stone-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-stone-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                          Purpose
                        </span>
                      </div>
                      <p className="text-xs text-stone-800 leading-snug font-medium">
                        {consent.purpose || `Verification for ${consent.serviceName}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-stone-500" />
                      Granted {new Date(consent.grantedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>

                    {isActive && (
                      <button
                        onClick={() => setSelectedConsent(consent)}
                        className="w-full py-2 px-3 border border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Revoke Access
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No Data Permissions Found"
            description="You have not granted any cross-platform data reuse authorizations yet. Permissions appear here when you apply for services."
            actionIcon={ShieldCheck}
          />
        )}
      </div>

      {/* ── REVOCATION MODAL ── */}
      {selectedConsent && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-modal border border-stone-200 overflow-hidden animate-fade-in-scale">
            {/* Modal header strip */}
            <div className="bg-rose-50 border-b border-rose-200 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-serif">Revoke Data Permission?</h3>
                <p className="text-[11px] text-rose-700 font-medium">This action takes effect immediately</p>
              </div>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <p className="text-stone-700 leading-relaxed">
                Revoke <span className="font-bold text-stone-900">{selectedConsent.serviceName}</span>'s access to your{' '}
                <span className="font-bold text-gov-800">{selectedConsent.fieldName}</span> records?
              </p>

              <div className="p-3 bg-saffron-50 border border-saffron-200 rounded-xl text-saffron-900 leading-snug">
                <strong className="font-bold">Impact:</strong> Future applications from this service will require manual document upload instead of auto-verification.
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => setSelectedConsent(null)}
                  className="py-2.5 px-4 border border-stone-300 rounded-xl font-bold text-stone-800 hover:bg-stone-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRevoke(selectedConsent.id)}
                  disabled={isRevoking}
                  className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                >
                  {isRevoking ? (
                    <><RefreshCw className="w-3.5 h-3.5 animate-spin" />Revoking...</>
                  ) : (
                    <><Trash2 className="w-3.5 h-3.5" />Confirm Revoke</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
