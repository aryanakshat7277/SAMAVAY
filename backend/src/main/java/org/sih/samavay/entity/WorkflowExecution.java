package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workflow_executions")
public class WorkflowExecution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long workflowId;

    private String workflowName;

    @Column(nullable = false)
    private Long serviceRequestId;

    @Column(nullable = false)
    private String applicationNumber;

    @Column(nullable = false)
    private String serviceName;

    private Integer currentStep = 1;

    private Integer totalSteps = 4;

    @Column(nullable = false)
    private String status; // NOT_STARTED, IN_PROGRESS, WAITING_FOR_INFORMATION, WAITING_FOR_CONSENT, WAITING_FOR_DEPARTMENT, COMPLETED, FAILED

    private String citizenStatusMessage;

    private String currentStageName;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    private LocalDateTime updatedAt;

    public WorkflowExecution() {
        this.startedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = "IN_PROGRESS";
        this.currentStep = 1;
        this.citizenStatusMessage = "Your application is being coordinated across government departments.";
    }

    public WorkflowExecution(Long workflowId, String workflowName, Long serviceRequestId,
                             String applicationNumber, String serviceName, Integer totalSteps) {
        this.workflowId = workflowId;
        this.workflowName = workflowName;
        this.serviceRequestId = serviceRequestId;
        this.applicationNumber = applicationNumber;
        this.serviceName = serviceName;
        this.totalSteps = totalSteps != null ? totalSteps : 4;
        this.currentStep = 1;
        this.status = "IN_PROGRESS";
        this.currentStageName = "Application Received & Queued";
        this.citizenStatusMessage = "Your application is being processed by the nodal department.";
        this.startedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getWorkflowId() {
        return workflowId;
    }

    public void setWorkflowId(Long workflowId) {
        this.workflowId = workflowId;
    }

    public String getWorkflowName() {
        return workflowName;
    }

    public void setWorkflowName(String workflowName) {
        this.workflowName = workflowName;
    }

    public Long getServiceRequestId() {
        return serviceRequestId;
    }

    public void setServiceRequestId(Long serviceRequestId) {
        this.serviceRequestId = serviceRequestId;
    }

    public String getApplicationNumber() {
        return applicationNumber;
    }

    public void setApplicationNumber(String applicationNumber) {
        this.applicationNumber = applicationNumber;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public Integer getCurrentStep() {
        return currentStep;
    }

    public void setCurrentStep(Integer currentStep) {
        this.currentStep = currentStep;
    }

    public Integer getTotalSteps() {
        return totalSteps;
    }

    public void setTotalSteps(Integer totalSteps) {
        this.totalSteps = totalSteps;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCitizenStatusMessage() {
        return citizenStatusMessage;
    }

    public void setCitizenStatusMessage(String citizenStatusMessage) {
        this.citizenStatusMessage = citizenStatusMessage;
    }

    public String getCurrentStageName() {
        return currentStageName;
    }

    public void setCurrentStageName(String currentStageName) {
        this.currentStageName = currentStageName;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
