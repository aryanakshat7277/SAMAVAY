package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workflow_steps")
public class WorkflowStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long workflowId;

    @Column(nullable = false)
    private String stepName;

    @Column(nullable = false)
    private Integer stepOrder;

    private Long departmentId;
    private String departmentName;

    private Long platformId;
    private String platformName;

    @Column(columnDefinition = "TEXT")
    private String citizenDescription;

    @Column(nullable = false)
    private String status; // PENDING, IN_PROGRESS, COMPLETED, ACTIVE

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public WorkflowStep() {
        this.createdAt = LocalDateTime.now();
        this.status = "ACTIVE";
    }

    public WorkflowStep(Long workflowId, String stepName, Integer stepOrder,
                        Long departmentId, String departmentName, Long platformId, String platformName,
                        String citizenDescription, String status) {
        this.workflowId = workflowId;
        this.stepName = stepName;
        this.stepOrder = stepOrder;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.platformId = platformId;
        this.platformName = platformName;
        this.citizenDescription = citizenDescription;
        this.status = status != null ? status : "ACTIVE";
        this.createdAt = LocalDateTime.now();
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

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Long getPlatformId() {
        return platformId;
    }

    public void setPlatformId(Long platformId) {
        this.platformId = platformId;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getCitizenDescription() {
        return citizenDescription;
    }

    public void setCitizenDescription(String citizenDescription) {
        this.citizenDescription = citizenDescription;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
