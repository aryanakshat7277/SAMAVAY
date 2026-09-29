import React, { useState, useEffect } from 'react';
import { insightApi } from '../../services/api';
import { InteroperabilityInsight } from '../../types';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Layers,
  RefreshCw,
  Lightbulb,
  Zap,
  Server,
  Activity,
  Compass
} from 'lucide-react';

export const AdminInsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<InteroperabilityInsight[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadInsights = async () => {
    setIsLoading(true);
    try {
      const data = await insightApi.getAll();
      setInsights(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const filteredInsights = insights.filter((ins) => {
    if (selectedCategory === 'ALL') return true;
    return ins.category.toUpperCase() === selectedCategory;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat.toUpperCase()) {
      case 'OPPORTUNITY':
        return <span className="bg-saffron-50 text-saffron-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-saffron-200">OPTIMIZATION OPPORTUNITY</span>;
      case 'ATTENTION_REQUIRED':
        return <span className="bg-rose-50 text-rose-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-rose-200">ATTENTION REQUIRED</span>;
      case 'POSITIVE_IMPACT':
        return <span className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-200">POSITIVE IMPACT</span>;
      default:
        return <span className="bg-gov-50 text-gov-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] border border-gov-200">HIGH DEPENDENCY</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <PageHeader
        category="ACTIONABLE INTEROPERABILITY INTELLIGENCE"
        categoryIcon={Lightbulb}
        title="Smart Interoperability Insights"
        description="System-generated telemetry insights, service optimization opportunities, platform reliability warnings, and measurable citizen impact."
        actions={
          <Button variant="outline" size="sm" onClick={loadInsights} icon={RefreshCw} isLoading={isLoading}>
            Refresh Insights
          </Button>
        }
      />

      {/* 2. FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'OPPORTUNITY', 'ATTENTION_REQUIRED', 'POSITIVE_IMPACT', 'HIGH_DEPENDENCY'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-gov-700 text-white shadow-gov border border-gov-800'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50 hover:border-gov-300'
            }`}
          >
            {cat === 'ALL' ? 'All Insights' : cat.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {/* 3. INSIGHTS CARDS GRID */}
      {filteredInsights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInsights.map((ins, idx) => {
            const isWarning = ins.category === 'ATTENTION_REQUIRED';
            const isSuccess = ins.category === 'POSITIVE_IMPACT';
            const isOpportunity = ins.category === 'OPPORTUNITY';

            return (
              <Card
                key={ins.id}
                padding="md"
                className={`flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover animate-stagger-in ${
                  isWarning
                    ? 'border-rose-200 bg-rose-50/20'
                    : isSuccess
                    ? 'border-gov-200 bg-gov-50/20'
                    : isOpportunity
                    ? 'border-saffron-200 bg-saffron-50/20'
                    : 'border-stone-200'
                }`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    {getCategoryBadge(ins.category)}
                    {ins.metricValue && (
                      <span className="font-mono font-bold text-stone-800 text-xs bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full">
                        {ins.metricValue}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-stone-900 font-serif leading-snug">
                    {ins.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {ins.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-500">
                    Target: <strong className="text-stone-800 font-mono">{ins.relatedPlatformOrService}</strong>
                  </span>

                  {ins.actionUrl && (
                    <Link
                      to={ins.actionUrl}
                      className="text-gov-700 hover:text-gov-900 font-bold inline-flex items-center gap-1 group"
                    >
                      <span>View Pipeline</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </Link>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="No Insights in this Category"
          description="There are currently no active automated recommendations in this filter category."
          actionText="View All Insights"
          onAction={() => setSelectedCategory('ALL')}
          actionIcon={Lightbulb}
        />
      )}
    </div>
  );
};
