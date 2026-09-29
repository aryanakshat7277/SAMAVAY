import { apiClient } from './api/client';
import { Department, GovernmentService, GovernmentPlatform, IntegrationConnection, ServiceRequest, NotificationItem, User, AuthResponse } from '../types';
import { INITIAL_DEPARTMENTS, INITIAL_SERVICES, INITIAL_PLATFORMS, INITIAL_CONNECTIONS, INITIAL_REQUESTS, INITIAL_NOTIFICATIONS } from './mockData';

// Re-export modular APIs
export { platformApi } from './api/platformApi';
export { integrationApi } from './api/integrationApi';
export { dataRequirementApi } from './api/dataRequirementApi';
export { consentApi } from './api/consentApi';
export { workflowApi } from './api/workflowApi';
export { monitoringApi } from './api/monitoringApi';
export { auditLogApi } from './api/auditLogApi';
export { orchestrationApi } from './api/orchestrationApi';
export { ruleApi } from './api/ruleApi';
export { dataSourceApi } from './api/dataSourceApi';
export { dataExchangeApi } from './api/dataExchangeApi';
export { accessPolicyApi } from './api/accessPolicyApi';
export { alertApi } from './api/alertApi';
export { analyticsApi } from './api/analyticsApi';
export { platformStatusApi } from './api/platformStatusApi';
export { eventApi } from './api/eventApi';
export { controlCenterApi } from './api/controlCenterApi';
export { insightApi } from './api/insightApi';
export { demoApi } from './api/demoApi';

// Local state helpers for resilient frontend operation
const getStoredRequests = (): ServiceRequest[] => {
  const saved = localStorage.getItem('samavay_requests');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_REQUESTS;
    }
  }
  localStorage.setItem('samavay_requests', JSON.stringify(INITIAL_REQUESTS));
  return INITIAL_REQUESTS;
};

const saveStoredRequests = (requests: ServiceRequest[]) => {
  localStorage.setItem('samavay_requests', JSON.stringify(requests));
};

const getStoredNotifications = (): NotificationItem[] => {
  const saved = localStorage.getItem('samavay_notifications');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }
  localStorage.setItem('samavay_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
  return INITIAL_NOTIFICATIONS;
};

const saveStoredNotifications = (notifs: NotificationItem[]) => {
  localStorage.setItem('samavay_notifications', JSON.stringify(notifs));
};

export const authApi = {
  login: async (identifier: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/login', { identifier, password });
      if (response.data?.data) {
        return response.data.data;
      }
    } catch (err) {
      console.warn('Backend login fallback to mock auth:', err);
    }
    const isOfficer = identifier.toLowerCase().includes('officer') || identifier.toLowerCase().includes('admin');
    return {
      token: 'demo-jwt-token-samavay-2026',
      tokenType: 'Bearer',
      userId: isOfficer ? 2 : 1,
      fullName: isOfficer ? 'Rajesh Varma' : 'Aarav Sharma',
      email: identifier.includes('@') ? identifier : 'citizen.demo@samavay.gov.in',
      mobileNumber: isOfficer ? '9876543211' : '9876543210',
      role: isOfficer ? 'DEPARTMENT_ADMIN' : 'CITIZEN',
    };
  },

  demoLogin: async (): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/demo-login');
      if (response.data?.data) {
        return response.data.data;
      }
    } catch (err) {
      console.warn('Backend demo-login fallback:', err);
    }
    return {
      token: 'demo-jwt-token-samavay-2026',
      tokenType: 'Bearer',
      userId: 1,
      fullName: 'Aarav Sharma',
      email: 'citizen.demo@samavay.gov.in',
      mobileNumber: '9876543210',
      role: 'CITIZEN',
    };
  },

  register: async (fullName: string, email: string, mobileNumber: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post('/auth/register', { fullName, email, mobileNumber, password });
      if (response.data?.data) {
        return response.data.data;
      }
    } catch (err) {
      console.warn('Backend register fallback:', err);
    }
    return {
      token: 'demo-jwt-token-samavay-2026',
      tokenType: 'Bearer',
      userId: Math.floor(Math.random() * 1000) + 10,
      fullName,
      email,
      mobileNumber,
      role: 'CITIZEN',
    };
  },

  getMe: async (): Promise<User> => {
    try {
      const response = await apiClient.get('/auth/me');
      if (response.data?.data) {
        return response.data.data;
      }
    } catch {
      // ignore
    }
    return {
      id: 1,
      fullName: 'Aarav Sharma',
      email: 'citizen.demo@samavay.gov.in',
      mobileNumber: '9876543210',
      role: 'CITIZEN',
    };
  }
};

