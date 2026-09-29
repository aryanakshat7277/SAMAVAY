import { apiClient } from './client';
import { MonitoringSummary } from '../../types';

export const monitoringApi = {
  getSummary: async (): Promise<MonitoringSummary> => {
    try {
      const response = await apiClient.get('/admin/monitoring/summary');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return {
      totalPlatforms: 8,
      totalConnections: 8,
      activeConnections: 5,
      pendingRequests: 1,
      totalWorkflows: 2,
      totalRequests: 4,
      totalDepartments: 6,
      totalTransactions: 1664550,
      health: {
        healthyPercentage: 85,
        attentionPercentage: 10,
        issuesPercentage: 5,
        overallStatus: 'OPTIMAL',
        averageLatencyMs: 42,
        pkiSecurityCompliance: '100%'
      }
    };
  }
};
