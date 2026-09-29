package org.sih.samavay.dto;

import org.sih.samavay.entity.SystemAlert;
import org.sih.samavay.entity.SystemEvent;

import java.util.List;

public class ControlCenterSummaryDto {

    private Long totalDepartments;
    private Long registeredPlatforms;
    private Long activeIntegrations;
    private Long activeWorkflows;

    private Integer healthyPlatformsCount;
    private Integer attentionRequiredCount;
    private Integer unavailableCount;

    private List<SystemEvent> recentEvents;
    private List<SystemAlert> activeAlerts;
    private ServiceImpactDto serviceImpactHighlight;

    public ControlCenterSummaryDto() {}

    public ControlCenterSummaryDto(Long totalDepartments, Long registeredPlatforms,
                                  Long activeIntegrations, Long activeWorkflows,
                                  Integer healthyPlatformsCount, Integer attentionRequiredCount,
                                  Integer unavailableCount, List<SystemEvent> recentEvents,
                                  List<SystemAlert> activeAlerts, ServiceImpactDto serviceImpactHighlight) {
        this.totalDepartments = totalDepartments;
        this.registeredPlatforms = registeredPlatforms;
        this.activeIntegrations = activeIntegrations;
        this.activeWorkflows = activeWorkflows;
        this.healthyPlatformsCount = healthyPlatformsCount;
        this.attentionRequiredCount = attentionRequiredCount;
        this.unavailableCount = unavailableCount;
        this.recentEvents = recentEvents;
        this.activeAlerts = activeAlerts;
        this.serviceImpactHighlight = serviceImpactHighlight;
    }

    public Long getTotalDepartments() { return totalDepartments; }
    public void setTotalDepartments(Long totalDepartments) { this.totalDepartments = totalDepartments; }

    public Long getRegisteredPlatforms() { return registeredPlatforms; }
    public void setRegisteredPlatforms(Long registeredPlatforms) { this.registeredPlatforms = registeredPlatforms; }

    public Long getActiveIntegrations() { return activeIntegrations; }
    public void setActiveIntegrations(Long activeIntegrations) { this.activeIntegrations = activeIntegrations; }

    public Long getActiveWorkflows() { return activeWorkflows; }
    public void setActiveWorkflows(Long activeWorkflows) { this.activeWorkflows = activeWorkflows; }

    public Integer getHealthyPlatformsCount() { return healthyPlatformsCount; }
    public void setHealthyPlatformsCount(Integer healthyPlatformsCount) { this.healthyPlatformsCount = healthyPlatformsCount; }

    public Integer getAttentionRequiredCount() { return attentionRequiredCount; }
    public void setAttentionRequiredCount(Integer attentionRequiredCount) { this.attentionRequiredCount = attentionRequiredCount; }

    public Integer getUnavailableCount() { return unavailableCount; }
    public void setUnavailableCount(Integer unavailableCount) { this.unavailableCount = unavailableCount; }

    public List<SystemEvent> getRecentEvents() { return recentEvents; }
    public void setRecentEvents(List<SystemEvent> recentEvents) { this.recentEvents = recentEvents; }

    public List<SystemAlert> getActiveAlerts() { return activeAlerts; }
    public void setActiveAlerts(List<SystemAlert> activeAlerts) { this.activeAlerts = activeAlerts; }

    public ServiceImpactDto getServiceImpactHighlight() { return serviceImpactHighlight; }
    public void setServiceImpactHighlight(ServiceImpactDto serviceImpactHighlight) { this.serviceImpactHighlight = serviceImpactHighlight; }
}
