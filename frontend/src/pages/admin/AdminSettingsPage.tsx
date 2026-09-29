import React from 'react';
import { Settings, ShieldCheck, Key, RefreshCw, Database, Server, Lock, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';

export const AdminSettingsPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        category="GATEWAY CONFIGURATION & SECURITY REGISTRY"
        categoryIcon={Settings}
        title="System & Security Settings"
        description="Configure security protocols, PKI certificate registries, and interoperability gateway parameters."
      />

      <Card padding="lg" className="space-y-6 text-xs bg-white border-stone-200 shadow-card">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-stone-900 font-serif flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gov-700" />
            DPDP & Sovereign Interoperability Standards
          </h3>

          <div className="p-4 bg-sandstone-100 border border-stone-200 rounded-2xl space-y-3 text-stone-700">
            <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
              <span className="font-medium">National Data Sharing Protocol Version:</span>
              <span className="font-mono font-bold text-gov-900 bg-gov-50 border border-gov-200 px-2 py-0.5 rounded text-[11px]">
                e-Gov Interop v2.1 (Compliant)
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-stone-200/60">
              <span className="font-medium">Digital Personal Data Protection Act (DPDPA 2023):</span>
              <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Strict Consent Enforced
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="font-medium">Public Key Infrastructure (PKI):</span>
              <span className="font-mono text-stone-900 font-bold text-[11px]">SHA-256 with RSA-4096 Sovereign Root</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h3 className="text-sm font-bold text-stone-900 font-serif flex items-center gap-2">
            <Key className="w-4 h-4 text-gov-700" />
            Departmental Gateway Credentials & Tokens
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">Central OAuth2 Gateway Client ID</label>
              <input
                type="text"
                disabled
                value="SAMAVAY_PROD_GW_09214"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl font-mono text-stone-800 text-xs select-all"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">Consent Token Expiry Window</label>
              <input
                type="text"
                disabled
                value="90 Days (Auto-Renewable with Citizen Purpose Notice)"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-stone-800 text-xs"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
