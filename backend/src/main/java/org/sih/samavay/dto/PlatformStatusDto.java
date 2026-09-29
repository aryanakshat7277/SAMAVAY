package org.sih.samavay.dto;

import java.util.List;

public class PlatformStatusDto {

    private Long id;
    private String name;
    private String code;
    private String departmentName;
    private String environment;
    private String status; // HEALTHY, DEGRADED, UNAVAILABLE
    private Long averageResponseTimeMs;
    private Double successRatePercentage;
    private Integer activeIntegrationsCount;
    private String simulationMode; // NORMAL, SLOW, UNAVAILABLE, CONSENT_REQUIRED, FAILURE
    private String lastActivity;

    public PlatformStatusDto() {}

    public PlatformStatusDto(Long id, String name, String code, String departmentName,
                           String environment, String status, Long averageResponseTimeMs,
                           Double successRatePercentage, Integer activeIntegrationsCount,
                           String simulationMode, String lastActivity) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.departmentName = departmentName;
        this.environment = environment;
        this.status = status;
        this.averageResponseTimeMs = averageResponseTimeMs;
        this.successRatePercentage = successRatePercentage;
        this.activeIntegrationsCount = activeIntegrationsCount;
        this.simulationMode = simulationMode;
        this.lastActivity = lastActivity;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public String getEnvironment() { return environment; }
    public void setEnvironment(String environment) { this.environment = environment; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getAverageResponseTimeMs() { return averageResponseTimeMs; }
    public void setAverageResponseTimeMs(Long averageResponseTimeMs) { this.averageResponseTimeMs = averageResponseTimeMs; }

    public Double getSuccessRatePercentage() { return successRatePercentage; }
    public void setSuccessRatePercentage(Double successRatePercentage) { this.successRatePercentage = successRatePercentage; }

    public Integer getActiveIntegrationsCount() { return activeIntegrationsCount; }
    public void setActiveIntegrationsCount(Integer activeIntegrationsCount) { this.activeIntegrationsCount = activeIntegrationsCount; }

    public String getSimulationMode() { return simulationMode; }
    public void setSimulationMode(String simulationMode) { this.simulationMode = simulationMode; }

    public String getLastActivity() { return lastActivity; }
    public void setLastActivity(String lastActivity) { this.lastActivity = lastActivity; }
}
