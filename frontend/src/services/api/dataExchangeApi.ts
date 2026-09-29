import { apiClient } from './client';
import { GatewayRequestLog } from '../../types';

export const dataExchangeApi = {
  getAll: async (): Promise<GatewayRequestLog[]> => {
    try {
      const response = await apiClient.get('/admin/data-exchange');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        requestId: 'REQ-2026-00128',
        serviceRequestId: 1,
        applicationNumber: 'SAM-2026-10234',
        sourcePlatformId: 1,
        sourcePlatformName: 'e-NagarPalika Municipal Core',
        destinationPlatformId: 4,
        destinationPlatformName: 'Bhoomi Land Records Information System',
        operationType: 'PROPERTY_TITLE_LOOKUP',
        dataCategory: 'Property Information',
        status: 'SUCCESS',
        responseTimeMs: 240,
        fallbackUsed: false,
        securityVerified: true,
        consentVerified: true,
        responseSummary: 'Title Deed RoR #42/1A matched and verified against cadastral map.',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        requestId: 'REQ-2026-00129',
        serviceRequestId: 2,
        applicationNumber: 'SAM-2026-09841',
        sourcePlatformId: 3,
        sourcePlatformName: 'SARATHI 4.0 Driving License System',
        destinationPlatformId: 6,
        destinationPlatformName: 'DigiLocker Government Document Exchange',
        operationType: 'DL_CREDENTIAL_ISSUANCE',
        dataCategory: 'Vehicle Records',
        status: 'SUCCESS',
        responseTimeMs: 180,
        fallbackUsed: false,
        securityVerified: true,
        consentVerified: true,
        responseSummary: 'Contactless biometric hash match confirmed. Digital DL pushed to DigiLocker.',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
      }
    ];
  },

  getByRequestId: async (requestId: string): Promise<GatewayRequestLog | undefined> => {
    try {
      const response = await apiClient.get(`/admin/data-exchange/${requestId}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    const all = await dataExchangeApi.getAll();
    return all.find((l) => l.requestId === requestId);
  }
};
