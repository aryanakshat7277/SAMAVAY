import React, { useState, useEffect } from 'react';
import { accessPolicyApi } from '../../services/api';
import { AccessPolicy } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { SearchBar } from '../../components/common/SearchBar';
import {
  ShieldCheck,
  Plus,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Lock,
  ArrowRight,
  Server,
  RefreshCw,
  Sliders,
  CheckCircle2,
  X
} from 'lucide-react';

export const AccessPoliciesPage: React.FC = () => {
  const [policies, setPolicies] = useState<AccessPolicy[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    sourcePlatformName: 'e-NagarPalika Municipal Core',
    sourcePlatformId: 1,
    destinationPlatformName: 'Bhoomi Land Records Information System',
    destinationPlatformId: 4,
    dataCategory: 'Property Information',
    allowed: true,
    requiresConsent: true
  });

  const loadPolicies = async () => {
    const data = await accessPolicyApi.getAll();
    setPolicies(data);
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  const handleToggle = async (id: number) => {
    await accessPolicyApi.toggle(id);
    await loadPolicies();
  };

  const handleDelete = async (id: number) => {
    await accessPolicyApi.delete(id);
    await loadPolicies();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await accessPolicyApi.create(newPolicy);
    setIsModalOpen(false);
    await loadPolicies();
  };

  const filteredPolicies = policies.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sourcePlatformName.toLowerCase().includes(q) ||
        p.destinationPlatformName.toLowerCase().includes(q) ||
        p.dataCategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Page Header */}
      <PageHeader
        category="CROSS-PLATFORM DATA ACCESS GOVERNANCE"
        categoryIcon={Lock}
        title="Interoperability Access Policies"
        description="Configure granular, attribute-based access control rules, purpose limitations, and mandatory DPDP citizen consent gates across platform pipelines."
        actions={
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} icon={Plus}>
            Create Access Policy
          </Button>
        }
      />

      {/* 2. Search & Filter Toolbar */}
      <Card padding="md" className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white border-stone-200 shadow-xs">
        <div className="w-full sm:w-96">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search policy name, platform, or category..."
          />
        </div>
        <span className="text-xs text-stone-500 font-medium">
          Showing <strong className="text-stone-900">{filteredPolicies.length}</strong> active policy definitions
        </span>
      </Card>

      {/* 3. Policies Table */}
      <Card padding="none" className="overflow-hidden bg-white border-stone-200 shadow-card">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900 font-serif">
            Active Platform-to-Platform Access Rules ({filteredPolicies.length})
          </h3>
          <span className="text-xs text-stone-500 font-mono">Zero Trust Protocol Enforced</span>
        </div>

        {filteredPolicies.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Policy Name</th>
                  <th className="py-3.5 px-4">Source Platform</th>
                  <th className="py-3.5 px-4">Destination Platform</th>
                  <th className="py-3.5 px-4">Data Category</th>
                  <th className="py-3.5 px-4">DPDP Consent Gate</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredPolicies.map((p) => (
                  <tr key={p.id} className="hover:bg-gov-50/30 transition">
                    <td className="py-3.5 px-4 font-bold text-stone-900 font-serif">{p.name}</td>
                    <td className="py-3.5 px-4 font-medium text-stone-700">{p.sourcePlatformName}</td>
                    <td className="py-3.5 px-4 font-medium text-stone-700">{p.destinationPlatformName}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-semibold text-[10px] border border-stone-200">
                        {p.dataCategory}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.requiresConsent ? (
                        <span className="bg-saffron-50 text-saffron-800 border border-saffron-200 px-2 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          Mandatory Consent
                        </span>
                      ) : (
                        <span className="bg-gov-50 text-gov-800 border border-gov-200 px-2 py-0.5 rounded-full font-bold text-[10px]">
                          Statutory Exemption
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggle(p.id)}
                        className="cursor-pointer inline-flex items-center gap-1.5"
                      >
                        {p.allowed ? (
                          <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1">
                            <ToggleRight className="w-3.5 h-3.5 text-emerald-600" />
                            ACTIVE
                          </span>
                        ) : (
                          <span className="text-stone-500 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1">
                            <ToggleLeft className="w-3.5 h-3.5 text-stone-400" />
                            DISABLED
                          </span>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete policy"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No Access Policies Found"
            description="No platform access control rules match your search. Create a new access rule to configure data permissions."
            actionText="Create Policy"
            onAction={() => setIsModalOpen(true)}
            actionIcon={Lock}
          />
        )}
      </Card>

      {/* Modal for Creating Access Policy */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-modal border border-stone-200 space-y-4 animate-fade-in-scale text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-gov-700" />
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  Define New Interoperability Access Policy
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Policy Title / Objective</label>
                <input
                  type="text"
                  required
                  value={newPolicy.name}
                  onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                  placeholder="e.g. Municipal Property Tax to Land Registry Cross-Check"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 focus:border-gov-600 focus:ring-1 focus:ring-gov-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Source Platform</label>
                  <select
                    value={newPolicy.sourcePlatformName}
                    onChange={(e) => setNewPolicy({ ...newPolicy, sourcePlatformName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                  >
                    <option value="e-NagarPalika Municipal Core">e-NagarPalika Municipal Core</option>
                    <option value="SARATHI Transport 4.0">SARATHI Transport 4.0</option>
                    <option value="Bhoomi Land Records Information System">Bhoomi Land Records Information System</option>
                    <option value="DigiLocker Government Document Gateway">DigiLocker Document Gateway</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Destination Platform</label>
                  <select
                    value={newPolicy.destinationPlatformName}
                    onChange={(e) => setNewPolicy({ ...newPolicy, destinationPlatformName: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                  >
                    <option value="Bhoomi Land Records Information System">Bhoomi Land Records Information System</option>
                    <option value="SARATHI Transport 4.0">SARATHI Transport 4.0</option>
                    <option value="e-NagarPalika Municipal Core">e-NagarPalika Municipal Core</option>
                    <option value="DigiLocker Government Document Gateway">DigiLocker Document Gateway</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Data Category</label>
                <input
                  type="text"
                  required
                  value={newPolicy.dataCategory}
                  onChange={(e) => setNewPolicy({ ...newPolicy, dataCategory: e.target.value })}
                  placeholder="e.g. Cadastral Coordinates, Revenue Titles"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="consentGate"
                  checked={newPolicy.requiresConsent}
                  onChange={(e) => setNewPolicy({ ...newPolicy, requiresConsent: e.target.checked })}
                  className="rounded border-stone-300 text-gov-700 focus:ring-gov-600"
                />
                <label htmlFor="consentGate" className="font-medium text-stone-700 select-none cursor-pointer">
                  Require explicit citizen DPDP Act purpose-bound consent prior to data query
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Access Policy
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
