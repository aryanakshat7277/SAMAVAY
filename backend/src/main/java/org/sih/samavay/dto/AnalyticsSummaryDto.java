package org.sih.samavay.dto;

import java.util.List;

public class AnalyticsSummaryDto {

    private Long totalServiceRequests;
    private Long successfullyOrchestratedServices;
    private Double averageServicePreparationTimeSec;
    private Double informationReusePercentage; // 62.0%
    private Integer totalRequirementsAnalyzed;
    private Integer automaticallyReusedRequirements;
    private Integer activePlatformConnections;
    private Double integrationSuccessRatePercentage; // 98.4%
    private Integer previousInteractionPointsPerService; // 4
    private Integer unifiedInteractionPointsNow; // 1

    public AnalyticsSummaryDto() {}

    public AnalyticsSummaryDto(Long totalServiceRequests, Long successfullyOrchestratedServices,
                               Double averageServicePreparationTimeSec, Double informationReusePercentage,
                               Integer totalRequirementsAnalyzed, Integer automaticallyReusedRequirements,
                               Integer activePlatformConnections, Double integrationSuccessRatePercentage,
                               Integer previousInteractionPointsPerService, Integer unifiedInteractionPointsNow) {
        this.totalServiceRequests = totalServiceRequests;
        this.successfullyOrchestratedServices = successfullyOrchestratedServices;
        this.averageServicePreparationTimeSec = averageServicePreparationTimeSec;
        this.informationReusePercentage = informationReusePercentage;
        this.totalRequirementsAnalyzed = totalRequirementsAnalyzed;
        this.automaticallyReusedRequirements = automaticallyReusedRequirements;
        this.activePlatformConnections = activePlatformConnections;
        this.integrationSuccessRatePercentage = integrationSuccessRatePercentage;
        this.previousInteractionPointsPerService = previousInteractionPointsPerService;
        this.unifiedInteractionPointsNow = unifiedInteractionPointsNow;
    }

    public Long getTotalServiceRequests() { return totalServiceRequests; }
    public void setTotalServiceRequests(Long totalServiceRequests) { this.totalServiceRequests = totalServiceRequests; }

    public Long getSuccessfullyOrchestratedServices() { return successfullyOrchestratedServices; }
    public void setSuccessfullyOrchestratedServices(Long successfullyOrchestratedServices) { this.successfullyOrchestratedServices = successfullyOrchestratedServices; }

    public Double getAverageServicePreparationTimeSec() { return averageServicePreparationTimeSec; }
    public void setAverageServicePreparationTimeSec(Double averageServicePreparationTimeSec) { this.averageServicePreparationTimeSec = averageServicePreparationTimeSec; }

    public Double getInformationReusePercentage() { return informationReusePercentage; }
    public void setInformationReusePercentage(Double informationReusePercentage) { this.informationReusePercentage = informationReusePercentage; }

    public Integer getTotalRequirementsAnalyzed() { return totalRequirementsAnalyzed; }
    public void setTotalRequirementsAnalyzed(Integer totalRequirementsAnalyzed) { this.totalRequirementsAnalyzed = totalRequirementsAnalyzed; }

    public Integer getAutomaticallyReusedRequirements() { return automaticallyReusedRequirements; }
    public void setAutomaticallyReusedRequirements(Integer automaticallyReusedRequirements) { this.automaticallyReusedRequirements = automaticallyReusedRequirements; }

    public Integer getActivePlatformConnections() { return activePlatformConnections; }
    public void setActivePlatformConnections(Integer activePlatformConnections) { this.activePlatformConnections = activePlatformConnections; }

    public Double getIntegrationSuccessRatePercentage() { return integrationSuccessRatePercentage; }
    public void setIntegrationSuccessRatePercentage(Double integrationSuccessRatePercentage) { this.integrationSuccessRatePercentage = integrationSuccessRatePercentage; }

    public Integer getPreviousInteractionPointsPerService() { return previousInteractionPointsPerService; }
    public void setPreviousInteractionPointsPerService(Integer previousInteractionPointsPerService) { this.previousInteractionPointsPerService = previousInteractionPointsPerService; }

    public Integer getUnifiedInteractionPointsNow() { return unifiedInteractionPointsNow; }
    public void setUnifiedInteractionPointsNow(Integer unifiedInteractionPointsNow) { this.unifiedInteractionPointsNow = unifiedInteractionPointsNow; }
}
