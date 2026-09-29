import { apiClient } from './client';
import { ServiceWorkflow, WorkflowStep } from '../../types';
import { INITIAL_WORKFLOWS, INITIAL_WORKFLOW_STEPS } from '../mockData';

export const workflowApi = {
  getAll: async (): Promise<ServiceWorkflow[]> => {
    try {
      const response = await apiClient.get('/admin/workflows');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_WORKFLOWS;
  },

  getByServiceId: async (serviceId: number): Promise<ServiceWorkflow | undefined> => {
    try {
      const response = await apiClient.get(`/admin/workflows/service/${serviceId}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_WORKFLOWS.find((w) => w.serviceId === serviceId) || INITIAL_WORKFLOWS[0];
  },

  getSteps: async (workflowId: number): Promise<WorkflowStep[]> => {
    try {
      const response = await apiClient.get(`/admin/workflows/${workflowId}/steps`);
      if (response.data?.data && response.data.data.length > 0) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_WORKFLOW_STEPS.filter((s) => s.workflowId === workflowId);
  }
};
