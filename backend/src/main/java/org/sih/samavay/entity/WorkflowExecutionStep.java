package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workflow_execution_steps")
public class WorkflowExecutionStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long executionId;

    private Long workflowStepId;

    @Column(nullable = false)
    private String stepName;

    @Column(nullable = false)
    private Integer stepOrder;

    private String responsibleDepartment;

    private String responsiblePlatform;

    @Column(nullable = false)
    private String status; // PENDING, IN_PROGRESS, COMPLETED, FAILED, SKIPPED

    @Column(columnDefinition = "TEXT")
    private String citizenMessage; // Friendly, non-technical explanation

    @Column(columnDefinition = "TEXT")
    private String adminMessage; // Detailed operational telemetry

    private Long responseTimeMs = 45L;

    private Boolean fallbackTriggered = false;

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    public WorkflowExecutionStep() {
        this.status = "PENDING";
        this.responseTimeMs = 45L;
        this.fallbackTriggered = false;
    }

    public WorkflowExecutionStep(Long executionId, Long workflowStepId, String stepName,
                                Integer stepOrder, String responsibleDepartment, String responsiblePlatform,
                                String status, String citizenMessage, String adminMessage) {
        this.executionId = executionId;
        this.workflowStepId = workflowStepId;
        this.stepName = stepName;
        this.stepOrder = stepOrder;
        this.responsibleDepartment = responsibleDepartment;
        this.responsiblePlatform = responsiblePlatform;
        this.status = status != null ? status : "PENDING";
        this.citizenMessage = citizenMessage;
        this.adminMessage = adminMessage;
        this.responseTimeMs = 45L;
        this.fallbackTriggered = false;
        if ("COMPLETED".equals(status) || "IN_PROGRESS".equals(status)) {
            this.startedAt = LocalDateTime.now().minusMinutes(5);
        }
        if ("COMPLETED".equals(status)) {
            this.completedAt = LocalDateTime.now().minusMinutes(2);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getExecutionId() {
        return executionId;
    }

    public void setExecutionId(Long executionId) {
        this.executionId = executionId;
    }

    public Long getWorkflowStepId() {
        return workflowStepId;
    }

    public void setWorkflowStepId(Long workflowStepId) {
        this.workflowStepId = workflowStepId;
    }

    public String getStepName() {
        return stepName;
    }

    public void setStepName(String stepName) {
        this.stepName = stepName;
    }

    public Integer getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(Integer stepOrder) {
        this.stepOrder = stepOrder;
    }

    public String getResponsibleDepartment() {
        return responsibleDepartment;
    }

    public void setResponsibleDepartment(String responsibleDepartment) {
        this.responsibleDepartment = responsibleDepartment;
    }

    public String getResponsiblePlatform() {
        return responsiblePlatform;
    }

    public void setResponsiblePlatform(String responsiblePlatform) {
        this.responsiblePlatform = responsiblePlatform;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCitizenMessage() {
        return citizenMessage;
    }

    public void setCitizenMessage(String citizenMessage) {
        this.citizenMessage = citizenMessage;
    }

    public String getAdminMessage() {
        return adminMessage;
    }

    public void setAdminMessage(String adminMessage) {
        this.adminMessage = adminMessage;
    }

    public Long getResponseTimeMs() {
        return responseTimeMs;
    }

    public void setResponseTimeMs(Long responseTimeMs) {
        this.responseTimeMs = responseTimeMs;
    }

    public Boolean getFallbackTriggered() {
        return fallbackTriggered;
    }

    public void setFallbackTriggered(Boolean fallbackTriggered) {
        this.fallbackTriggered = fallbackTriggered;
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
}
