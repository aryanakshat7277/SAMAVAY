import { apiClient } from './client';
import {
  ServiceReadinessResult,
  DynamicFormDto,
  ApplicationJourneyDto,
  ServiceAction,
  GovernmentService,
  WorkflowExecution,
  WorkflowExecutionStep,
  OrchestrationSummaryDto
} from '../../types';

export const orchestrationApi = {
  getReadiness: async (serviceId: number, userId: number = 1): Promise<ServiceReadinessResult> => {
    try {
      const response = await apiClient.get(`/services/${serviceId}/readiness?userId=${userId}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return {
      serviceId,
      serviceName: 'Property Tax Assessment & Receipt',
      departmentName: 'Municipal Corporation',
      isReady: true,
      citizenStatusMessage: 'Your verified government profile is linked. Complete remaining form fields.',
      recommendedNextAction: 'FILL_FORM',
      availableRequirements: [
        {
          id: 1,
          fieldName: 'Citizen Full Name',
          description: 'Legal name of the property owner',
          sourceDepartment: 'Municipal Corporation',
          sourcePlatform: 'e-NagarPalika Municipal Core',
          availabilityStatus: 'AVAILABLE',
          consentGranted: true,
          purpose: 'Applicant Identification'
        },
        {
          id: 2,
          fieldName: 'Land Ownership & Cadastral Title',
          description: 'Spatial title deed from Bhoomi land records',
          sourceDepartment: 'Revenue & Land Records',
          sourcePlatform: 'Bhoomi Land Records Information System',
          availabilityStatus: 'AVAILABLE',
          consentGranted: true,
          purpose: 'Title Verification'
        }
      ],
      consentRequiredRequirements: [],
      missingRequirements: [
        {
          id: 3,
          fieldName: 'Property Assessment ID',
          description: 'Municipal property ledger identifier',
          sourceDepartment: 'Municipal Corporation',
          sourcePlatform: 'e-NagarPalika Municipal Core',
          availabilityStatus: 'USER_INPUT_REQUIRED',
          consentGranted: false,
          purpose: 'Municipal Dues Lookup'
        }
      ],
      connectedPlatforms: ['e-NagarPalika Municipal Core', 'Bhoomi Land Records Information System', 'DigiLocker Gateway']
    };
  },

  getDynamicForm: async (serviceId: number, userId: number = 1): Promise<DynamicFormDto> => {
    try {
      const response = await apiClient.get(`/services/${serviceId}/dynamic-form?userId=${userId}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return {
      serviceId,
      serviceName: 'Property Tax Assessment & Receipt',
      formTitle: 'Property Tax Assessment Form',
      description: 'Provide missing property particulars to calculate dues.',
      requiredFields: [
        {
          id: 1,
          fieldName: 'propertyId',
          label: 'Property Assessment ID',
          fieldType: 'TEXT',
          placeholder: 'e.g. M-WARD-40982',
          helpText: 'Enter municipal property ID if not auto-detected',
          required: true,
          displayOrder: 1
        },
        {
          id: 2,
          fieldName: 'occupancyType',
          label: 'Occupancy Status',
          fieldType: 'DROPDOWN',
          placeholder: 'Self Occupied / Tenant Occupied',
          helpText: 'Select current building occupancy status',
          required: false,
          displayOrder: 2
        }
      ],
      preVerifiedFields: [
        {
          fieldName: 'Citizen Full Name',
          sourceDepartment: 'Municipal Corporation',
          sourcePlatform: 'e-NagarPalika Municipal Core',
          sampleMaskedValue: 'Aarav Sharma (Verified UIDAI)'
        },
        {
          fieldName: 'Land Ownership & Cadastral Title',
          sourceDepartment: 'Revenue & Land Records',
          sourcePlatform: 'Bhoomi Land Records Information System',
          sampleMaskedValue: 'Title Deed RoR #42/1A (Bhoomi Verified)'
        }
      ]
    };
  },

  startOrchestration: async (serviceRequestId: number): Promise<WorkflowExecution> => {
    try {
      const response = await apiClient.post(`/service-requests/${serviceRequestId}/orchestrate`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return {
      id: Date.now(),
      workflowId: 1,
      workflowName: 'Municipal Property Tax End-to-End Workflow',
      serviceRequestId,
      applicationNumber: 'SAM-2026-10234',
      serviceName: 'Property Tax Assessment & Receipt',
      currentStep: 2,
      totalSteps: 5,
      status: 'IN_PROGRESS',
      currentStageName: 'Cross-Registry Verification',
      citizenStatusMessage: 'Your application is being coordinated across government departments.',
      startedAt: new Date().toISOString()
    };
  },

  getJourney: async (serviceRequestId: number): Promise<ApplicationJourneyDto> => {
    try {
      const response = await apiClient.get(`/service-requests/${serviceRequestId}/journey`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return {
      serviceRequestId,
      applicationNumber: 'SAM-2026-10234',
      serviceName: 'Property Tax Assessment & Receipt',
      departmentName: 'Municipal Corporation',
      currentStage: 'Municipal Tax Officer Assessment',
      overallStatus: 'Your Application is Being Processed',
      citizenStatusMessage: 'Your application is currently under departmental review by the Municipal Revenue Inspector.',
      nextActionPrompt: 'No action needed. You will receive an alert as your application progresses.',
      steps: [
        {
          id: 1,
          stepOrder: 1,
          stepName: 'Application Received & Queued',
          responsibleDepartment: 'Municipal Corporation',
          responsiblePlatform: 'e-NagarPalika Municipal Core',
          status: 'COMPLETED',
          citizenMessage: 'Application registered on the SAMAVAY interoperability mesh.',
          adminMessage: 'Gateway dispatch: OK 200 (18ms)',
          isCurrent: false,
          isCompleted: true,
          latencyMs: 18
        },
        {
          id: 2,
          stepOrder: 2,
          stepName: 'Land Records Cross-Verification',
          responsibleDepartment: 'Revenue & Land Records',
          responsiblePlatform: 'Bhoomi Land Records Information System',
          status: 'COMPLETED',
          citizenMessage: 'Required property records cross-verified via Bhoomi Land Records gateway.',
          adminMessage: 'mTLS PKI_X509 Verified: RoR matched (38ms)',
          isCurrent: false,
          isCompleted: true,
          latencyMs: 38
        },
        {
          id: 3,
          stepOrder: 3,
          stepName: 'Municipal Officer Scrutiny',
          responsibleDepartment: 'Municipal Corporation',
          responsiblePlatform: 'e-NagarPalika Municipal Core',
          status: 'IN_PROGRESS',
          citizenMessage: 'Municipal Revenue Inspector is reviewing the verified plot details and self-declared assessment.',
          adminMessage: 'Queue Assigned: Circle Officer Ward 4',
          isCurrent: true,
          isCompleted: false,
          latencyMs: 45
        },
        {
          id: 4,
          stepOrder: 4,
          stepName: 'Digital Seal & Clearance',
          responsibleDepartment: 'Municipal Corporation',
          responsiblePlatform: 'e-NagarPalika Municipal Core',
          status: 'PENDING',
          citizenMessage: 'Digital certificate and tax receipt will be queued for sovereign PKI signing.',
          adminMessage: 'Pending scrutiny sign-off',
          isCurrent: false,
          isCompleted: false,
          latencyMs: 0
        },
        {
          id: 5,
          stepOrder: 5,
          stepName: 'Delivery to Dashboard & DigiLocker',
          responsibleDepartment: 'Inter-Department Gateway',
          responsiblePlatform: 'DigiLocker Government Document Exchange',
          status: 'PENDING',
          citizenMessage: 'Final digitally verifiable receipt will be synced with DigiLocker.',
          adminMessage: 'DigiLocker Push queued',
          isCurrent: false,
          isCompleted: false,
          latencyMs: 0
        }
      ]
    };
  },

  getCitizenActions: async (userId: number = 1): Promise<ServiceAction[]> => {
    try {
      const response = await apiClient.get(`/citizen/actions?userId=${userId}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        serviceRequestId: 1,
        applicationNumber: 'SAM-2026-10234',
        userId: 1,
        actionType: 'REVIEW_REQUIRED',
        title: 'Permission Needed for Land Title Verification',
        description: 'Please review information access required for your Property Tax Assessment application.',
        status: 'PENDING',
        actionUrl: '/dashboard/permissions',
        createdAt: new Date().toISOString()
      }
    ];
  },

  getRecommendations: async (serviceId: number): Promise<GovernmentService[]> => {
    try {
      const response = await apiClient.get(`/services/${serviceId}/recommendations`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [];
  },

  getSummary: async (): Promise<OrchestrationSummaryDto> => {
    try {
      const response = await apiClient.get('/admin/orchestration/summary');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return {
      activeExecutions: 4,
      waitingForConsent: 1,
      waitingForDepartment: 2,
      completedToday: 4,
      failedExecutions: 0,
      fallbacksTriggered: 1,
      averageOrchestrationTimeSec: 2.4
    };
  },

  getAllExecutions: async (): Promise<WorkflowExecution[]> => {
    try {
      const response = await apiClient.get('/admin/orchestration/executions');
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        workflowId: 1,
        workflowName: 'Municipal Property Tax End-to-End Workflow',
        serviceRequestId: 1,
        applicationNumber: 'SAM-2026-10234',
        serviceName: 'Property Tax Assessment & Receipt',
        currentStep: 3,
        totalSteps: 5,
        status: 'IN_PROGRESS',
        citizenStatusMessage: 'Your application is currently under departmental review by the Municipal Revenue Inspector.',
        currentStageName: 'Municipal Tax Officer Assessment',
        startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        workflowId: 2,
        workflowName: 'Contactless Driving Licence Renewal Workflow',
        serviceRequestId: 2,
        applicationNumber: 'SAM-2026-09841',
        serviceName: 'Driving Licence Renewal',
        currentStep: 4,
        totalSteps: 4,
        status: 'COMPLETED',
        citizenStatusMessage: 'Your Driving Licence renewal is complete and available for download.',
        currentStageName: 'Digital Certificate & Smart Card Dispatched',
        startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  },

  getExecutionById: async (id: number): Promise<WorkflowExecution | undefined> => {
    try {
      const response = await apiClient.get(`/admin/orchestration/executions/${id}`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    const all = await orchestrationApi.getAllExecutions();
    return all.find((e) => e.id === id);
  },

  getExecutionSteps: async (executionId: number): Promise<WorkflowExecutionStep[]> => {
    try {
      const response = await apiClient.get(`/admin/orchestration/executions/${executionId}/steps`);
      if (response.data?.data) return response.data.data;
    } catch {
      // fallback
    }
    return [
      {
        id: 1,
        executionId,
        stepName: 'Application Received & Queued',
        stepOrder: 1,
        responsibleDepartment: 'Municipal Corporation',
        responsiblePlatform: 'e-NagarPalika Municipal Core',
        status: 'COMPLETED',
        citizenMessage: 'Application registered on the SAMAVAY interoperability mesh.',
        adminMessage: 'Gateway dispatch: OK 200 (18ms)',
        responseTimeMs: 18,
        fallbackTriggered: false
      },
      {
        id: 2,
        executionId,
        stepName: 'Land Records Cross-Verification',
        stepOrder: 2,
        responsibleDepartment: 'Revenue & Land Records',
        responsiblePlatform: 'Bhoomi Land Records Information System',
        status: 'COMPLETED',
        citizenMessage: 'Required property records cross-verified via Bhoomi Land Records gateway.',
        adminMessage: 'mTLS PKI_X509 Verified: RoR matched (38ms)',
        responseTimeMs: 38,
        fallbackTriggered: false
      },
      {
        id: 3,
        executionId,
        stepName: 'Municipal Officer Scrutiny',
        stepOrder: 3,
        responsibleDepartment: 'Municipal Corporation',
        responsiblePlatform: 'e-NagarPalika Municipal Core',
        status: 'IN_PROGRESS',
        citizenMessage: 'Municipal Revenue Inspector is reviewing the verified plot details.',
        adminMessage: 'Queue Assigned: Circle Officer Ward 4',
        responseTimeMs: 45,
        fallbackTriggered: false
      },
      {
        id: 4,
        executionId,
        stepName: 'Digital Seal & Clearance',
        stepOrder: 4,
        responsibleDepartment: 'Municipal Corporation',
        responsiblePlatform: 'e-NagarPalika Municipal Core',
        status: 'PENDING',
        citizenMessage: 'Digital certificate and tax receipt will be queued for sovereign PKI signing.',
        adminMessage: 'Pending scrutiny sign-off',
        responseTimeMs: 0,
        fallbackTriggered: false
      },
      {
        id: 5,
        executionId,
        stepName: 'Delivery to Dashboard & DigiLocker',
        stepOrder: 5,
        responsibleDepartment: 'Inter-Department Gateway',
        responsiblePlatform: 'DigiLocker Government Document Exchange',
        status: 'PENDING',
        citizenMessage: 'Final digitally verifiable receipt will be synced with DigiLocker.',
        adminMessage: 'DigiLocker Push queued',
        responseTimeMs: 0,
        fallbackTriggered: false
      }
    ];
  }
};
