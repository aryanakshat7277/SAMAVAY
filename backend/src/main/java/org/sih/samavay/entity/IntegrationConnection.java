package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "integration_connections")
public class IntegrationConnection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false)
    private Long sourcePlatformId;

    @Column(nullable = false)
    private String sourcePlatformName;

    private Long sourceDepartmentId;
    private String sourceDepartmentName;

    @Column(nullable = false)
    private Long destinationPlatformId;

    @Column(nullable = false)
    private String destinationPlatformName;

    private Long destinationDepartmentId;
    private String destinationDepartmentName;

    private Long serviceId;
    private String serviceName;

    @Column(columnDefinition = "TEXT")
    private String purpose;

    @Column(nullable = false)
    private String connectionType; // REST_API, SECURE_GATEWAY, DATA_PIPELINE, VERIFICATION_REQUEST

    @Column(nullable = false)
    private String status; // DRAFT, SUBMITTED, UNDER_REVIEW, APPROVED, CONFIGURED, ACTIVE, REJECTED, SUSPENDED

    private String dataExchangeProtocol; // HTTPS/JSON (e-Gov Interop v2.1), SAML2_GOV, PKI_X509

    @Column(columnDefinition = "TEXT")
    private String dataCategories; // "Basic Profile, Property Records, Address Verification"

    private Boolean consentRequired = true;

    private Long totalTransactionsProcessed = 0L;

    private LocalDateTime lastTestedAt;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public IntegrationConnection() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = "ACTIVE";
        this.dataExchangeProtocol = "HTTPS/JSON (e-Gov Interop v2.1)";
        this.consentRequired = true;
    }

    public IntegrationConnection(String name, Long sourcePlatformId, String sourcePlatformName,
                                 Long destinationPlatformId, String destinationPlatformName,
                                 String connectionType, String purpose, String status,
                                 String dataExchangeProtocol, String dataCategories,
                                 Long totalTransactionsProcessed) {
        this.name = name;
        this.sourcePlatformId = sourcePlatformId;
        this.sourcePlatformName = sourcePlatformName;
        this.destinationPlatformId = destinationPlatformId;
        this.destinationPlatformName = destinationPlatformName;
        this.connectionType = connectionType;
        this.purpose = purpose;
        this.status = status != null ? status : "ACTIVE";
        this.dataExchangeProtocol = dataExchangeProtocol != null ? dataExchangeProtocol : "HTTPS/JSON (e-Gov Interop v2.1)";
        this.dataCategories = dataCategories;
        this.totalTransactionsProcessed = totalTransactionsProcessed != null ? totalTransactionsProcessed : 0L;
        this.consentRequired = true;
        this.lastTestedAt = LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
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

    public Long getDestinationPlatformId() {
        return destinationPlatformId;
    }

    public void setDestinationPlatformId(Long destinationPlatformId) {
        this.destinationPlatformId = destinationPlatformId;
    }

    public String getDestinationPlatformName() {
        return destinationPlatformName;
    }

    public void setDestinationPlatformName(String destinationPlatformName) {
        this.destinationPlatformName = destinationPlatformName;
    }

    public Long getDestinationDepartmentId() {
        return destinationDepartmentId;
    }

    public void setDestinationDepartmentId(Long destinationDepartmentId) {
        this.destinationDepartmentId = destinationDepartmentId;
    }

    public String getDestinationDepartmentName() {
        return destinationDepartmentName;
    }

    public void setDestinationDepartmentName(String destinationDepartmentName) {
        this.destinationDepartmentName = destinationDepartmentName;
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

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getConnectionType() {
        return connectionType;
    }

    public void setConnectionType(String connectionType) {
        this.connectionType = connectionType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDataExchangeProtocol() {
        return dataExchangeProtocol;
    }

    public void setDataExchangeProtocol(String dataExchangeProtocol) {
        this.dataExchangeProtocol = dataExchangeProtocol;
    }

    public String getDataCategories() {
        return dataCategories;
    }

    public void setDataCategories(String dataCategories) {
        this.dataCategories = dataCategories;
    }

    public Boolean getConsentRequired() {
        return consentRequired;
    }

    public void setConsentRequired(Boolean consentRequired) {
        this.consentRequired = consentRequired;
    }

    public Long getTotalTransactionsProcessed() {
        return totalTransactionsProcessed;
    }

    public void setTotalTransactionsProcessed(Long totalTransactionsProcessed) {
        this.totalTransactionsProcessed = totalTransactionsProcessed;
    }

    public LocalDateTime getLastTestedAt() {
        return lastTestedAt;
    }

    public void setLastTestedAt(LocalDateTime lastTestedAt) {
        this.lastTestedAt = lastTestedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
