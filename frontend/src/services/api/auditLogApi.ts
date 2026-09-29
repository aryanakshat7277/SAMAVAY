import { apiClient } from './client';
import { AuditLog } from '../../types';
import { INITIAL_AUDIT_LOGS } from '../mockData';

export const auditLogApi = {
  getRecentLogs: async (): Promise<AuditLog[]> => {
    try {
      const response = await apiClient.get('/admin/audit-logs');
      if (response.data?.data && response.data.data.length > 0) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_AUDIT_LOGS;
  }
};
