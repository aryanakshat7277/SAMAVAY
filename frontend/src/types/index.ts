export type Role = 'CITIZEN' | 'DEPARTMENT_ADMIN' | 'PLATFORM_ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  role: Role;
  createdAt?: string;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  description: string;
  iconName: string;
  status: string;
  servicesCount: number;
  createdAt?: string;
}

export interface GovernmentService {
  id: number;
  name: string;
  code: string;
  description: string;
  departmentId: number;
  departmentName: string;
  category: 'MUNICIPAL' | 'TRANSPORT' | 'REVENUE' | 'HEALTH' | 'EDUCATION' | 'WELFARE' | string;
  eligibility: string;
  requiredDocuments: string;
  estimatedProcessingDays: number;
  fee: string;
  status: string;
  isPopular?: boolean;
  createdAt?: string;
}

export type PlatformType =
  | 'WEB_APPLICATION'
  | 'MOBILE_APPLICATION'
  | 'GOVERNMENT_DATABASE'
  | 'LEGACY_SYSTEM'
  | 'API_PLATFORM'
  | 'CITIZEN_PORTAL'
  | 'INTERNAL_SYSTEM';

export type EnvironmentType = 'DEVELOPMENT' | 'TESTING' | 'STAGING' | 'PRODUCTION';
export type PlatformConnectionStatus = 'CONNECTED' | 'PENDING' | 'DISCONNECTED' | 'NOT_CONFIGURED';

