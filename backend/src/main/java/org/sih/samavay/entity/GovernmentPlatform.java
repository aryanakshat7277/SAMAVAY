package org.sih.samavay.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "government_platforms")
public class GovernmentPlatform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private Long departmentId;

    @Column(nullable = false)
    private String departmentName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String platformType; // WEB_APPLICATION, MOBILE_APPLICATION, GOVERNMENT_DATABASE, LEGACY_SYSTEM, API_PLATFORM, CITIZEN_PORTAL, INTERNAL_SYSTEM

    @Column(nullable = false)
    private String environment; // DEVELOPMENT, TESTING, STAGING, PRODUCTION

    @Column(nullable = false)
    private String connectionStatus; // CONNECTED, PENDING, DISCONNECTED, NOT_CONFIGURED

    private String integrationStatus; // READY, SYNCING, PAUSED, MAINTENANCE

    private String endpointUrl;

    private String authProtocol; // OAUTH2_MGS, PKI_X509, SAML2_GOV, API_KEY

    private LocalDateTime lastPingAt;

    private Integer uptimePercentage = 99;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public GovernmentPlatform() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.connectionStatus = "CONNECTED";
        this.environment = "PRODUCTION";
        this.platformType = "API_PLATFORM";
        this.integrationStatus = "READY";
        this.lastPingAt = LocalDateTime.now();
    }

    public GovernmentPlatform(String name, String code, Long departmentId, String departmentName,
                              String description, String platformType, String environment,
                              String connectionStatus, String endpointUrl, String authProtocol) {
        this.name = name;
        this.code = code;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.description = description;
        this.platformType = platformType != null ? platformType : "API_PLATFORM";
        this.environment = environment != null ? environment : "PRODUCTION";
        this.connectionStatus = connectionStatus != null ? connectionStatus : "CONNECTED";
        this.integrationStatus = "READY";
        this.endpointUrl = endpointUrl;
        this.authProtocol = authProtocol;
        this.lastPingAt = LocalDateTime.now();
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPlatformType() {
        return platformType;
    }

    public void setPlatformType(String platformType) {
        this.platformType = platformType;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(String environment) {
        this.environment = environment;
    }

    public String getConnectionStatus() {
        return connectionStatus;
    }

    public void setConnectionStatus(String connectionStatus) {
        this.connectionStatus = connectionStatus;
    }

    public String getIntegrationStatus() {
        return integrationStatus;
    }

    public void setIntegrationStatus(String integrationStatus) {
        this.integrationStatus = integrationStatus;
    }

    public String getEndpointUrl() {
        return endpointUrl;
    }

    public void setEndpointUrl(String endpointUrl) {
        this.endpointUrl = endpointUrl;
    }

    public String getAuthProtocol() {
        return authProtocol;
    }

    public void setAuthProtocol(String authProtocol) {
        this.authProtocol = authProtocol;
    }

    public LocalDateTime getLastPingAt() {
        return lastPingAt;
    }

    public void setLastPingAt(LocalDateTime lastPingAt) {
        this.lastPingAt = lastPingAt;
    }

    public Integer getUptimePercentage() {
        return uptimePercentage;
    }

    public void setUptimePercentage(Integer uptimePercentage) {
        this.uptimePercentage = uptimePercentage;
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
