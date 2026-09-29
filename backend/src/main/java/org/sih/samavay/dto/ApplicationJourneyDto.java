package org.sih.samavay.dto;

import java.util.List;

public class ApplicationJourneyDto {

    private Long serviceRequestId;
    private String applicationNumber;
    private String serviceName;
    private String departmentName;
    private String currentStage;
    private String overallStatus; // IN_PROGRESS, COMPLETED, WAITING_FOR_CONSENT, WAITING_FOR_DEPARTMENT
    private String citizenStatusMessage;
    private String nextActionPrompt;
    private List<JourneyStepDto> steps;

    public ApplicationJourneyDto() {}

    public static class JourneyStepDto {
        private Long id;
        private Integer stepOrder;
        private String stepName;
        private String responsibleDepartment;
        private String responsiblePlatform;
        private String status; // PENDING, IN_PROGRESS, COMPLETED, FAILED
        private String citizenMessage;
        private String adminMessage;
        private Boolean isCurrent;
        private Boolean isCompleted;
        private Long latencyMs;

        public JourneyStepDto() {}

        public JourneyStepDto(Long id, Integer stepOrder, String stepName,
                              String responsibleDepartment, String responsiblePlatform,
                              String status, String citizenMessage, String adminMessage,
                              Boolean isCurrent, Boolean isCompleted, Long latencyMs) {
            this.id = id;
            this.stepOrder = stepOrder;
            this.stepName = stepName;
            this.responsibleDepartment = responsibleDepartment;
            this.responsiblePlatform = responsiblePlatform;
            this.status = status;
            this.citizenMessage = citizenMessage;
            this.adminMessage = adminMessage;
            this.isCurrent = isCurrent;
            this.isCompleted = isCompleted;
            this.latencyMs = latencyMs;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Integer getStepOrder() { return stepOrder; }
        public void setStepOrder(Integer stepOrder) { this.stepOrder = stepOrder; }
        public String getStepName() { return stepName; }
        public void setStepName(String stepName) { this.stepName = stepName; }
        public String getResponsibleDepartment() { return responsibleDepartment; }
        public void setResponsibleDepartment(String responsibleDepartment) { this.responsibleDepartment = responsibleDepartment; }
        public String getResponsiblePlatform() { return responsiblePlatform; }
        public void setResponsiblePlatform(String responsiblePlatform) { this.responsiblePlatform = responsiblePlatform; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getCitizenMessage() { return citizenMessage; }
        public void setCitizenMessage(String citizenMessage) { this.citizenMessage = citizenMessage; }
        public String getAdminMessage() { return adminMessage; }
        public void setAdminMessage(String adminMessage) { this.adminMessage = adminMessage; }
        public Boolean getIsCurrent() { return isCurrent; }
        public void setIsCurrent(Boolean isCurrent) { this.isCurrent = isCurrent; }
        public Boolean getIsCompleted() { return isCompleted; }
        public void setIsCompleted(Boolean isCompleted) { this.isCompleted = isCompleted; }
        public Long getLatencyMs() { return latencyMs; }
        public void setLatencyMs(Long latencyMs) { this.latencyMs = latencyMs; }
    }

    public Long getServiceRequestId() { return serviceRequestId; }
    public void setServiceRequestId(Long serviceRequestId) { this.serviceRequestId = serviceRequestId; }
    public String getApplicationNumber() { return applicationNumber; }
    public void setApplicationNumber(String applicationNumber) { this.applicationNumber = applicationNumber; }
    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }
    public String getCurrentStage() { return currentStage; }
    public void setCurrentStage(String currentStage) { this.currentStage = currentStage; }
    public String getOverallStatus() { return overallStatus; }
    public void setOverallStatus(String overallStatus) { this.overallStatus = overallStatus; }
    public String getCitizenStatusMessage() { return citizenStatusMessage; }
    public void setCitizenStatusMessage(String citizenStatusMessage) { this.citizenStatusMessage = citizenStatusMessage; }
    public String getNextActionPrompt() { return nextActionPrompt; }
    public void setNextActionPrompt(String nextActionPrompt) { this.nextActionPrompt = nextActionPrompt; }
    public List<JourneyStepDto> getSteps() { return steps; }
    public void setSteps(List<JourneyStepDto> steps) { this.steps = steps; }
}
