import { apiClient } from './client';
import { IntegrationConnection, IntegrationStatus } from '../../types';
import { INITIAL_CONNECTIONS } from '../mockData';

const getStoredConnections = (): IntegrationConnection[] => {
  const saved = localStorage.getItem('samavay_connections');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_CONNECTIONS;
    }
  }
  localStorage.setItem('samavay_connections', JSON.stringify(INITIAL_CONNECTIONS));
  return INITIAL_CONNECTIONS;
};

const saveStoredConnections = (conns: IntegrationConnection[]) => {
  localStorage.setItem('samavay_connections', JSON.stringify(conns));
};

export const integrationApi = {
  getAll: async (): Promise<IntegrationConnection[]> => {
    try {
      const response = await apiClient.get('/admin/integrations');
      if (response.data?.data) {
        saveStoredConnections(response.data.data);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    return getStoredConnections();
  },

  getById: async (id: number): Promise<IntegrationConnection | undefined> => {
    try {
      const response = await apiClient.get(`/admin/integrations/${id}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return getStoredConnections().find((c) => c.id === id);
  },

  create: async (connection: Partial<IntegrationConnection>): Promise<IntegrationConnection> => {
    try {
      const response = await apiClient.post('/admin/integrations', connection);
      if (response.data?.data) {
        const current = getStoredConnections();
        saveStoredConnections([response.data.data, ...current]);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    const newConn: IntegrationConnection = {
      id: Date.now(),
      name: connection.name || `${connection.sourcePlatformName} ➔ ${connection.destinationPlatformName}`,
      sourcePlatformId: connection.sourcePlatformId || 1,
      sourcePlatformName: connection.sourcePlatformName || 'Municipal Platform',
      sourceDepartmentId: connection.sourceDepartmentId || 1,
      sourceDepartmentName: connection.sourceDepartmentName || 'Municipal Corporation',
      destinationPlatformId: connection.destinationPlatformId || 4,
      destinationPlatformName: connection.destinationPlatformName || 'Land Records System',
      destinationDepartmentId: connection.destinationDepartmentId || 3,
      destinationDepartmentName: connection.destinationDepartmentName || 'Revenue Department',
      serviceId: connection.serviceId,
      serviceName: connection.serviceName,
      purpose: connection.purpose || 'Direct Data Verification',
      connectionType: connection.connectionType || 'SECURE_GATEWAY',
      status: (connection.status as IntegrationStatus) || 'SUBMITTED',
      dataExchangeProtocol: connection.dataExchangeProtocol || 'HTTPS/JSON (e-Gov Interop v2.1)',
      dataCategories: connection.dataCategories || 'Basic Profile, Verified Record Hash',
      consentRequired: true,
      totalTransactionsProcessed: 0,
      lastTestedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    const current = getStoredConnections();
    saveStoredConnections([newConn, ...current]);
    return newConn;
  },

  updateStatus: async (id: number, status: IntegrationStatus): Promise<IntegrationConnection> => {
    try {
      const response = await apiClient.put(`/admin/integrations/${id}/status`, { status });
      if (response.data?.data) {
        const current = getStoredConnections();
        const updated = current.map((c) => (c.id === id ? response.data.data : c));
        saveStoredConnections(updated);
        return response.data.data;
      }
    } catch {
      // fallback
    }
    const current = getStoredConnections();
    const updated = current.map((c) => (c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c));
    saveStoredConnections(updated);
    return updated.find((c) => c.id === id)!;
  }
};
