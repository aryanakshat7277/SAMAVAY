import { apiClient } from './client';
import { DataConsent } from '../../types';
import { INITIAL_DATA_CONSENTS } from '../mockData';

const getStoredConsents = (): DataConsent[] => {
  const saved = localStorage.getItem('samavay_consents');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_DATA_CONSENTS;
    }
  }
  localStorage.setItem('samavay_consents', JSON.stringify(INITIAL_DATA_CONSENTS));
  return INITIAL_DATA_CONSENTS;
};

const saveStoredConsents = (consents: DataConsent[]) => {
  localStorage.setItem('samavay_consents', JSON.stringify(consents));
};

export const consentApi = {
  getAll: async (): Promise<DataConsent[]> => {
    try {
      const response = await apiClient.get('/consents');
      if (response.data?.data) {
        saveStoredConsents(response.data.data);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    return getStoredConsents();
  },

  getByUser: async (userId: number = 1): Promise<DataConsent[]> => {
    try {
      const response = await apiClient.get(`/consents/user/${userId}`);
      if (response.data?.data) {
        return response.data.data;
      }
    } catch {
      // fallback
    }
    const all = getStoredConsents();
    return all.filter((c) => c.userId === userId);
  },

  grantConsent: async (consent: Partial<DataConsent>): Promise<DataConsent> => {
    try {
      const response = await apiClient.post('/consents', consent);
      if (response.data?.data) {
        const current = getStoredConsents();
        saveStoredConsents([response.data.data, ...current]);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    const newConsent: DataConsent = {
      id: Date.now(),
      userId: consent.userId || 1,
      userName: consent.userName || 'Aarav Sharma',
      serviceId: consent.serviceId || 1,
      serviceName: consent.serviceName || 'Property Tax Assessment & Receipt',
      dataRequirementId: consent.dataRequirementId || 1,
      fieldName: consent.fieldName || 'Citizen Profile Information',
      sourceDepartmentName: consent.sourceDepartmentName || 'Municipal Corporation',
      sourcePlatformName: consent.sourcePlatformName || 'e-NagarPalika Municipal Core',
      purpose: consent.purpose || 'Service Delivery & Verification',
      status: 'ACTIVE',
      grantedAt: new Date().toISOString()
    };
    const current = getStoredConsents();
    saveStoredConsents([newConsent, ...current]);
    return newConsent;
  },

  revokeConsent: async (id: number): Promise<DataConsent> => {
    try {
      const response = await apiClient.put(`/consents/${id}/revoke`);
      if (response.data?.data) {
        const current = getStoredConsents();
        const updated = current.map((c) => (c.id === id ? response.data.data : c));
        saveStoredConsents(updated);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    const current = getStoredConsents();
    const updated = current.map((c) =>
      c.id === id ? { ...c, status: 'REVOKED', revokedAt: new Date().toISOString() } : c
    );
    saveStoredConsents(updated);
    return updated.find((c) => c.id === id)!;
  }
};
