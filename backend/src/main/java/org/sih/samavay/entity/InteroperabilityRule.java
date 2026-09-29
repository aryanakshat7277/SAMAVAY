package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "interoperability_rules")
public class InteroperabilityRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Long serviceId;

    private String serviceName;

    @Column(nullable = false)
    private String conditionType; // PLATFORM_STATUS, CONSENT_STATUS, DATA_AVAILABILITY, SYSTEM_LOAD

    @Column(nullable = false)
    private String conditionValue; // e.g. "BHOOMI_CONNECTED", "CONSENT_NOT_GRANTED", "PROPERTY_MISSING"

    @Column(nullable = false)
    private String actionType; // REUSE_DATA, REQUEST_CONSENT, ADD_FORM_FIELD, TRIGGER_FALLBACK, NOTIFY_CITIZEN

    @Column(columnDefinition = "TEXT")
    private String actionConfiguration; // JSON or configuration string

    private Boolean active = true;

    private LocalDateTime createdAt;

    public InteroperabilityRule() {
        this.createdAt = LocalDateTime.now();
        this.active = true;
    }

    public InteroperabilityRule(String name, String description, Long serviceId, String serviceName,
                                String conditionType, String conditionValue, String actionType,
                                String actionConfiguration) {
        this.name = name;
        this.description = description;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.conditionType = conditionType;
        this.conditionValue = conditionValue;
        this.actionType = actionType;
        this.actionConfiguration = actionConfiguration;
        this.active = true;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getConditionType() {
        return conditionType;
    }

    public void setConditionType(String conditionType) {
        this.conditionType = conditionType;
    }

    public String getConditionValue() {
        return conditionValue;
    }

    public void setConditionValue(String conditionValue) {
        this.conditionValue = conditionValue;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getActionConfiguration() {
        return actionConfiguration;
    }

    public void setActionConfiguration(String actionConfiguration) {
        this.actionConfiguration = actionConfiguration;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
