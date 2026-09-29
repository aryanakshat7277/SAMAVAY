import { apiClient } from './client';
import { SystemAlert } from '../../types';

export const alertApi = {
  getAll: async (): Promise<SystemAlert[]> => {
    try {
      const response = await apiClient.get('/admin/alerts');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        title: 'Municipal System Slow Response Detected',
        message: 'e-NagarPalika Municipal Core average response time elevated to 1.8s over last 15 mins.',
        priority: 'MEDIUM',
        status: 'ACTIVE',
        relatedPlatformId: 1,
        relatedPlatformName: 'e-NagarPalika Municipal Core',
        impactedServicesCount: 2,
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
      },
      {
        id: 2,
        title: 'Land Records System Dependency Warning',
        message: 'Bhoomi Land Records primary node health check latency fluctuating. Secondary replica standby ready.',
        priority: 'LOW',
        status: 'ACTIVE',
        relatedPlatformId: 4,
        relatedPlatformName: 'Bhoomi Land Records Information System',
        impactedServicesCount: 3,
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
      },
      {
        id: 3,
        title: 'Transport System Fallback Engaged',
        message: 'SARATHI 4.0 temporary primary timeout resolved via DigiLocker sovereign proxy.',
        priority: 'HIGH',
        status: 'REVIEWED',
        relatedPlatformId: 3,
        relatedPlatformName: 'SARATHI 4.0 Driving License System',
        impactedServicesCount: 1,
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
      }
    ];
  },

  review: async (id: number): Promise<SystemAlert> => {
    try {
      const response = await apiClient.put(`/admin/alerts/${id}/review`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    const all = await alertApi.getAll();
    const found = all.find((a) => a.id === id);
    if (found) {
      found.status = 'REVIEWED';
      return found;
    }
    throw new Error('Alert not found');
  },

  resolve: async (id: number): Promise<SystemAlert> => {
    try {
      const response = await apiClient.put(`/admin/alerts/${id}/resolve`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    const all = await alertApi.getAll();
    const found = all.find((a) => a.id === id);
    if (found) {
      found.status = 'RESOLVED';
      found.resolvedAt = new Date().toISOString();
      return found;
    }
    throw new Error('Alert not found');
  }
};
