package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "data_requirements")
public class DataRequirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long serviceId;

    private String serviceName;

    @Column(nullable = false)
    private String fieldName; // e.g. "Citizen Full Name", "Property Ownership Title", "Vehicle RC Number"

    @Column(columnDefinition = "TEXT")
    private String description;

    private Long sourceDepartmentId;
    private String sourceDepartmentName; // e.g. "Revenue & Land Records"

    private Long sourcePlatformId;
    private String sourcePlatformName; // e.g. "Bhoomi Land Records System"

    @Column(nullable = false)
    private Boolean required = true;

    @Column(nullable = false)
    private String availabilityStatus; // AVAILABLE, NEEDS_INPUT

    @Column(nullable = false)
    private Boolean consentRequired = true;

    private String purpose; // "Identity Verification", "Property Title Verification"

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public DataRequirement() {
        this.createdAt = LocalDateTime.now();
        this.required = true;
        this.availabilityStatus = "AVAILABLE";
        this.consentRequired = true;
    }

    public DataRequirement(Long serviceId, String serviceName, String fieldName, String description,
                           Long sourceDepartmentId, String sourceDepartmentName,
                           Long sourcePlatformId, String sourcePlatformName,
                           Boolean required, String availabilityStatus, Boolean consentRequired, String purpose) {
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.fieldName = fieldName;
        this.description = description;
        this.sourceDepartmentId = sourceDepartmentId;
        this.sourceDepartmentName = sourceDepartmentName;
        this.sourcePlatformId = sourcePlatformId;
        this.sourcePlatformName = sourcePlatformName;
        this.required = required != null ? required : true;
        this.availabilityStatus = availabilityStatus != null ? availabilityStatus : "AVAILABLE";
        this.consentRequired = consentRequired != null ? consentRequired : true;
        this.purpose = purpose;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getSourceDepartmentId() {
        return sourceDepartmentId;
    }

    public void setSourceDepartmentId(Long sourceDepartmentId) {
        this.sourceDepartmentId = sourceDepartmentId;
    }

    public String getSourceDepartmentName() {
        return sourceDepartmentName;
    }

    public void setSourceDepartmentName(String sourceDepartmentName) {
        this.sourceDepartmentName = sourceDepartmentName;
    }

    public Long getSourcePlatformId() {
        return sourcePlatformId;
    }

    public void setSourcePlatformId(Long sourcePlatformId) {
        this.sourcePlatformId = sourcePlatformId;
    }

    public String getSourcePlatformName() {
        return sourcePlatformName;
    }

    public void setSourcePlatformName(String sourcePlatformName) {
        this.sourcePlatformName = sourcePlatformName;
    }

    public Boolean getRequired() {
        return required;
    }

    public void setRequired(Boolean required) {
        this.required = required;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

    public Boolean getConsentRequired() {
        return consentRequired;
    }

    public void setConsentRequired(Boolean consentRequired) {
        this.consentRequired = consentRequired;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
