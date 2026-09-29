import React, { useState, useEffect } from 'react';
import { ruleApi } from '../../services/api';
import { InteroperabilityRule } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Sliders,
  Plus,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  RefreshCw,
  Code2,
  Database,
  ArrowRight,
  X
} from 'lucide-react';

export const InteroperabilityRulesPage: React.FC = () => {
  const [rules, setRules] = useState<InteroperabilityRule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    serviceName: 'Property Tax Assessment & Receipt',
    conditionType: 'PLATFORM_STATUS',
    conditionValue: 'BHOOMI_CONNECTED',
    actionType: 'REUSE_DATA',
    actionConfiguration: '{"source":"Bhoomi LRS","field":"Land Ownership & Cadastral Title"}'
  });

  const loadRules = async () => {
    const data = await ruleApi.getAll();
    setRules(data);
  };

  useEffect(() => {
    loadRules();
  }, []);

  const handleToggle = async (id: number) => {
    await ruleApi.toggle(id);
    await loadRules();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await ruleApi.create(newRule);
    setIsModalOpen(false);
    await loadRules();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <PageHeader
        category="AUTOMATION & LOGICAL INTEROPERABILITY"
        categoryIcon={Sliders}
        title="Interoperability Rule Engine"
        description="Configure condition-driven data exchange, automatic DPDP consent checks, and platform fallback behaviors across public service workflows."
        actions={
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} icon={Plus}>
            Create New Rule
          </Button>
        }
      />

      {/* 2. Rules Table Card */}
      <Card padding="none" className="overflow-hidden bg-white border-stone-200 shadow-card">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-900 font-serif">
            Configured Interoperability Rules ({rules.length})
          </h3>
          <span className="text-xs text-stone-500 font-mono">Dynamic Rule Evaluation Engine Active</span>
        </div>

        {rules.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Rule Name & Objective</th>
                  <th className="py-3.5 px-4">Target Service</th>
                  <th className="py-3.5 px-4">Trigger Condition</th>
                  <th className="py-3.5 px-4">Automated Action</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {rules.map((r) => (
                  <tr key={r.id} className="hover:bg-gov-50/30 transition">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-stone-900 font-serif">{r.name}</p>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{r.description}</p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-700">{r.serviceName}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono text-[10px] border border-stone-200">
                        {r.conditionType}: {r.conditionValue}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-gov-50 text-gov-800 border border-gov-200 px-2 py-0.5 rounded font-bold text-[10px] font-mono">
                        {r.actionType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {r.active ? (
                        <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-stone-500 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          DISABLED
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleToggle(r.id)}
                        className="cursor-pointer inline-flex items-center"
                      >
                        {r.active ? (
                          <ToggleRight className="w-5 h-5 text-gov-700" />
                        ) : (
                          <ToggleLeft className="w-5 h-5 text-stone-400" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No Interoperability Rules Configured"
            description="Create rules to automate data reuse and fallback actions."
            actionText="Create Rule"
            onAction={() => setIsModalOpen(true)}
            actionIcon={Sliders}
          />
        )}
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-modal border border-stone-200 space-y-4 animate-fade-in-scale text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-gov-700" />
                <h3 className="text-base font-bold text-stone-900 font-serif">
                  Define New Interoperability Automation Rule
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
                <label className="block font-bold text-stone-700 mb-1">Rule Name</label>
                <input
                  type="text"
                  required
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  placeholder="e.g. Auto-Reuse Bhoomi Title on Tax Assessment"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  placeholder="Explains what this automation accomplishes"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900 h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Condition Type</label>
                  <select
                    value={newRule.conditionType}
                    onChange={(e) => setNewRule({ ...newRule, conditionType: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                  >
                    <option value="PLATFORM_STATUS">PLATFORM_STATUS</option>
                    <option value="DATA_AVAILABLE">DATA_AVAILABLE</option>
                    <option value="CONSENT_GRANTED">CONSENT_GRANTED</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Action Type</label>
                  <select
                    value={newRule.actionType}
                    onChange={(e) => setNewRule({ ...newRule, actionType: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-stone-900"
                  >
                    <option value="REUSE_DATA">REUSE_DATA</option>
                    <option value="FALLBACK_PROXY">FALLBACK_PROXY</option>
                    <option value="REQUEST_CONSENT">REQUEST_CONSENT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-100">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Rule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
