package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_actions")
public class ServiceAction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long serviceRequestId;

    private String applicationNumber;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String actionType; // CONSENT_REQUIRED, INPUT_REQUIRED, REVIEW_REQUIRED, COMPLETED_VIEW, NONE

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String status; // PENDING, COMPLETED, DISMISSED

    private String actionUrl;

    private LocalDateTime createdAt;

    public ServiceAction() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
    }

    public ServiceAction(Long serviceRequestId, String applicationNumber, Long userId,
                         String actionType, String title, String description,
                         String actionUrl) {
        this.serviceRequestId = serviceRequestId;
        this.applicationNumber = applicationNumber;
        this.userId = userId;
        this.actionType = actionType;
        this.title = title;
        this.description = description;
        this.actionUrl = actionUrl;
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getActionUrl() {
        return actionUrl;
    }

    public void setActionUrl(String actionUrl) {
        this.actionUrl = actionUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