export interface GovernmentPlatform {
  id: number;
  name: string;
  code: string;
  departmentId: number;
  departmentName: string;
  description: string;
  platformType: PlatformType | string;
  environment: EnvironmentType | string;
  connectionStatus: PlatformConnectionStatus | string;
  integrationStatus?: string;
  endpointUrl: string;
  authProtocol: string;
  lastPingAt?: string;
  uptimePercentage?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type IntegrationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'CONFIGURED'
  | 'ACTIVE'
  | 'REJECTED'
  | 'SUSPENDED';

export interface IntegrationConnection {
  id: number;
  name?: string;
  sourcePlatformId: number;
  sourcePlatformName: string;
  sourceDepartmentId?: number;
  sourceDepartmentName?: string;
  destinationPlatformId: number;
  destinationPlatformName: string;
  destinationDepartmentId?: number;
  destinationDepartmentName?: string;
  serviceId?: number;
  serviceName?: string;
  purpose?: string;
  connectionType: 'REST_API' | 'SECURE_GATEWAY' | 'DATA_PIPELINE' | 'VERIFICATION_REQUEST' | string;
  status: IntegrationStatus | string;
  dataExchangeProtocol: string;
  dataCategories?: string;
  consentRequired?: boolean;
  totalTransactionsProcessed: number;
  lastTestedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DataRequirement {
  id: number;
  serviceId: number;
  serviceName?: string;
  fieldName: string;
  description?: string;
  sourceDepartmentId?: number;
  sourceDepartmentName?: string;
  sourcePlatformId?: number;
  sourcePlatformName?: string;
  required: boolean;
  availabilityStatus: 'AVAILABLE' | 'NEEDS_INPUT' | string;
  consentRequired: boolean;
  purpose?: string;
  createdAt?: string;
}

export interface DataConsent {
  id: number;
  userId: number;
  userName?: string;
  serviceId: number;
  serviceName: string;
  dataRequirementId?: number;
  fieldName: string;
  sourceDepartmentName?: string;
  sourcePlatformName?: string;
  purpose?: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED' | string;
  grantedAt: string;
  revokedAt?: string;
}

export interface ServiceWorkflow {
  id: number;
  serviceId: number;
  serviceName?: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'DRAFT' | 'PAUSED' | string;
  totalSteps: number;
  createdAt?: string;
}

export interface WorkflowStep {
  id: number;
  workflowId: number;
  stepName: string;
  stepOrder: number;
  departmentId?: number;
  departmentName?: string;
  platformId?: number;
  platformName?: string;
  citizenDescription?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ACTIVE' | string;
  createdAt?: string;
}

export interface AuditLog {
  id: number;
  userId?: number;
  action: string;
  performedBy?: string;
  resourceType?: string;
  resourceId?: number;
  description?: string;
  details?: string;
  ipAddress?: string;
  timestamp: string;
}

export interface MonitoringSummary {
  totalPlatforms: number;
  totalConnections: number;
  activeConnections: number;
  pendingRequests: number;
  totalWorkflows: number;
  totalRequests: number;
  totalDepartments: number;
  totalTransactions: number;
  health: {
    healthyPercentage: number;
    attentionPercentage: number;
    issuesPercentage: number;
    overallStatus: string;
    averageLatencyMs: number;
    pkiSecurityCompliance: string;
  };
}

export type RequestStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'PROCESSING' | 'COMPLETED' | 'REJECTED';

export interface ServiceRequest {
  id: number;
  applicationNumber: string;
  userId: number;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  serviceId: number;
  serviceName: string;
  departmentName: string;
  category: string;
  formDataJson?: string;
  status: RequestStatus;
  currentStage: string;
  remarks?: string;
  certificateUrl?: string;
  submittedAt: string;
  updatedAt?: string;
}

export interface NotificationItem {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'UPDATE' | string;
  actionLink?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  userId: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  role: Role;
}

// ================= PHASE 3 ORCHESTRATION TYPES =================

export interface RequirementItem {
  id: number;
  fieldName: string;
  description?: string;
  sourceDepartment?: string;
  sourcePlatform?: string;
  availabilityStatus: 'AVAILABLE' | 'CONSENT_REQUIRED' | 'USER_INPUT_REQUIRED' | string;
  consentGranted?: boolean;
  purpose?: string;
}

export interface ServiceReadinessResult {
  serviceId: number;
  serviceName: string;
  departmentName: string;
  isReady: boolean;
  citizenStatusMessage: string;
  recommendedNextAction: 'REVIEW_CONSENT' | 'FILL_FORM' | 'SUBMIT' | string;
  availableRequirements: RequirementItem[];
  consentRequiredRequirements: RequirementItem[];
  missingRequirements: RequirementItem[];
  connectedPlatforms: string[];
  fallbackPlatformsUsed?: string[];
}

export interface FormFieldItem {
  id: number;
  fieldName: string;
  label: string;
  fieldType: 'TEXT' | 'NUMBER' | 'DATE' | 'DROPDOWN' | 'CHECKBOX' | 'RADIO' | 'FILE_UPLOAD' | string;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  validationRules?: string;
  displayOrder: number;
}

export interface ReusedFieldSummary {
  fieldName: string;
  sourceDepartment: string;
  sourcePlatform: string;
  sampleMaskedValue?: string;
}

export interface DynamicFormDto {
  serviceId: number;
  serviceName: string;
  formTitle: string;
  description?: string;
  requiredFields: FormFieldItem[];
  preVerifiedFields: ReusedFieldSummary[];
}

export interface JourneyStepDto {
  id: number;
  stepOrder: number;
  stepName: string;
  responsibleDepartment?: string;
  responsiblePlatform?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | string;
  citizenMessage: string;
  adminMessage?: string;
  isCurrent: boolean;
  isCompleted: boolean;
  latencyMs?: number;
}

export interface ApplicationJourneyDto {
  serviceRequestId: number;
  applicationNumber: string;
  serviceName: string;
  departmentName: string;
  currentStage: string;
  overallStatus: string;
  citizenStatusMessage: string;
  nextActionPrompt?: string;
  steps: JourneyStepDto[];
}

export interface ServiceAction {
  id: number;
  serviceRequestId?: number;
  applicationNumber?: string;
  userId: number;
  actionType: 'CONSENT_REQUIRED' | 'INPUT_REQUIRED' | 'REVIEW_REQUIRED' | 'COMPLETED_VIEW' | 'NONE' | string;
  title: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'DISMISSED' | string;
  actionUrl?: string;
  createdAt: string;
}

export interface InteroperabilityRule {
  id: number;
  name: string;
  description: string;
  serviceId?: number;
  serviceName?: string;
  conditionType: string;
  conditionValue: string;
  actionType: string;
  actionConfiguration: string;
  active: boolean;
  createdAt?: string;
}

export interface DataSourceMapping {
  id: number;
  dataCategory: string;
  dataField: string;
  departmentId: number;
  departmentName: string;
  platformId: number;
  platformName: string;
  priority: 'PRIMARY' | 'SECONDARY' | 'FALLBACK' | string;
  availabilityStatus: 'AVAILABLE' | 'NEEDS_CONSENT' | 'UNAVAILABLE' | string;
  active: boolean;
}

export interface WorkflowExecution {
  id: number;
  workflowId: number;
  workflowName: string;
  serviceRequestId: number;
  applicationNumber: string;
  serviceName: string;
  currentStep: number;
  totalSteps: number;
  status: string;
  citizenStatusMessage: string;
  currentStageName: string;
  startedAt: string;
  completedAt?: string;
  updatedAt?: string;
}

export interface WorkflowExecutionStep {
  id: number;
  executionId: number;
  workflowStepId?: number;
  stepName: string;
  stepOrder: number;
  responsibleDepartment?: string;
  responsiblePlatform?: string;
  status: string;
  citizenMessage: string;
  adminMessage: string;
  responseTimeMs?: number;
  fallbackTriggered?: boolean;
  startedAt?: string;
  completedAt?: string;
}

export interface OrchestrationSummaryDto {
  activeExecutions: number;
  waitingForConsent: number;
  waitingForDepartment: number;
  completedToday: number;
  failedExecutions: number;
  fallbacksTriggered: number;
  averageOrchestrationTimeSec: number;
}

// ================= PHASE 4 OPERATIONAL & GOVERNANCE TYPES =================

export interface GatewayRequestLog {
  id: number;
  requestId: string;
  serviceRequestId?: number;
  applicationNumber?: string;
  sourcePlatformId: number;
  sourcePlatformName: string;
  destinationPlatformId: number;
  destinationPlatformName: string;
  operationType: string;
  dataCategory: string;
  status: 'SUCCESS' | 'CONSENT_REQUIRED' | 'UNAVAILABLE' | 'TIMEOUT' | 'FAILED' | 'ACCESS_DENIED' | string;
  responseTimeMs: number;
  fallbackUsed: boolean;
  fallbackPlatformName?: string;
  securityVerified: boolean;
  consentVerified: boolean;
  responseSummary?: string;
  timestamp: string;
}

export interface SystemEvent {
  id: number;
  eventType: string;
  source: string;
  resourceType?: string;
  resourceId?: number;
  severity: 'INFO' | 'WARNING' | 'ERROR' | string;
  message: string;
  timestamp: string;
}

export interface AccessPolicy {
  id: number;
  name: string;
  sourcePlatformId: number;
  sourcePlatformName: string;
  destinationPlatformId: number;
  destinationPlatformName: string;
  dataCategory: string;
  allowed: boolean;
  requiresConsent: boolean;
  active: boolean;
  createdAt?: string;
}

export interface SystemAlert {
  id: number;
  title: string;
  message: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;
  status: 'ACTIVE' | 'REVIEWED' | 'RESOLVED' | string;
  relatedPlatformId?: number;
  relatedPlatformName?: string;
  impactedServicesCount: number;
  createdAt: string;
  resolvedAt?: string;
}

export interface PlatformStatusDto {
  id: number;
  name: string;
  code: string;
  departmentName: string;
  environment: string;
  status: 'HEALTHY' | 'DEGRADED' | 'UNAVAILABLE' | string;
  averageResponseTimeMs: number;
  successRatePercentage: number;
  activeIntegrationsCount: number;
  simulationMode: 'NORMAL' | 'SLOW' | 'UNAVAILABLE' | 'CONSENT_REQUIRED' | 'FAILURE' | string;
  lastActivity: string;
}

export interface ImpactedServiceItem {
  serviceId: number;
  serviceName: string;
  departmentName: string;
  requiredDataField: string;
  fallbackAvailability: 'FALLBACK_AVAILABLE' | 'MANUAL_INPUT_REQUIRED' | 'NO_FALLBACK' | string;
  secondaryPlatformName?: string;
}

export interface ServiceImpactDto {
  platformId: number;
  platformName: string;
  departmentName: string;
  platformStatus: string;
  impactedServicesCount: number;
  impactedServices: ImpactedServiceItem[];
}

export interface AnalyticsSummaryDto {
  totalServiceRequests: number;
  successfullyOrchestratedServices: number;
  averageServicePreparationTimeSec: number;
  informationReusePercentage: number; // 62.0%
  totalRequirementsAnalyzed: number;
  automaticallyReusedRequirements: number;
  activePlatformConnections: number;
  integrationSuccessRatePercentage: number;
  previousInteractionPointsPerService: number; // 4
  unifiedInteractionPointsNow: number; // 1
}

// ================= PHASE 5 FINALIZATION & INSIGHTS TYPES =================

export interface InteroperabilityInsight {
  id: number;
  category: 'OPPORTUNITY' | 'ATTENTION_REQUIRED' | 'POSITIVE_IMPACT' | 'HIGH_DEPENDENCY' | string;
  title: string;
  description: string;
  metricValue?: string;
  relatedPlatformOrService?: string;
  severity: 'INFO' | 'WARNING' | 'SUCCESS' | 'URGENT' | string;
  actionUrl?: string;
  createdAt: string;
}

export interface ControlCenterSummaryDto {
  totalDepartments: number;
  registeredPlatforms: number;
  activeIntegrations: number;
  activeWorkflows: number;
  healthyPlatformsCount: number;
  attentionRequiredCount: number;
  unavailableCount: number;
  recentEvents: SystemEvent[];
  activeAlerts: SystemAlert[];
  serviceImpactHighlight?: ServiceImpactDto;
}

export interface DemoScenarioResultDto {
  scenarioId: number;
  scenarioName: string;
  description: string;
  status: string;
  stepsExecuted: string[];
  resultSummary: string;
  executionTimeMs: number;
}


