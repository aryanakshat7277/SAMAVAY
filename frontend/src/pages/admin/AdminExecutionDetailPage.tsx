import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orchestrationApi } from '../../services/api';
import { WorkflowExecution, WorkflowExecutionStep } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Card } from '../../components/common/Card';
import { PageHeader } from '../../components/common/PageHeader';
import {
  Cpu,
  ArrowLeft,
  Server,
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Activity,
  Check
} from 'lucide-react';

export const AdminExecutionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [execution, setExecution] = useState<WorkflowExecution | null>(null);
  const [steps, setSteps] = useState<WorkflowExecutionStep[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadExecution = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const exec = await orchestrationApi.getExecutionById(Number(id));
        if (exec) {
          setExecution(exec);
          const stepList = await orchestrationApi.getExecutionSteps(exec.id);
          setSteps(stepList);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadExecution();
  }, [id]);

  if (isLoading) {
    return <div className="p-8 text-center text-xs text-stone-500 font-medium">Loading orchestration telemetry...</div>;
  }

  if (!execution) {
    return (
      <div className="p-8 text-center space-y-3">
        <h2 className="text-base font-bold text-stone-900 font-serif">Execution Record Not Found</h2>
        <Link to="/admin/orchestration" className="text-xs font-bold text-gov-700 hover:underline">
          Back to Orchestrator Console
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Link
        to="/admin/orchestration"
        className="inline-flex items-center text-xs font-bold text-gov-800 hover:text-gov-950 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Orchestrator Console
      </Link>

      {/* Header Card */}
      <Card padding="lg" className="space-y-5 bg-white border-stone-200 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-gov-800 bg-gov-50 px-2.5 py-0.5 rounded-full border border-gov-200">
                {execution.applicationNumber}
              </span>
              <StatusBadge status={execution.status} size="sm" />
            </div>

            <h1 className="text-2xl font-black text-stone-900 font-serif">
              {execution.serviceName}
            </h1>
            <p className="text-xs text-stone-500">Workflow Definition: <strong>{execution.workflowName}</strong></p>
          </div>

          <div className="text-right text-xs">
            <span className="text-stone-500 block">Execution Progress</span>
            <span className="font-bold text-stone-900 text-sm font-mono">
              Step {execution.currentStep} of {execution.totalSteps}
            </span>
          </div>
        </div>

        {/* Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-stone-100 text-xs">
          <div className="p-3 bg-sandstone-100 border border-stone-200 rounded-2xl">
            <span className="text-stone-500 block text-[10px] uppercase font-medium">Active Stage</span>
            <span className="font-bold text-stone-900 font-serif text-sm">{execution.currentStageName || 'Processing'}</span>
          </div>

          <div className="p-3 bg-sandstone-100 border border-stone-200 rounded-2xl">
            <span className="text-stone-500 block text-[10px] uppercase font-medium">Started At</span>
            <span className="font-bold text-stone-900 font-mono">
              {new Date(execution.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="p-3 bg-sandstone-100 border border-stone-200 rounded-2xl">
            <span className="text-stone-500 block text-[10px] uppercase font-medium">Protocol</span>
            <span className="font-bold text-gov-800 font-mono">e-Gov Interop v2.1</span>
          </div>

          <div className="p-3 bg-sandstone-100 border border-stone-200 rounded-2xl">
            <span className="text-stone-500 block text-[10px] uppercase font-medium">Security Standard</span>
            <span className="font-bold text-emerald-800">mTLS PKI_X509</span>
          </div>
        </div>
      </Card>

      {/* Multi-Stage Step Execution Tree */}
      <Card padding="lg" className="space-y-5 bg-white border-stone-200 shadow-card">
        <h3 className="text-sm font-bold text-stone-900 font-serif">
          Multi-Department Step Execution Flow & Telemetry
        </h3>

        <div className="space-y-3">
          {steps.map((step, idx) => {
            const isCompleted = step.status === 'COMPLETED';
            const isInProgress = step.status === 'IN_PROGRESS';

            return (
              <div
                key={step.id}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  isInProgress
                    ? 'bg-gov-50/70 border-gov-300 ring-2 ring-gov-200/50'
                    : isCompleted
                    ? 'bg-sandstone-100/70 border-stone-200'
                    : 'bg-white border-stone-200 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : isInProgress
                          ? 'bg-gov-700 text-white animate-pulse'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : step.stepOrder}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-stone-900 text-xs font-serif">{step.stepName}</h4>
                        <StatusBadge status={step.status} size="sm" />
                      </div>

                      <div className="flex items-center space-x-3 text-[11px] text-stone-500">
                        <span>Department: <strong className="text-stone-700">{step.responsibleDepartment}</strong></span>
                        <span>•</span>
                        <span>Platform: <em className="text-gov-800 font-mono">{step.responsiblePlatform}</em></span>
                      </div>

                      {/* Dual message: Citizen friendly + Admin Telemetry */}
                      <div className="mt-2 space-y-1.5">
                        <p className="text-[11px] text-stone-700 bg-white border border-stone-200 p-2.5 rounded-xl">
                          <span className="font-bold text-stone-900">Citizen View:</span> {step.citizenMessage}
                        </p>
                        {step.adminMessage && (
                          <p className="text-[10px] text-gov-900 font-mono bg-gov-100/70 border border-gov-200 p-2 rounded-xl">
                            <span className="font-bold">Telemetry:</span> {step.adminMessage}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] text-stone-400 block uppercase font-medium">Latency</span>
                    <span className="font-mono font-bold text-stone-800 bg-white border border-stone-200 px-2 py-0.5 rounded text-[11px]">
                      {step.responseTimeMs || 35} ms
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
