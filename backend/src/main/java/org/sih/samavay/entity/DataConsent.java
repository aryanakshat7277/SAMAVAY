package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "data_consents")
public class DataConsent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String userName;

    @Column(nullable = false)
    private Long serviceId;

    private String serviceName;

    private Long dataRequirementId;

    @Column(nullable = false)
    private String fieldName;

    private String sourceDepartmentName;

    private String sourcePlatformName;

    private String purpose;

    @Column(nullable = false)
    private String status; // ACTIVE, REVOKED, EXPIRED

    @Column(nullable = false)
    private LocalDateTime grantedAt;

    private LocalDateTime revokedAt;

    public DataConsent() {
        this.grantedAt = LocalDateTime.now();
        this.status = "ACTIVE";
    }

    public DataConsent(Long userId, String userName, Long serviceId, String serviceName,
                       Long dataRequirementId, String fieldName, String sourceDepartmentName,
                       String sourcePlatformName, String purpose) {
        this.userId = userId;
        this.userName = userName;
        this.serviceId = serviceId;
        this.serviceName = serviceName;
        this.dataRequirementId = dataRequirementId;
        this.fieldName = fieldName;
        this.sourceDepartmentName = sourceDepartmentName;
        this.sourcePlatformName = sourcePlatformName;
        this.purpose = purpose;
        this.status = "ACTIVE";
        this.grantedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public Long getDataRequirementId() {
        return dataRequirementId;
    }

    public void setDataRequirementId(Long dataRequirementId) {
        this.dataRequirementId = dataRequirementId;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getSourceDepartmentName() {
        return sourceDepartmentName;
    }

    public void setSourceDepartmentName(String sourceDepartmentName) {
        this.sourceDepartmentName = sourceDepartmentName;
    }

    public String getSourcePlatformName() {
        return sourcePlatformName;
    }

    public void setSourcePlatformName(String sourcePlatformName) {
        this.sourcePlatformName = sourcePlatformName;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getGrantedAt() {
        return grantedAt;
    }

    public void setGrantedAt(LocalDateTime grantedAt) {
        this.grantedAt = grantedAt;
    }

    public LocalDateTime getRevokedAt() {
        return revokedAt;
    }

    public void setRevokedAt(LocalDateTime revokedAt) {
        this.revokedAt = revokedAt;
    }
}
