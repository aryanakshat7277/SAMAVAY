package org.sih.samavay.dto;

import java.util.List;

public class DemoScenarioResultDto {

    private Integer scenarioId;
    private String scenarioName;
    private String description;
    private String status; // EXECUTED, SUCCESS, FAILOVER_ENGAGED, CONSENT_TRIGGERED
    private List<String> stepsExecuted;
    private String resultSummary;
    private Long executionTimeMs;

    public DemoScenarioResultDto() {}

    public DemoScenarioResultDto(Integer scenarioId, String scenarioName, String description,
                                 String status, List<String> stepsExecuted, String resultSummary,
                                 Long executionTimeMs) {
        this.scenarioId = scenarioId;
        this.scenarioName = scenarioName;
        this.description = description;
        this.status = status;
        this.stepsExecuted = stepsExecuted;
        this.resultSummary = resultSummary;
        this.executionTimeMs = executionTimeMs;
    }

    public Integer getScenarioId() { return scenarioId; }
    public void setScenarioId(Integer scenarioId) { this.scenarioId = scenarioId; }

    public String getScenarioName() { return scenarioName; }
    public void setScenarioName(String scenarioName) { this.scenarioName = scenarioName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<String> getStepsExecuted() { return stepsExecuted; }
    public void setStepsExecuted(List<String> stepsExecuted) { this.stepsExecuted = stepsExecuted; }

    public String getResultSummary() { return resultSummary; }
    public void setResultSummary(String resultSummary) { this.resultSummary = resultSummary; }

    public Long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(Long executionTimeMs) { this.executionTimeMs = executionTimeMs; }
}
