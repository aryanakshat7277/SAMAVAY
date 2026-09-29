import { apiClient } from './client';
import { SystemEvent } from '../../types';

export const eventApi = {
  getAll: async (): Promise<SystemEvent[]> => {
    try {
      const response = await apiClient.get('/admin/events');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        eventType: 'INTEGRATION_SUCCESS',
        source: 'Interoperability Gateway',
        severity: 'INFO',
        message: '09:42 — Bhoomi Land Records System: Successful Information Verification (240 ms)',
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        eventType: 'SLOW_RESPONSE',
        source: 'e-NagarPalika Municipal Core',
        severity: 'WARNING',
        message: '09:40 — Municipal Core Platform: Slow Response Detected (1.8 sec latency)',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      {
        id: 3,
        eventType: 'FALLBACK_ACTIVATED',
        source: 'SARATHI Transport System',
        severity: 'WARNING',
        message: '09:35 — Primary Gateway Timeout: Fallback to DigiLocker Document Gateway activated',
        timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString()
      },
      {
        id: 4,
        eventType: 'CONSENT_GRANTED',
        source: 'Citizen Consent Engine',
        severity: 'INFO',
        message: '09:30 — DPDP Token Issued: Aarav Sharma authorized Property Assessment data reuse',
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString()
      }
    ];
  }
};
