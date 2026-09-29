import { apiClient } from './client';
import { PlatformStatusDto, ServiceImpactDto } from '../../types';

export const platformStatusApi = {
  getAll: async (): Promise<PlatformStatusDto[]> => {
    try {
      const response = await apiClient.get('/admin/platform-status');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        name: 'e-NagarPalika Municipal Core',
        code: 'EPALIKA-CORE',
        departmentName: 'Municipal Corporation',
        environment: 'PRODUCTION',
        status: 'HEALTHY',
        averageResponseTimeMs: 45,
        successRatePercentage: 98.2,
        activeIntegrationsCount: 3,
        simulationMode: 'NORMAL',
        lastActivity: 'Active 2 mins ago'
      },
      {
        id: 2,
        name: 'VAHAN 4.0 Vehicle Registry',
        code: 'VAHAN-REG-4',
        departmentName: 'Transport Department',
        environment: 'PRODUCTION',
        status: 'HEALTHY',
        averageResponseTimeMs: 38,
        successRatePercentage: 99.1,
        activeIntegrationsCount: 2,
        simulationMode: 'NORMAL',
        lastActivity: 'Active 5 mins ago'
      },
      {
        id: 3,
        name: 'SARATHI 4.0 Driving License System',
        code: 'SARATHI-DL-4',
        departmentName: 'Transport Department',
        environment: 'PRODUCTION',
        status: 'DEGRADED',
        averageResponseTimeMs: 140,
        successRatePercentage: 95.4,
        activeIntegrationsCount: 2,
        simulationMode: 'SLOW',
        lastActivity: 'Active 1 min ago'
      },
      {
        id: 4,
        name: 'Bhoomi Land Records Information System',
        code: 'BHOOMI-LRS',
        departmentName: 'Revenue & Land Records',
        environment: 'PRODUCTION',
        status: 'HEALTHY',
        averageResponseTimeMs: 42,
        successRatePercentage: 98.8,
        activeIntegrationsCount: 4,
        simulationMode: 'NORMAL',
        lastActivity: 'Active just now'
      },
      {
        id: 6,
        name: 'DigiLocker Government Document Exchange',
        code: 'DIGILOCKER-GW',
        departmentName: 'Inter-Department Gateway',
        environment: 'PRODUCTION',
        status: 'HEALTHY',
        averageResponseTimeMs: 28,
        successRatePercentage: 99.8,
        activeIntegrationsCount: 5,
        simulationMode: 'NORMAL',
        lastActivity: 'Active just now'
      }
    ];
  },

  getImpact: async (platformId: number): Promise<ServiceImpactDto> => {
    try {
      const response = await apiClient.get(`/admin/platforms/${platformId}/impact`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return {
      platformId,
      platformName: 'Bhoomi Land Records Information System',
      departmentName: 'Revenue & Land Records',
      platformStatus: 'DEGRADED',
      impactedServicesCount: 2,
      impactedServices: [
        {
          serviceId: 1,
          serviceName: 'Property Tax Assessment & Receipt',
          departmentName: 'Municipal Corporation',
          requiredDataField: 'Cadastral Title & Plot Verification',
          fallbackAvailability: 'FALLBACK_AVAILABLE',
          secondaryPlatformName: 'DigiLocker Sovereign Gateway'
        },
        {
          serviceId: 6,
          serviceName: 'Land Mutation (Namantaran)',
          departmentName: 'Revenue & Land Records',
          requiredDataField: 'Record of Rights Index',
          fallbackAvailability: 'FALLBACK_AVAILABLE',
          secondaryPlatformName: 'State Secondary LRS Replica'
        }
      ]
    };
  }
};
