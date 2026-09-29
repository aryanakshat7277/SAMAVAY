import React, { useState, useEffect } from 'react';
import { servicesApi, dataRequirementApi, platformApi } from '../../services/api';
import { GovernmentService, DataRequirement, GovernmentPlatform } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Select } from '../../components/common/Select';
import {
  Network,
  Building2,
  Server,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Database,
  Layers,
  Landmark,
  ArrowDown,
  Lock,
  Zap,
  Activity
} from 'lucide-react';

export const ServiceMappingPage: React.FC = () => {
  const [services, setServices] = useState<GovernmentService[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number>(1);
  const [dataRequirements, setDataRequirements] = useState<DataRequirement[]>([]);
  const [platforms, setPlatforms] = useState<GovernmentPlatform[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      try {
        const [allSvcs, allPlats] = await Promise.all([
          servicesApi.getAll(),
          platformApi.getAll()
        ]);
        setServices(allSvcs);
        setPlatforms(allPlats);
        if (allSvcs.length > 0) {
          setSelectedServiceId(allSvcs[0].id);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []);

  useEffect(() => {
    if (selectedServiceId) {
      dataRequirementApi.getByService(selectedServiceId).then(setDataRequirements);
    }
  }, [selectedServiceId]);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="CROSS-DEPARTMENTAL SERVICE ARCHITECTURE"
        categoryIcon={Network}
        title="Interactive Service Dependency Graph"
        description="Inspect how single citizen services orchestrate data retrieval across multiple sovereign department platforms."
      />

      {/* 2. SERVICE SELECTOR STRIP */}
      <Card padding="md" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
            Select Government Service:
          </label>
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(Number(e.target.value))}
            className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:border-gov-600 focus:bg-white transition max-w-md truncate cursor-pointer"
          >
            {services.map((svc) => (
              <option key={svc.id} value={svc.id}>
                {svc.name} ({svc.departmentName})
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500">
          Nodal Authority: <strong className="text-slate-800">{selectedService?.departmentName}</strong>
        </div>
      </Card>

      {/* 3. INTERACTIVE SVG DEPENDENCY GRAPH (SECTION 15) */}
      {selectedService && (
        <Card padding="lg" className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {selectedService.name} — Topological Data Flow
              </h3>
              <p className="text-xs text-slate-500">
                Hover over nodes to inspect authoritative endpoints and verification channels.
              </p>
            </div>
            <span className="text-xs font-semibold text-gov-800 bg-gov-50 border border-gov-200 px-3 py-1 rounded-full">
              mTLS PKI_X509 Encrypted
            </span>
          </div>

          {/* Interactive SVG Diagram */}
          <div className="bg-[#F6F8FB] border border-slate-200 rounded-3xl p-6 relative overflow-hidden">
            {/* Top Node: Selected Citizen Service */}
            <div className="flex justify-center mb-8">
              <div
                onMouseEnter={() => setHoveredNode('SERVICE')}
                onMouseLeave={() => setHoveredNode(null)}
                className={`p-4 bg-white border-2 rounded-2xl shadow-card transition-all duration-200 text-center max-w-sm cursor-pointer ${
                  hoveredNode === 'SERVICE' ? 'border-gov-600 ring-4 ring-gov-100 scale-105' : 'border-slate-300'
                }`}
              >
                <div className="flex items-center justify-center space-x-2 text-gov-800 text-xs font-bold mb-1">
                  <Landmark className="w-4 h-4" />
                  <span>CITIZEN SERVICE TOUCHPOINT</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-serif">{selectedService.name}</h4>
                <span className="text-[10px] text-slate-500">{selectedService.departmentName}</span>
              </div>
            </div>

            {/* Middle Node: SAMAVAY Gateway */}
            <div className="flex justify-center my-6 relative">
              <div className="absolute -top-6 w-0.5 h-6 bg-gov-600"></div>
              <div
                onMouseEnter={() => setHoveredNode('GATEWAY')}
                onMouseLeave={() => setHoveredNode(null)}
                className={`px-6 py-3 bg-gov-950 text-white rounded-2xl shadow-xl border-2 border-gov-500 flex items-center space-x-3 cursor-pointer transition-all duration-200 ${
                  hoveredNode === 'GATEWAY' ? 'scale-110 ring-4 ring-gov-200' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-gov-800 flex items-center justify-center">
                  <Network className="w-4 h-4 text-gov-300 animate-pulse" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase text-gov-300 block">Orchestrator</span>
                  <span className="text-xs font-bold font-serif">SAMAVAY Gateway</span>
                </div>
              </div>
            </div>

            {/* Bottom Nodes: Data Requirements from Connected Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {dataRequirements.map((req, idx) => {
                const isHovered = hoveredNode === `REQ_${req.id}`;

                return (
                  <div
                    key={req.id}
                    onMouseEnter={() => setHoveredNode(`REQ_${req.id}`)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`p-4 bg-white border-2 rounded-2xl shadow-card transition-all duration-200 space-y-2 cursor-pointer ${
                      isHovered ? 'border-emerald-500 ring-4 ring-emerald-100 scale-105' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Data Source {idx + 1}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">240ms</span>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{req.fieldName}</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Source: <strong>{req.sourceDepartmentName}</strong> ({req.sourcePlatformName})
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">DPDP Consent:</span>
                      <span className="font-bold text-gov-800">
                        {req.consentRequired ? 'Required' : 'Pre-Authorized'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
