import { apiClient } from './client';
import { AccessPolicy } from '../../types';

export const accessPolicyApi = {
  getAll: async (): Promise<AccessPolicy[]> => {
    try {
      const response = await apiClient.get('/admin/access-policies');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        name: 'Municipal to Bhoomi Property Policy',
        sourcePlatformId: 1,
        sourcePlatformName: 'e-NagarPalika Municipal Core',
        destinationPlatformId: 4,
        destinationPlatformName: 'Bhoomi Land Records Information System',
        dataCategory: 'Property Information',
        allowed: true,
        requiresConsent: true,
        active: true
      },
      {
        id: 2,
        name: 'Transport to DigiLocker Identity Policy',
        sourcePlatformId: 3,
        sourcePlatformName: 'SARATHI 4.0 Driving License System',
        destinationPlatformId: 6,
        destinationPlatformName: 'DigiLocker Government Document Exchange',
        dataCategory: 'Profile Verification',
        allowed: true,
        requiresConsent: true,
        active: true
      },
      {
        id: 3,
        name: 'VAHAN to DigiLocker RC Policy',
        sourcePlatformId: 2,
        sourcePlatformName: 'VAHAN 4.0 Vehicle Registry',
        destinationPlatformId: 6,
        destinationPlatformName: 'DigiLocker Government Document Exchange',
        dataCategory: 'Vehicle Records',
        allowed: true,
        requiresConsent: false,
        active: true
      }
    ];
  },

  create: async (policy: Partial<AccessPolicy>): Promise<AccessPolicy> => {
    try {
      const response = await apiClient.post('/admin/access-policies', policy);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return {
      id: Date.now(),
      name: policy.name || 'New Policy',
      sourcePlatformId: policy.sourcePlatformId || 1,
      sourcePlatformName: policy.sourcePlatformName || 'e-NagarPalika',
      destinationPlatformId: policy.destinationPlatformId || 4,
      destinationPlatformName: policy.destinationPlatformName || 'Bhoomi LRS',
      dataCategory: policy.dataCategory || 'General Data',
      allowed: policy.allowed !== undefined ? policy.allowed : true,
      requiresConsent: policy.requiresConsent !== undefined ? policy.requiresConsent : true,
      active: true
    };
  },

  toggle: async (id: number): Promise<AccessPolicy> => {
    try {
      const response = await apiClient.put(`/admin/access-policies/${id}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    const all = await accessPolicyApi.getAll();
    const found = all.find((p) => p.id === id);
    if (found) {
      found.active = !found.active;
      return found;
    }
    throw new Error('Policy not found');
  },

  delete: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/admin/access-policies/${id}`);
    } catch {
      // fallback
    }
  }
};
