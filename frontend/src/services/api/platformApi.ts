import { apiClient } from './client';
import { GovernmentPlatform } from '../../types';
import { INITIAL_PLATFORMS } from '../mockData';

const getStoredPlatforms = (): GovernmentPlatform[] => {
  const saved = localStorage.getItem('samavay_platforms');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_PLATFORMS;
    }
  }
  localStorage.setItem('samavay_platforms', JSON.stringify(INITIAL_PLATFORMS));
  return INITIAL_PLATFORMS;
};

const saveStoredPlatforms = (platforms: GovernmentPlatform[]) => {
  localStorage.setItem('samavay_platforms', JSON.stringify(platforms));
};

export const platformApi = {
  getAll: async (): Promise<GovernmentPlatform[]> => {
    try {
      const response = await apiClient.get('/admin/platforms');
      if (response.data?.data) {
        saveStoredPlatforms(response.data.data);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    return getStoredPlatforms();
  },

  getById: async (id: number): Promise<GovernmentPlatform | undefined> => {
    try {
      const response = await apiClient.get(`/admin/platforms/${id}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return getStoredPlatforms().find((p) => p.id === id);
  },

  create: async (platform: Partial<GovernmentPlatform>): Promise<GovernmentPlatform> => {
    try {
      const response = await apiClient.post('/admin/platforms', platform);
      if (response.data?.data) {
        const current = getStoredPlatforms();
        saveStoredPlatforms([response.data.data, ...current]);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    const newPlat: GovernmentPlatform = {
      id: Date.now(),
      name: platform.name || 'New Platform',
      code: platform.code || `PLT-${Date.now()}`,
      departmentId: platform.departmentId || 1,
      departmentName: platform.departmentName || 'Municipal Corporation',
      description: platform.description || '',
      platformType: platform.platformType || 'API_PLATFORM',
      environment: platform.environment || 'PRODUCTION',
      connectionStatus: platform.connectionStatus || 'CONNECTED',
      integrationStatus: 'READY',
      endpointUrl: platform.endpointUrl || 'https://samavay.gov.in/api',
      authProtocol: platform.authProtocol || 'OAUTH2_MGS',
      uptimePercentage: 99.9,
      lastPingAt: 'Just now',
      createdAt: new Date().toISOString()
    };
    const current = getStoredPlatforms();
    saveStoredPlatforms([newPlat, ...current]);
    return newPlat;
  },

  update: async (id: number, platform: Partial<GovernmentPlatform>): Promise<GovernmentPlatform> => {
    try {
      const response = await apiClient.put(`/admin/platforms/${id}`, platform);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    const current = getStoredPlatforms();
    const updatedList = current.map((p) => (p.id === id ? { ...p, ...platform, updatedAt: new Date().toISOString() } : p));
    saveStoredPlatforms(updatedList);
    return updatedList.find((p) => p.id === id)!;
  },

  delete: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/admin/platforms/${id}`);
    } catch {
      // fallback
    }
    const current = getStoredPlatforms().filter((p) => p.id !== id);
    saveStoredPlatforms(current);
  }
};
