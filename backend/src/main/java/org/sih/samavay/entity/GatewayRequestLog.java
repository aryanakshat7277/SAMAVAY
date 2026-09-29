package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "gateway_request_logs")
public class GatewayRequestLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String requestId; // e.g. "REQ-2026-00128"

    private Long serviceRequestId;

    private String applicationNumber;

    @Column(nullable = false)
    private Long sourcePlatformId;

    @Column(nullable = false)
    private String sourcePlatformName;

    @Column(nullable = false)
    private Long destinationPlatformId;

    @Column(nullable = false)
    private String destinationPlatformName;

    @Column(nullable = false)
    private String operationType; // e.g. "RECORD_LOOKUP", "IDENTITY_VERIFICATION", "DUES_ASSESSMENT"

    @Column(nullable = false)
    private String dataCategory; // e.g. "Property Information", "Vehicle Records", "Profile Verification"

    @Column(nullable = false)
    private String status; // SUCCESS, CONSENT_REQUIRED, UNAVAILABLE, TIMEOUT, FAILED, ACCESS_DENIED

    private Long responseTimeMs = 120L;

    private Boolean fallbackUsed = false;

    private String fallbackPlatformName;

    private Boolean securityVerified = true;

    private Boolean consentVerified = true;

    @Column(columnDefinition = "TEXT")
    private String responseSummary; // Non-sensitive metadata summary

    private LocalDateTime timestamp;

    public GatewayRequestLog() {
        this.timestamp = LocalDateTime.now();
        this.securityVerified = true;
        this.fallbackUsed = false;
    }

    public GatewayRequestLog(String requestId, Long serviceRequestId, String applicationNumber,
                             Long sourcePlatformId, String sourcePlatformName,
                             Long destinationPlatformId, String destinationPlatformName,
                             String operationType, String dataCategory, String status,
                             Long responseTimeMs, Boolean fallbackUsed, String responseSummary) {
        this.requestId = requestId;
        this.serviceRequestId = serviceRequestId;
        this.applicationNumber = applicationNumber;
        this.sourcePlatformId = sourcePlatformId;
        this.sourcePlatformName = sourcePlatformName;
        this.destinationPlatformId = destinationPlatformId;
        this.destinationPlatformName = destinationPlatformName;
        this.operationType = operationType;
        this.dataCategory = dataCategory;
        this.status = status;
        this.responseTimeMs = responseTimeMs;
        this.fallbackUsed = fallbackUsed != null ? fallbackUsed : false;
        this.responseSummary = responseSummary;
        this.securityVerified = true;
        this.consentVerified = true;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRequestId() { return requestId; }
    public void setRequestId(String requestId) { this.requestId = requestId; }

    public Long getServiceRequestId() { return serviceRequestId; }
    public void setServiceRequestId(Long serviceRequestId) { this.serviceRequestId = serviceRequestId; }

    public String getApplicationNumber() { return applicationNumber; }
    public void setApplicationNumber(String applicationNumber) { this.applicationNumber = applicationNumber; }

    public Long getSourcePlatformId() { return sourcePlatformId; }
    public void setSourcePlatformId(Long sourcePlatformId) { this.sourcePlatformId = sourcePlatformId; }

    public String getSourcePlatformName() { return sourcePlatformName; }
    public void setSourcePlatformName(String sourcePlatformName) { this.sourcePlatformName = sourcePlatformName; }

    public Long getDestinationPlatformId() { return destinationPlatformId; }
    public void setDestinationPlatformId(Long destinationPlatformId) { this.destinationPlatformId = destinationPlatformId; }

    public String getDestinationPlatformName() { return destinationPlatformName; }
    public void setDestinationPlatformName(String destinationPlatformName) { this.destinationPlatformName = destinationPlatformName; }

    public String getOperationType() { return operationType; }
    public void setOperationType(String operationType) { this.operationType = operationType; }

    public String getDataCategory() { return dataCategory; }
    public void setDataCategory(String dataCategory) { this.dataCategory = dataCategory; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getResponseTimeMs() { return responseTimeMs; }
    public void setResponseTimeMs(Long responseTimeMs) { this.responseTimeMs = responseTimeMs; }

    public Boolean getFallbackUsed() { return fallbackUsed; }
    public void setFallbackUsed(Boolean fallbackUsed) { this.fallbackUsed = fallbackUsed; }

    public String getFallbackPlatformName() { return fallbackPlatformName; }
    public void setFallbackPlatformName(String fallbackPlatformName) { this.fallbackPlatformName = fallbackPlatformName; }

    public Boolean getSecurityVerified() { return securityVerified; }
    public void setSecurityVerified(Boolean securityVerified) { this.securityVerified = securityVerified; }

    public Boolean getConsentVerified() { return consentVerified; }
    public void setConsentVerified(Boolean consentVerified) { this.consentVerified = consentVerified; }

    public String getResponseSummary() { return responseSummary; }
    public void setResponseSummary(String responseSummary) { this.responseSummary = responseSummary; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