export const departmentsApi = {
  getAll: async (): Promise<Department[]> => {
    try {
      const response = await apiClient.get('/departments');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_DEPARTMENTS;
  },

  getById: async (id: number): Promise<Department | undefined> => {
    try {
      const response = await apiClient.get(`/departments/${id}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_DEPARTMENTS.find(d => d.id === id);
  },

  getServices: async (departmentId: number): Promise<GovernmentService[]> => {
    try {
      const response = await apiClient.get(`/departments/${departmentId}/services`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_SERVICES.filter(s => s.departmentId === departmentId);
  }
};

export const servicesApi = {
  getAll: async (): Promise<GovernmentService[]> => {
    try {
      const response = await apiClient.get('/services');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_SERVICES;
  },

  getById: async (id: number): Promise<GovernmentService | undefined> => {
    try {
      const response = await apiClient.get(`/services/${id}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_SERVICES.find(s => s.id === id);
  },

  search: async (query: string): Promise<GovernmentService[]> => {
    try {
      const response = await apiClient.get(`/services/search?q=${encodeURIComponent(query)}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    const q = query.toLowerCase();
    return INITIAL_SERVICES.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.departmentName.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  },

  getByCategory: async (category: string): Promise<GovernmentService[]> => {
    try {
      const response = await apiClient.get(`/services/category/${category}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_SERVICES.filter(s => s.category.toUpperCase() === category.toUpperCase());
  }
};

export const requestsApi = {
  getAll: async (): Promise<ServiceRequest[]> => {
    try {
      const response = await apiClient.get('/service-requests');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return getStoredRequests();
  },

  getByUser: async (userId: number): Promise<ServiceRequest[]> => {
    try {
      const response = await apiClient.get(`/service-requests/user/${userId}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    const all = getStoredRequests();
    return all.filter(r => r.userId === userId);
  },

  getById: async (id: number): Promise<ServiceRequest | undefined> => {
    try {
      const response = await apiClient.get(`/service-requests/${id}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return getStoredRequests().find(r => r.id === id);
  },

  track: async (applicationNumber: string): Promise<ServiceRequest | undefined> => {
    try {
      const response = await apiClient.get(`/service-requests/track/${applicationNumber.trim()}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return getStoredRequests().find(r => r.applicationNumber.toUpperCase() === applicationNumber.trim().toUpperCase());
  },

  create: async (data: {
    userId?: number;
    applicantName?: string;
    applicantEmail?: string;
    applicantPhone?: string;
    serviceId: number;
    formDataJson?: string;
    remarks?: string;
  }): Promise<ServiceRequest> => {
    try {
      const response = await apiClient.post('/service-requests', data);
      if (response.data?.data) {
        const current = getStoredRequests();
        saveStoredRequests([response.data.data, ...current]);
        return response.data.data;
      }
    } catch {
      // fallback
    }

    const service = INITIAL_SERVICES.find(s => s.id === data.serviceId) || INITIAL_SERVICES[0];
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newReq: ServiceRequest = {
      id: Date.now(),
      applicationNumber: `SAM-2026-${randomNum}`,
      userId: data.userId || 1,
      applicantName: data.applicantName || 'Demo Citizen',
      applicantEmail: data.applicantEmail || 'citizen.demo@samavay.gov.in',
      applicantPhone: data.applicantPhone || '9876543210',
      serviceId: service.id,
      serviceName: service.name,
      departmentName: service.departmentName,
      category: service.category,
      formDataJson: data.formDataJson,
      status: 'SUBMITTED',
      currentStage: 'Application Received & Queued',
      remarks: data.remarks || 'Application received successfully.',
      submittedAt: new Date().toISOString()
    };

    const current = getStoredRequests();
    saveStoredRequests([newReq, ...current]);

    const notifs = getStoredNotifications();
    const newNotif: NotificationItem = {
      id: Date.now(),
      userId: newReq.userId,
      title: 'Application Submitted',
      message: `Your request #${newReq.applicationNumber} for ${service.name} has been submitted.`,
      type: 'SUCCESS',
      actionLink: '/applications',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    saveStoredNotifications([newNotif, ...notifs]);

    return newReq;
  }
};

export const platformsApi = {
  getAll: async (): Promise<GovernmentPlatform[]> => {
    try {
      const response = await apiClient.get('/admin/platforms');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_PLATFORMS;
  },

  getConnections: async (): Promise<IntegrationConnection[]> => {
    try {
      const response = await apiClient.get('/admin/integrations');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return INITIAL_CONNECTIONS;
  }
};

export const notificationsApi = {
  getAll: async (userId: number = 1): Promise<NotificationItem[]> => {
    try {
      const response = await apiClient.get(`/notifications?userId=${userId}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return getStoredNotifications();
  },

  getUnreadCount: async (userId: number = 1): Promise<number> => {
    try {
      const response = await apiClient.get(`/notifications/unread-count?userId=${userId}`);
      if (response.data?.data?.unreadCount !== undefined) return response.data.data.unreadCount;
    } catch {
      // fallback
    }
    return getStoredNotifications().filter(n => !n.isRead).length;
  },

  markAsRead: async (id: number): Promise<void> => {
    try {
      await apiClient.put(`/notifications/${id}/read`);
    } catch {
      // fallback
    }
    const notifs = getStoredNotifications().map(n => n.id === id ? { ...n, isRead: true } : n);
    saveStoredNotifications(notifs);
  },

  markAllAsRead: async (userId: number = 1): Promise<void> => {
    try {
      await apiClient.put(`/notifications/read-all?userId=${userId}`);
    } catch {
      // fallback
    }
    const notifs = getStoredNotifications().map(n => ({ ...n, isRead: true }));
    saveStoredNotifications(notifs);
  }
};
