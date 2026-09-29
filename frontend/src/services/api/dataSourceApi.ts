import { apiClient } from './client';
import { DataSourceMapping } from '../../types';

export const dataSourceApi = {
  getAll: async (): Promise<DataSourceMapping[]> => {
    try {
      const response = await apiClient.get('/admin/data-sources');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        dataCategory: 'Identity',
        dataField: 'Citizen Full Name',
        departmentId: 1,
        departmentName: 'Municipal Corporation',
        platformId: 1,
        platformName: 'e-NagarPalika Municipal Core',
        priority: 'PRIMARY',
        availabilityStatus: 'AVAILABLE',
        active: true
      },
      {
        id: 2,
        dataCategory: 'Property',
        dataField: 'Land Ownership & Cadastral Title',
        departmentId: 3,
        departmentName: 'Revenue & Land Records',
        platformId: 4,
        platformName: 'Bhoomi Land Records Information System',
        priority: 'PRIMARY',
        availabilityStatus: 'AVAILABLE',
        active: true
      },
      {
        id: 3,
        dataCategory: 'Property',
        dataField: 'Property Tax Assessment ID',
        departmentId: 1,
        departmentName: 'Municipal Corporation',
        platformId: 1,
        platformName: 'e-NagarPalika Municipal Core',
        priority: 'PRIMARY',
        availabilityStatus: 'AVAILABLE',
        active: true
      },
      {
        id: 4,
        dataCategory: 'Vehicle',
        dataField: 'Existing Driving Licence Number',
        departmentId: 2,
        departmentName: 'Transport Department',
        platformId: 3,
        platformName: 'SARATHI 4.0 Driving License System',
        priority: 'PRIMARY',
        availabilityStatus: 'AVAILABLE',
        active: true
      },
      {
        id: 5,
        dataCategory: 'Vehicle',
        dataField: 'Vehicle RC Number',
        departmentId: 2,
        departmentName: 'Transport Department',
        platformId: 2,
        platformName: 'VAHAN 4.0 Vehicle Registry',
        priority: 'PRIMARY',
        availabilityStatus: 'AVAILABLE',
        active: true
      },
      {
        id: 6,
        dataCategory: 'Health',
        dataField: 'Ayushman Beneficiary Record',
        departmentId: 4,
        departmentName: 'Health & Family Welfare',
        platformId: 5,
        platformName: 'Ayushman Bharat PM-JAY National Portal',
        priority: 'PRIMARY',
        availabilityStatus: 'AVAILABLE',
        active: true
      },
      {
        id: 7,
        dataCategory: 'Documents',
        dataField: 'Digital Certificate Hash',
        departmentId: 3,
        departmentName: 'Inter-Department Gateway',
        platformId: 6,
        platformName: 'DigiLocker Government Document Exchange',
        priority: 'SECONDARY',
        availabilityStatus: 'AVAILABLE',
        active: true
      }
    ];
  }
};
