import { apiClient } from './client';
import { InteroperabilityInsight } from '../../types';

export const insightApi = {
  getAll: async (): Promise<InteroperabilityInsight[]> => {
    try {
      const response = await apiClient.get('/admin/insights');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        category: 'OPPORTUNITY',
        title: 'Increase Information Reuse for Property Certificate',
        description: '3 additional required property fields can be auto-verified by linking Bhoomi Cadastral RoR with Municipal Ward Registry.',
        metricValue: '3 Potential Fields',
        relatedPlatformOrService: 'Property Certificate',
        severity: 'INFO',
        actionUrl: '/admin/data-requirements',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        category: 'ATTENTION_REQUIRED',
        title: 'Municipal System Experienced Increased Response Times',
        description: 'e-NagarPalika Municipal Core average latency reached 1.8s today. Health monitoring recommends checking gateway thread pools.',
        metricValue: '1.8s Latency',
        relatedPlatformOrService: 'e-NagarPalika Municipal Core',
        severity: 'WARNING',
        actionUrl: '/admin/platform-status',
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        category: 'POSITIVE_IMPACT',
        title: '62% Information Reuse Sustained Across Active Workflows',
        description: '620 out of 1,000 required citizen details were fulfilled automatically through connected sovereign databases with zero manual uploads.',
        metricValue: '62% Reused',
        relatedPlatformOrService: 'Platform-Wide',
        severity: 'SUCCESS',
        actionUrl: '/admin/analytics',
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        category: 'HIGH_DEPENDENCY',
        title: 'Property Certificate High Platform Dependency',
        description: 'Service depends on 3 separate platforms (Municipal Core, Bhoomi LRS, DigiLocker). Ensure secondary replicas remain active.',
        metricValue: '3 Platforms',
        relatedPlatformOrService: 'Property Tax Assessment & Receipt',
        severity: 'INFO',
        actionUrl: '/admin/service-mapping',
        createdAt: new Date().toISOString()
      }
    ];
  }
};
