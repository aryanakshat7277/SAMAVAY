import React, { useState, useEffect } from 'react';
import {
  Activity,
  Server,
  Zap,
  ShieldCheck,
  Radio,
  Clock,
  ArrowRight,
  Database,
  Building2,
  RefreshCw
} from 'lucide-react';

interface NodePing {
  id: string;
  name: string;
  dept: string;
  latency: number;
  status: 'HEALTHY' | 'DEGRADED' | 'ACTIVE';
  reqPerSec: number;
}

export const TelemetryRadarWidget: React.FC = () => {
  const [nodes, setNodes] = useState<NodePing[]>([
    { id: '1', name: 'Bhoomi LRS Cadastral Gateway', dept: 'Revenue', latency: 240, status: 'HEALTHY', reqPerSec: 142 },
    { id: '2', name: 'SARATHI 4.0 DL Registry', dept: 'Transport', latency: 180, status: 'HEALTHY', reqPerSec: 215 },
    { id: '3', name: 'e-NagarPalika Tax Registry', dept: 'Municipal', latency: 210, status: 'HEALTHY', reqPerSec: 98 },
    { id: '4', name: 'DigiLocker Identity Vault', dept: 'MeitY / Central', latency: 95, status: 'HEALTHY', reqPerSec: 480 },
    { id: '5', name: 'Ayushman Bharat AB-PMJAY', dept: 'Health', latency: 160, status: 'HEALTHY', reqPerSec: 175 },
    { id: '6', name: 'NSP Scholarship Portal', dept: 'Education', latency: 220, status: 'HEALTHY', reqPerSec: 110 },
  ]);

  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const liveEvents = [
    { time: 'Just now', text: 'mTLS handshake verified with Bhoomi Land Registry (240ms)', type: 'SUCCESS' },
    { time: '2s ago', text: 'DigiLocker issued consent token for Aadhaar credential #SAM-2026-9182', type: 'SUCCESS' },
    { time: '5s ago', text: 'SARATHI DL #KA-05-2018-00912 verified with zero manual entry', type: 'SUCCESS' },
    { time: '9s ago', text: 'Municipal Ward 14 tax clearance verified across 482 properties', type: 'SUCCESS' },
    { time: '12s ago', text: 'Gateway load-balancing optimized route latency to 148ms average', type: 'INFO' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % liveEvents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [liveEvents.length]);

  return (
    <div className="bg-white border-2 border-stone-200 rounded-3xl p-6 sm:p-7 shadow-card space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gov-900 text-white flex items-center justify-center font-bold shadow-xs">
            <Radio className="w-4 h-4 text-saffron-400 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900 font-serif">
              National Mesh Live Telemetry & Radar Stream
            </h4>
            <p className="text-[10px] text-stone-500">Autonomous Health & Traffic Monitor</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            All 6 Nodes Synchronized
          </span>
        </div>
      </div>

      {/* Live Radar Grid Canvas & Active Streams */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Node Health Tiles (Col 7) */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-2 hover:bg-white hover:border-gov-400 hover:shadow-xs transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gov-800 bg-gov-100 px-2 py-0.5 rounded-full">
                  {node.dept}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  {node.latency}ms
                </span>
              </div>

              <div>
                <h5 className="font-bold text-stone-900 line-clamp-1">{node.name}</h5>
                <span className="text-[10px] text-stone-500 font-mono">{node.reqPerSec} req/sec throughput</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Live Event Telemetry Stream Ticker (Col 5) */}
        <div className="md:col-span-5 p-5 bg-[#092119] text-stone-100 rounded-2xl shadow-md border border-[#164a37] space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-[#164a37] pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-saffron-400" />
              Live Telemetry Log
            </span>
            <span className="text-[9px] font-mono text-stone-400">mTLS Encrypted</span>
          </div>

          <div className="space-y-2.5 min-h-[140px]">
            {liveEvents.map((evt, idx) => {
              const isHighlight = idx === activeEventIndex;

              return (
                <div
                  key={idx}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isHighlight
                      ? 'bg-white/10 border border-saffron-400/50 shadow-xs'
                      : 'opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-stone-400 mb-0.5">
                    <span className="font-mono text-saffron-300">{evt.time}</span>
                    <span className="text-emerald-400 font-bold">● SUCCESS</span>
                  </div>
                  <p className="text-[11px] text-stone-200 font-sans leading-tight">
                    {evt.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
