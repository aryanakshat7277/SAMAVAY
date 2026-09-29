import React from 'react';
import { GovernmentPlatform } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Card } from '../common/Card';
import { ShieldCheck, Activity, Link2, ExternalLink, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConnectedPlatformsWidgetProps {
  platforms: GovernmentPlatform[];
}

export const ConnectedPlatformsWidget: React.FC<ConnectedPlatformsWidgetProps> = ({ platforms }) => {
  return (
    <Card padding="lg" className="space-y-4 bg-white border-stone-200 shadow-card">
      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gov-50 border border-gov-200 text-gov-800 flex items-center justify-center">
            <Server className="w-4 h-4 text-gov-700" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900 font-serif">Connected Government Platforms</h4>
            <p className="text-xs text-stone-500">Live Interoperability Grid</p>
          </div>
        </div>

        <Link
          to="/admin/platform-registry"
          className="text-xs font-bold text-gov-700 hover:text-gov-900 flex items-center transition gap-1"
        >
          <span>Registry</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
        {platforms.slice(0, 6).map((plat) => (
          <div
            key={plat.id}
            className="p-3.5 bg-sandstone-100 border border-stone-200 rounded-2xl flex flex-col justify-between space-y-2 hover:border-gov-400 transition"
          >
            <div className="flex items-start justify-between gap-1">
              <span className="text-xs font-bold text-stone-900 font-serif line-clamp-1">{plat.name}</span>
              <StatusBadge status={plat.connectionStatus} size="sm" showIcon={false} />
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1.5 border-t border-stone-200/60 font-medium">
              <span className="truncate max-w-[110px]">{plat.departmentName}</span>
              <span className="font-bold text-gov-800 font-mono">{plat.uptimePercentage || 99.9}% Uptime</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gov-50 border border-gov-200 rounded-2xl p-3.5 flex items-center justify-between text-xs text-gov-900">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-gov-700 flex-shrink-0" />
          <span className="font-medium">Encrypted inter-departmental data exchange active across sovereign state & central platforms.</span>
        </div>
      </div>
    </Card>
  );
};
