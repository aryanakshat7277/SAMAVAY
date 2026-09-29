package org.sih.samavay.dto;

import java.util.List;

public class OrchestrationSummaryDto {

    private Long activeExecutions;
    private Long waitingForConsent;
    private Long waitingForDepartment;
    private Long completedToday;
    private Long failedExecutions;
    private Long fallbacksTriggered;
    private Double averageOrchestrationTimeSec;

    public OrchestrationSummaryDto() {}

    public OrchestrationSummaryDto(Long activeExecutions, Long waitingForConsent, Long waitingForDepartment,
                                   Long completedToday, Long failedExecutions, Long fallbacksTriggered,
                                   Double averageOrchestrationTimeSec) {
        this.activeExecutions = activeExecutions;
        this.waitingForConsent = waitingForConsent;
        this.waitingForDepartment = waitingForDepartment;
        this.completedToday = completedToday;
        this.failedExecutions = failedExecutions;
        this.fallbacksTriggered = fallbacksTriggered;
        this.averageOrchestrationTimeSec = averageOrchestrationTimeSec;
    }

    public Long getActiveExecutions() { return activeExecutions; }
    public void setActiveExecutions(Long activeExecutions) { this.activeExecutions = activeExecutions; }
    public Long getWaitingForConsent() { return waitingForConsent; }
    public void setWaitingForConsent(Long waitingForConsent) { this.waitingForConsent = waitingForConsent; }
    public Long getWaitingForDepartment() { return waitingForDepartment; }
    public void setWaitingForDepartment(Long waitingForDepartment) { this.waitingForDepartment = waitingForDepartment; }
    public Long getCompletedToday() { return completedToday; }
    public void setCompletedToday(Long completedToday) { this.completedToday = completedToday; }
    public Long getFailedExecutions() { return failedExecutions; }
    public void setFailedExecutions(Long failedExecutions) { this.failedExecutions = failedExecutions; }
    public Long getFallbacksTriggered() { return fallbacksTriggered; }
    public void setFallbacksTriggered(Long fallbacksTriggered) { this.fallbacksTriggered = fallbacksTriggered; }
    public Double getAverageOrchestrationTimeSec() { return averageOrchestrationTimeSec; }
    public void setAverageOrchestrationTimeSec(Double averageOrchestrationTimeSec) { this.averageOrchestrationTimeSec = averageOrchestrationTimeSec; }
}
