import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orchestrationApi } from '../../services/api';
import { GovernmentService } from '../../types';
import { Layers, ArrowRight, Building2 } from 'lucide-react';
import { Card } from '../common/Card';

interface ServiceRecommendationsWidgetProps {
  currentServiceId: number;
}

export const ServiceRecommendationsWidget: React.FC<ServiceRecommendationsWidgetProps> = ({
  currentServiceId
}) => {
  const [recommendations, setRecommendations] = useState<GovernmentService[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentServiceId) {
      orchestrationApi.getRecommendations(currentServiceId).then((data) => {
        setRecommendations(data);
        setIsLoading(false);
      });
    }
  }, [currentServiceId]);

  if (isLoading || recommendations.length === 0) return null;

  return (
    <Card padding="lg" className="space-y-4 bg-white border-stone-200 shadow-card">
      <div className="flex items-center space-x-2 text-gov-800">
        <Layers className="w-5 h-5 text-gov-700" />
        <h3 className="text-sm font-bold text-stone-900 font-serif">
          Related Connected Government Services
        </h3>
      </div>
      <p className="text-xs text-stone-500 -mt-2">
        Citizens who accessed this service frequently required these related departmental procedures:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {recommendations.map((svc) => (
          <Link
            key={svc.id}
            to={`/services/${svc.id}`}
            className="p-4 bg-sandstone-100 border border-stone-200 hover:border-gov-400 rounded-2xl transition flex flex-col justify-between space-y-3 group shadow-xs hover:shadow-card-hover"
          >
            <div>
              <span className="text-[10px] font-bold text-gov-800 uppercase tracking-wider block">
                {svc.departmentName}
              </span>
              <h4 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-gov-800 transition font-serif mt-1">
                {svc.name}
              </h4>
              <p className="text-[11px] text-stone-500 line-clamp-2 mt-1">{svc.description}</p>
            </div>

            <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-gov-800 font-bold">
              <span>~{svc.estimatedProcessingDays} Days</span>
              <span className="inline-flex items-center group-hover:translate-x-0.5 transition">
                Apply <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
};
