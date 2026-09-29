import { apiClient } from './client';
import { DataRequirement } from '../../types';
import { INITIAL_DATA_REQUIREMENTS } from '../mockData';

const getStoredRequirements = (): DataRequirement[] => {
  const saved = localStorage.getItem('samavay_data_requirements');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_DATA_REQUIREMENTS;
    }
  }
  localStorage.setItem('samavay_data_requirements', JSON.stringify(INITIAL_DATA_REQUIREMENTS));
  return INITIAL_DATA_REQUIREMENTS;
};

const saveStoredRequirements = (reqs: DataRequirement[]) => {
  localStorage.setItem('samavay_data_requirements', JSON.stringify(reqs));
};

export const dataRequirementApi = {
  getAll: async (): Promise<DataRequirement[]> => {
    try {
      const response = await apiClient.get('/admin/data-requirements');
      if (response.data?.data) {
        saveStoredRequirements(response.data.data);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    return getStoredRequirements();
  },

  getByService: async (serviceId: number): Promise<DataRequirement[]> => {
    try {
      const response = await apiClient.get(`/services/${serviceId}/data-requirements`);
      if (response.data?.data && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch {
      // fallback
    }
    const all = getStoredRequirements();
    return all.filter((r) => r.serviceId === serviceId);
  },

  create: async (requirement: Partial<DataRequirement>): Promise<DataRequirement> => {
    try {
      const response = await apiClient.post('/admin/data-requirements', requirement);
      if (response.data?.data) {
        const current = getStoredRequirements();
        saveStoredRequirements([response.data.data, ...current]);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    const newReq: DataRequirement = {
      id: Date.now(),
      serviceId: requirement.serviceId || 1,
      serviceName: requirement.serviceName || 'Property Tax Assessment & Receipt',
      fieldName: requirement.fieldName || 'New Field',
      description: requirement.description || '',
      sourceDepartmentId: requirement.sourceDepartmentId || 1,
      sourceDepartmentName: requirement.sourceDepartmentName || 'Municipal Corporation',
      sourcePlatformId: requirement.sourcePlatformId || 1,
      sourcePlatformName: requirement.sourcePlatformName || 'Municipal Core',
      required: requirement.required !== undefined ? requirement.required : true,
      availabilityStatus: requirement.availabilityStatus || 'AVAILABLE',
      consentRequired: requirement.consentRequired !== undefined ? requirement.consentRequired : true,
      purpose: requirement.purpose || 'Verification',
      createdAt: new Date().toISOString()
    };
    const current = getStoredRequirements();
    saveStoredRequirements([newReq, ...current]);
    return newReq;
  }
};
