import { apiClient } from './client';
import { InteroperabilityRule } from '../../types';

export const ruleApi = {
  getAll: async (): Promise<InteroperabilityRule[]> => {
    try {
      const response = await apiClient.get('/admin/rules');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        name: 'Auto-Reuse Bhoomi Cadastral Title',
        description: 'When citizen applies for Property Certificate and Bhoomi is connected, auto-retrieve deed',
        serviceId: 1,
        serviceName: 'Property Tax Assessment & Receipt',
        conditionType: 'PLATFORM_STATUS',
        conditionValue: 'BHOOMI_CONNECTED',
        actionType: 'REUSE_DATA',
        actionConfiguration: '{"source":"Bhoomi LRS","field":"Land Ownership & Cadastral Title"}',
        active: true
      },
      {
        id: 2,
        name: 'Enforce DPDP Consent on Identity Records',
        description: 'When identity details are queried across ministries, require explicit citizen authorization token',
        serviceId: 1,
        serviceName: 'Property Tax Assessment & Receipt',
        conditionType: 'CONSENT_STATUS',
        conditionValue: 'CONSENT_NOT_GRANTED',
        actionType: 'REQUEST_CONSENT',
        actionConfiguration: '{"action":"CREATE_CONSENT_ACTION","expiryDays":90}',
        active: true
      },
      {
        id: 3,
        name: 'Omit Verified Fields in Dynamic Form Engine',
        description: 'When required data is pre-verified via interop pipe, dynamically hide form input',
        serviceId: 1,
        serviceName: 'Property Tax Assessment & Receipt',
        conditionType: 'DATA_AVAILABILITY',
        conditionValue: 'RECORD_AVAILABLE',
        actionType: 'ADD_FORM_FIELD',
        actionConfiguration: '{"mode":"OMIT_PRE_VERIFIED"}',
        active: true
      }
    ];
  },

  create: async (rule: Partial<InteroperabilityRule>): Promise<InteroperabilityRule> => {
    try {
      const response = await apiClient.post('/admin/rules', rule);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return {
      id: Date.now(),
      name: rule.name || 'New Rule',
      description: rule.description || '',
      serviceId: rule.serviceId,
      serviceName: rule.serviceName,
      conditionType: rule.conditionType || 'PLATFORM_STATUS',
      conditionValue: rule.conditionValue || 'ACTIVE',
      actionType: rule.actionType || 'REUSE_DATA',
      actionConfiguration: rule.actionConfiguration || '{}',
      active: true
    };
  },

  toggle: async (id: number): Promise<InteroperabilityRule> => {
    try {
      const response = await apiClient.put(`/admin/rules/${id}/toggle`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    const all = await ruleApi.getAll();
    const found = all.find((r) => r.id === id);
    if (found) {
      found.active = !found.active;
      return found;
    }
    throw new Error('Rule not found');
  }
};
